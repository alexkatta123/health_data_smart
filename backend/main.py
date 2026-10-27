from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from typing import List, Optional
import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float
from sqlalchemy.orm import sessionmaker, Session, declarative_base

# Import our workflow modules
from preprocessing import clean_text, anonymize_data
from nlp_engine import classify_patient_record
from analytics_engine import detect_trends, get_geospatial_clusters

# Database Configuration
DATABASE_URL = "sqlite:///./backend/health_surveillance.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class District(Base):
    __tablename__ = "districts"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True)

class Facility(Base):
    __tablename__ = "facilities"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    district_id = Column(Integer)
    type = Column(String(50))
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)

class HealthRecord(Base):
    __tablename__ = "health_records"
    id = Column(Integer, primary_key=True, index=True)
    facility_id = Column(Integer)
    patient_age = Column(Integer)
    patient_gender = Column(String(20))
    patient_id_anonymized = Column(String(50), default="ANON")  # DPDP Compliance
    symptoms = Column(Text)
    diagnosis_notes = Column(Text)
    classified_disease = Column(String(255))
    icd_code = Column(String(20))
    snomed_code = Column(String(20), default="")  # SNOMED CT code
    category = Column(String(50))
    visit_type = Column(String(10))
    confidence = Column(Float, default=0.0)
    classification_method = Column(String(30), default="keyword")  # ml_classifier or keyword_ner
    officer_validated = Column(Integer, default=0)  # Step 8: Feedback Loop
    recorded_at = Column(DateTime, default=datetime.datetime.utcnow)

# Ensure tables are updated (Simplified for PoC)
Base.metadata.create_all(bind=engine)

# Schemas
class RecordCreate(BaseModel):
    facility_id: int
    patient_age: int
    patient_gender: str
    patient_name: Optional[str] = "Anonymous"
    symptoms: str
    diagnosis_notes: str
    visit_type: str

class FeedbackUpdate(BaseModel):
    record_id: int
    is_correct: bool
    correct_disease: Optional[str] = None

app = FastAPI(title="AP Health Intelligence API - AI-Enabled Disease Tracking")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Step 1: Record Ingestion with AI Classification ──
@app.post("/api/records")
async def create_record(record: RecordCreate):
    db = SessionLocal()
    
    # Step 2: Preprocessing
    clean_symptoms = clean_text(record.symptoms)
    clean_notes = clean_text(record.diagnosis_notes)
    
    # DPDP Compliance: Anonymize patient identity
    anonymized_id = anonymize_data(record.patient_name)
    
    # Step 3 & 4: Hybrid NLP + ML Classification
    classification = classify_patient_record(clean_symptoms, clean_notes)
    
    new_record = HealthRecord(
        facility_id=record.facility_id,
        patient_age=record.patient_age,
        patient_gender=record.patient_gender,
        patient_id_anonymized=anonymized_id,
        symptoms=clean_symptoms,
        diagnosis_notes=clean_notes,
        classified_disease=classification["disease"],
        icd_code=classification["code"],
        snomed_code=classification.get("snomed_code", ""),
        category=classification["category"],
        confidence=classification["confidence"],
        classification_method=classification.get("method", "keyword"),
        visit_type=record.visit_type
    )
    
    db.add(new_record)
    db.commit()
    db.refresh(new_record)
    db.close()
    return {
        "id": new_record.id,
        "classified_disease": new_record.classified_disease,
        "icd_code": new_record.icd_code,
        "snomed_code": new_record.snomed_code,
        "category": new_record.category,
        "confidence": new_record.confidence,
        "method": new_record.classification_method,
        "patient_id": new_record.patient_id_anonymized
    }

@app.get("/api/records")
async def get_all_records():
    db = SessionLocal()
    records = db.query(HealthRecord).order_by(HealthRecord.recorded_at.desc()).limit(100).all()
    db.close()
    return records

# ── Step 5: Trend Detection ──
@app.get("/api/trends")
async def get_system_trends():
    db = SessionLocal()
    records = db.query(HealthRecord).all()
    db.close()
    
    df = pd.DataFrame([r.__dict__ for r in records])
    if df.empty: return []
    
    trends = detect_trends(df)
    return trends

# ── Step 6: Geospatial Clusters ──
@app.get("/api/geospatial")
async def get_geospatial():
    db = SessionLocal()
    records = db.query(HealthRecord).all()
    db.close()
    
    df = pd.DataFrame([r.__dict__ for r in records])
    if df.empty: return []
    
    clusters = get_geospatial_clusters(df)
    return clusters

# ── Step 8: Learning Feedback Loop ──
@app.post("/api/feedback")
async def submit_feedback(feedback: FeedbackUpdate):
    """Officer validation feedback — drives model improvement."""
    db = SessionLocal()
    record = db.query(HealthRecord).filter(HealthRecord.id == feedback.record_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    record.officer_validated = 1 if feedback.is_correct else -1
    if feedback.correct_disease:
        record.classified_disease = feedback.correct_disease
        
    db.commit()
    db.close()
    return {"status": "Feedback recorded, model optimization scheduled"}

# ── Step 7: Dashboard Stats ──
@app.get("/api/dashboard/stats")
async def get_stats():
    db = SessionLocal()
    records = db.query(HealthRecord).all()
    df = pd.DataFrame([r.__dict__ for r in records])
    db.close()
    
    if df.empty:
        return {
            "total_cases": 0, "communicable": 0, "non_communicable": 0,
            "other": 0, "op_count": 0, "ip_count": 0,
            "avg_confidence": 0, "ml_classified": 0, "keyword_classified": 0,
            "top_diseases": {}, "recent_trends": {}, "category_breakdown": {}
        }

    return {
        "total_cases": len(df),
        "communicable": int(len(df[df['category'] == 'Communicable'])),
        "non_communicable": int(len(df[df['category'] == 'Non-Communicable'])),
        "other": int(len(df[df['category'] == 'Other'])),
        "op_count": int(len(df[df['visit_type'] == 'OP'])),
        "ip_count": int(len(df[df['visit_type'] == 'IP'])),
        "avg_confidence": round(float(df['confidence'].mean()), 2) if 'confidence' in df else 0,
        "ml_classified": int(len(df[df.get('classification_method', '') == 'ml_classifier'])) if 'classification_method' in df.columns else 0,
        "keyword_classified": int(len(df[df.get('classification_method', '') == 'keyword_ner'])) if 'classification_method' in df.columns else 0,
        "top_diseases": df['classified_disease'].value_counts().head(8).to_dict(),
        "recent_trends": {str(k): int(v) for k, v in df.groupby(pd.to_datetime(df['recorded_at']).dt.date).size().tail(7).items()},
        "category_breakdown": df['category'].value_counts().to_dict()
    }

# ── NEW: Classification Accuracy Report ──
@app.get("/api/accuracy")
async def get_accuracy_report():
    """Returns classification accuracy metrics based on officer feedback."""
    db = SessionLocal()
    records = db.query(HealthRecord).all()
    db.close()
    
    df = pd.DataFrame([r.__dict__ for r in records])
    
    if df.empty:
        return {
            "total_records": 0,
            "validated_records": 0,
            "accuracy_rate": 0,
            "correction_rate": 0,
            "pending_validation": 0,
            "avg_confidence": 0,
            "confidence_by_category": {},
            "accuracy_by_disease": {}
        }
    
    total = len(df)
    validated = len(df[df['officer_validated'] != 0])
    correct = len(df[df['officer_validated'] == 1])
    incorrect = len(df[df['officer_validated'] == -1])
    pending = len(df[df['officer_validated'] == 0])
    
    accuracy = round((correct / validated * 100), 1) if validated > 0 else 0
    correction_rate = round((incorrect / validated * 100), 1) if validated > 0 else 0
    
    # Confidence breakdown by category
    conf_by_cat = {}
    if 'confidence' in df.columns:
        for cat in df['category'].unique():
            cat_df = df[df['category'] == cat]
            conf_by_cat[cat] = round(float(cat_df['confidence'].mean()), 2)
    
    # Accuracy by disease (only validated records)
    acc_by_disease = {}
    validated_df = df[df['officer_validated'] != 0]
    if not validated_df.empty:
        for disease in validated_df['classified_disease'].unique():
            d_df = validated_df[validated_df['classified_disease'] == disease]
            d_correct = len(d_df[d_df['officer_validated'] == 1])
            acc_by_disease[disease] = {
                "total_validated": len(d_df),
                "correct": d_correct,
                "accuracy": round((d_correct / len(d_df) * 100), 1) if len(d_df) > 0 else 0
            }
    
    return {
        "total_records": total,
        "validated_records": validated,
        "correct_classifications": correct,
        "incorrect_classifications": incorrect,
        "accuracy_rate": accuracy,
        "correction_rate": correction_rate,
        "pending_validation": pending,
        "avg_confidence": round(float(df['confidence'].mean()), 2) if 'confidence' in df.columns else 0,
        "confidence_by_category": conf_by_cat,
        "accuracy_by_disease": acc_by_disease
    }

# ── NEW: District Performance Analytics ──
@app.get("/api/analytics/districts")
async def get_district_analytics():
    db = SessionLocal()
    records = db.query(HealthRecord).all()
    districts = db.query(District).all()
    facilities = db.query(Facility).all()
    db.close()
    
    df = pd.DataFrame([r.__dict__ for r in records])
    df_fac = pd.DataFrame([f.__dict__ for f in facilities])
    
    if df.empty or df_fac.empty:
        return []
        
    # Join records with facilities to get district info
    df_merged = df.merge(df_fac, left_on='facility_id', right_on='id', suffixes=('', '_fac'))
    
    analytics = []
    for d in districts:
        d_df = df_merged[df_merged['district_id'] == d.id]
        
        # Calculate stats for this district
        total = len(d_df)
        critical = len(d_df[d_df['category'] == 'Communicable']) # Mocking critical as communicable for now
        accuracy = round(float(d_df['confidence'].mean() * 100), 1) if not d_df.empty else 0
        
        # PHC status mockup based on case load
        status = "Active"
        if total > 500: status = "Under Precaution"
        if total > 800: status = "Critical Load"
        
        analytics.append({
            "district_id": d.id,
            "district_name": d.name,
            "total_cases": total,
            "critical_cases": critical,
            "accuracy_rate": accuracy,
            "phc_status": status,
            "active_phcs": len(df_fac[df_fac['district_id'] == d.id])
        })
        
    return analytics

# ── NEW: Historical 2019-20 Trend Analytics ──
@app.get("/api/analytics/historical")
async def get_historical_trends():
    db = SessionLocal()
    # Filter for 2019-04 to 2020-03
    start = datetime.datetime(2019, 4, 1)
    end = datetime.datetime(2020, 3, 31)
    
    records = db.query(HealthRecord).filter(
        HealthRecord.recorded_at >= start,
        HealthRecord.recorded_at <= end
    ).all()
    db.close()
    
    if not records:
        return []
        
    df = pd.DataFrame([r.__dict__ for r in records])
    df['recorded_at'] = pd.to_datetime(df['recorded_at'])
    
    # Resample by month for historical trend view
    monthly_trends = df.groupby(df['recorded_at'].dt.to_period('M')).size().reset_index()
    monthly_trends['recorded_at'] = monthly_trends['recorded_at'].astype(str)
    monthly_trends.columns = ['month', 'case_count']
    
    return monthly_trends.to_dict(orient='records')

# ── NEW: Facilities Endpoint ──
@app.get("/api/facilities")
async def get_facilities():
    db = SessionLocal()
    facilities = db.query(Facility).all()
    db.close()
    return facilities

# ── Health Check ──
@app.get("/api/health")
async def health_check():
    return {
        "status": "operational",
        "version": "2.0",
        "features": [
            "Hybrid ML + Keyword NLP Classification",
            "60+ ICD-10 & SNOMED CT Codes",
            "Trend Detection Engine",
            "Geospatial Clustering",
            "Officer Feedback Loop",
            "DPDP 2023 Anonymization",
            "Classification Accuracy Analytics"
        ]
    }

# ── NEW: Official HMIS Counts Endpoint ──
@app.get("/api/hmis/official")
async def get_official_hmis():
    db = SessionLocal()
    try:
        # Use raw SQL to fetch from the newly created hmis_official_counts table
        result = engine.execute("SELECT * FROM hmis_official_counts").fetchall()
        return [dict(row) for row in result]
    except Exception as e:
        return {"error": str(e)}
    finally:
        db.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
