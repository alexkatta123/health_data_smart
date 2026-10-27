import sqlite3
import random
from datetime import datetime, timedelta

DB_NAME = 'health_surveillance.db'

def seed_phc_data():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()

    # 1. Ensure Guntur District exists
    cursor.execute("INSERT OR IGNORE INTO districts (id, name) VALUES (1, 'Guntur')")
    dist_id = 1

    # 2. Add PHC Facilities
    phcs = [
        ('Guntur Urban PHC', 'PHC'),
        ('Mangalagiri PHC', 'PHC'),
        ('Tenali CHC', 'CHC'),
        ('Amaravati PHC', 'PHC'),
        ('Ponnur PHC', 'PHC')
    ]
    
    facility_ids = []
    for name, ftype in phcs:
        cursor.execute("INSERT INTO facilities (name, district_id, type) VALUES (?, ?, ?)", (name, dist_id, ftype))
        facility_ids.append(cursor.lastrowid)

    # 3. Add 60 Health Records
    diseases = [
        ('Dengue Suspected', 'A90', 'Communicable'),
        ('Malaria', 'B54', 'Communicable'),
        ('Acute Respiratory Infection', 'J06.9', 'Communicable'),
        ('Viral Fever', 'A99', 'Communicable'),
        ('Hypertension', 'I10', 'Non-Communicable'),
        ('Gastroenteritis', 'A09.9', 'Communicable')
    ]
    
    genders = ['Male', 'Female', 'Other']
    visit_types = ['New', 'Follow-up']

    for i in range(60):
        f_id = random.choice(facility_ids)
        age = random.randint(1, 85)
        gender = random.choice(genders)
        disease, icd, category = random.choice(diseases)
        v_type = random.choice(visit_types)
        confidence = round(random.uniform(85.0, 98.0), 2)
        
        # Random date in last 30 days
        days_ago = random.randint(0, 30)
        recorded_at = (datetime.now() - timedelta(days=days_ago)).strftime('%Y-%m-%d %H:%M:%S')

        cursor.execute("""
            INSERT INTO health_records (
                facility_id, patient_age, patient_gender, symptoms, 
                diagnosis_notes, classified_disease, icd_code, 
                category, visit_type, confidence, recorded_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            f_id, age, gender, "Fever, Body Pain, Headache",
            f"Patient presenting with symptoms of {disease}. Vital signs monitored.",
            disease, icd, category, v_type, confidence, recorded_at
        ))

    conn.commit()
    print(f"Successfully seeded 60 PHC records across {len(phcs)} facilities in Guntur District.")
    conn.close()

if __name__ == "__main__":
    seed_phc_data()
