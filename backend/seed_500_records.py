import sqlite3
import random
from datetime import datetime, timedelta

DB_NAME = 'health_surveillance.db'

def seed_500_phc_data():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    print("Starting 500-record database seeding for Guntur District...")

    # 1. Ensure Guntur District exists
    cursor.execute("INSERT OR IGNORE INTO districts (id, name) VALUES (1, 'Guntur')")
    dist_id = 1

    # 2. Define Facilities (matching frontend)
    phcs = [
        ('Guntur Urban PHC', 'PHC'),
        ('Mangalagiri PHC', 'PHC'),
        ('Tenali CHC', 'CHC'),
        ('Amaravati PHC', 'PHC'),
        ('Ponnur PHC', 'PHC'),
        ('Bapatla CHC', 'CHC'),
        ('Repalle PHC', 'PHC')
    ]
    
    facility_ids = []
    for name, ftype in phcs:
        # Check if exists first to avoid duplicates if name is not unique constraint
        cursor.execute("SELECT id FROM facilities WHERE name = ? AND district_id = ?", (name, dist_id))
        res = cursor.fetchone()
        if res:
            facility_ids.append(res[0])
        else:
            cursor.execute("INSERT INTO facilities (name, district_id, type) VALUES (?, ?, ?)", (name, dist_id, ftype))
            facility_ids.append(cursor.lastrowid)

    # 3. Define Diseases and ICD Codes
    diseases = [
        ('Dengue Suspected', 'A90', 'Communicable'),
        ('Malaria', 'B54', 'Communicable'),
        ('Acute Respiratory Infection', 'J06.9', 'Communicable'),
        ('Viral Fever', 'A99', 'Communicable'),
        ('Hypertension', 'I10', 'Non-Communicable'),
        ('Gastroenteritis', 'A09.9', 'Communicable'),
        ('Diabetes', 'E11.9', 'Non-Communicable')
    ]
    
    genders = ['Male', 'Female', 'Other']
    visit_types = ['New', 'Follow-up']

    print(f"Generating 500 records across {len(phcs)} facilities...")
    
    records_added = 0
    for i in range(500):
        f_id = random.choice(facility_ids)
        age = random.randint(1, 85)
        gender = random.choice(genders)
        disease, icd, category = random.choice(diseases)
        v_type = random.choice(visit_types)
        confidence = round(random.uniform(85.0, 98.0), 2)
        
        # Spread dates over the last 90 days for better trend analysis
        days_ago = random.randint(0, 90)
        recorded_at = (datetime.now() - timedelta(days=days_ago)).strftime('%Y-%m-%d %H:%M:%S')
        
        # Generate some realistic symptoms
        symptoms_map = {
            'Dengue Suspected': 'High Fever, Joint Pain, Rashes',
            'Malaria': 'Chills, Sweating, Fever',
            'Acute Respiratory Infection': 'Cough, Breathlessness, Chest Pain',
            'Viral Fever': 'Body Ache, Weakness, Mild Fever',
            'Hypertension': 'Dizziness, Vision Problems, Palpitations',
            'Gastroenteritis': 'Diarrhea, Vomiting, Stomach Cramps',
            'Diabetes': 'Frequent Urination, Increased Thirst, Fatigue'
        }
        symptoms = symptoms_map.get(disease, 'General malaise')
        notes = f"Patient presenting with symptoms of {disease}. Vital signs monitored. Status: {'Critical' if random.random() < 0.1 else 'Stable'}."

        cursor.execute("""
            INSERT INTO health_records (
                facility_id, patient_age, patient_gender, symptoms, 
                diagnosis_notes, classified_disease, icd_code, 
                category, visit_type, confidence, recorded_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            f_id, age, gender, symptoms,
            notes, disease, icd, category, v_type, confidence, recorded_at
        ))
        records_added += 1

    conn.commit()
    print(f"Successfully seeded {records_added} health records into the database.")
    
    # Verify totals
    cursor.execute("SELECT COUNT(*) FROM health_records")
    total = cursor.fetchone()[0]
    print(f"Total records in database: {total}")
    
    conn.close()

if __name__ == "__main__":
    seed_500_phc_data()
