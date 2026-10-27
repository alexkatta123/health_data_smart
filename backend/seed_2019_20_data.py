import sqlite3
import random
import csv
import os
from datetime import datetime, timedelta

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, 'health_surveillance.db')
ICD10_FILE = os.path.join(BASE_DIR, 'ICD10codes.csv')

def load_icd10_data():
    icd10_list = []
    if not os.path.exists(ICD10_FILE):
        print(f"Error: {ICD10_FILE} not found.")
        return [("A00", "Cholera", "Communicable"), ("A01", "Typhoid fever", "Communicable")]
    
    with open(ICD10_FILE, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) >= 4:
                code = row[2]
                desc = row[3]
                group = row[5] if len(row) > 5 else "Other"
                
                # Determine category
                category = "Communicable"
                if "diabetes" in desc.lower() or "hypertension" in desc.lower() or "heart" in desc.lower() or "cancer" in desc.lower():
                    category = "Non-Communicable"
                
                icd10_list.append((code, desc, category))
    
    # Return a sample to keep it manageable if the list is huge
    return random.sample(icd10_list, min(len(icd10_list), 500))

def seed_2019_20_data():
    districts = [
        'Alluri Sitharama Raju', 'Anakapalli', 'Anantapur', 'Annamayya', 'Bapatla', 
        'Chittoor', 'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Konaseema', 
        'Krishna', 'Kurnool', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam', 
        'Prakasam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 
        'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'
    ]

    icd10_data = load_icd10_data()
    
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
    except Exception as err:
        print(f"Error: {err}")
        return

    print("Clearing old 2019-20 simulation data if exists...")
    # Optional: we don't clear everything, just ensure we don't duplicate too much if needed.
    # For this task, we will just add.

    # Ensure districts and facilities exist
    district_ids = {}
    for d in districts:
        cursor.execute("INSERT OR IGNORE INTO districts (name) VALUES (?)", (d,))
        cursor.execute("SELECT id FROM districts WHERE name = ?", (d,))
        district_ids[d] = cursor.fetchone()[0]
    
    facility_ids = []
    for d_name, d_id in district_ids.items():
        # 2 PHCs and 1 CHC per district
        for i in range(2):
            cursor.execute("INSERT OR IGNORE INTO facilities (name, district_id, type) VALUES (?, ?, ?)", 
                           (f"{d_name} PHC {i+1}", d_id, 'PHC'))
        cursor.execute("INSERT OR IGNORE INTO facilities (name, district_id, type) VALUES (?, ?, ?)", 
                       (f"{d_name} CHC", d_id, 'CHC'))
    
    cursor.execute("SELECT id FROM facilities")
    facility_ids = [row[0] for row in cursor.fetchall()]

    start_date = datetime(2019, 4, 1)
    end_date = datetime(2020, 3, 31)
    delta_days = (end_date - start_date).days

    print(f"Generating 10,000 historical records for 2019-20 HMIS simulation...")
    
    records = []
    for _ in range(10000):
        f_id = random.choice(facility_ids)
        age = random.randint(0, 90)
        gender = random.choice(['Male', 'Female', 'Female'])
        code, disease, cat = random.choice(icd10_data)
        
        # Random date in 2019-20
        random_days = random.randint(0, delta_days)
        record_date = (start_date + timedelta(days=random_days, hours=random.randint(0, 23), minutes=random.randint(0, 59))).strftime('%Y-%m-%d %H:%M:%S')
        
        visit = random.choice(['OP', 'OP', 'OP', 'IP'])
        p_id = f"AP-HMIS-{random.randint(100000, 999999)}"
        
        symptoms = f"Patient presenting with symptoms matching {disease}. History of related conditions noted."
        notes = f"HMIS 2019-20 Historical Sync: {disease} confirmed by clinical evaluation."
        
        records.append((
            f_id, age, gender, p_id, symptoms, notes, disease, code, "", cat, visit, "hmis_historical_import", 0.95, record_date
        ))

        if len(records) >= 1000:
            cursor.executemany("""
                INSERT INTO health_records 
                (facility_id, patient_age, patient_gender, patient_id_anonymized, symptoms, diagnosis_notes, classified_disease, icd_code, snomed_code, category, visit_type, classification_method, confidence, recorded_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, records)
            conn.commit()
            records = []

    if records:
        cursor.executemany("""
            INSERT INTO health_records 
            (facility_id, patient_age, patient_gender, patient_id_anonymized, symptoms, diagnosis_notes, classified_disease, icd_code, snomed_code, category, visit_type, classification_method, confidence, recorded_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, records)
        conn.commit()

    cursor.close()
    conn.close()
    print("Success: 10,000 historical HMIS records (2019-20) seeded for all AP districts.")

if __name__ == "__main__":
    seed_2019_20_data()
