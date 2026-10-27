import sqlite3
import random
from datetime import datetime, timedelta

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, 'health_surveillance.db')

def seed_hmis_data():
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
    except Exception as err:
        print(f"Error: {err}")
        return

    # All 26 Districts of Andhra Pradesh
    districts = [
        'Alluri Sitharama Raju', 'Anakapalli', 'Anantapur', 'Annamayya', 'Bapatla', 
        'Chittoor', 'East Godavari', 'Eluru', 'Guntur', 'Kakinada', 'Konaseema', 
        'Krishna', 'Kurnool', 'Nandyal', 'NTR', 'Palnadu', 'Parvathipuram Manyam', 
        'Prakasam', 'Sri Potti Sriramulu Nellore', 'Sri Sathya Sai', 'Srikakulam', 
        'Tirupati', 'Visakhapatnam', 'Vizianagaram', 'West Godavari', 'YSR Kadapa'
    ]
    
    # Ensure districts exist
    for d in districts:
        cursor.execute("INSERT OR IGNORE INTO districts (name) VALUES (?)", (d,))
    conn.commit()

    # Get district IDs
    cursor.execute("SELECT id FROM districts")
    district_ids = [row[0] for row in cursor.fetchall()]

    # District coordinate mapping (Approximate centers to avoid the sea)
    district_coords = {
        'Alluri Sitharama Raju': (18.1, 82.2), 'Anakapalli': (17.7, 82.8), 'Anantapur': (14.6, 77.6), 
        'Annamayya': (14.0, 78.8), 'Bapatla': (15.9, 80.2), 'Chittoor': (13.2, 79.1), 
        'East Godavari': (17.1, 81.8), 'Eluru': (16.7, 81.1), 'Guntur': (16.3, 80.4), 
        'Kakinada': (17.0, 82.2), 'Konaseema': (16.5, 82.0), 'Krishna': (16.2, 80.8), 
        'Kurnool': (15.8, 78.0), 'Nandyal': (15.5, 78.4), 'NTR': (16.5, 80.5), 
        'Palnadu': (16.2, 79.5), 'Parvathipuram Manyam': (18.8, 83.4), 'Prakasam': (15.5, 79.4), 
        'Sri Potti Sriramulu Nellore': (14.4, 79.9), 'Sri Sathya Sai': (14.2, 77.7), 
        'Srikakulam': (18.3, 83.9), 'Tirupati': (13.6, 79.4), 'Visakhapatnam': (17.7, 83.3), 
        'Vizianagaram': (18.1, 83.4), 'West Godavari': (16.7, 81.5), 'YSR Kadapa': (14.5, 78.5)
    }

    # Ensure facilities exist with precise land-based coordinates
    for d_name in districts:
        cursor.execute("SELECT id FROM districts WHERE name = ?", (d_name,))
        d_id = cursor.fetchone()[0]
        
        base_lat, base_lng = district_coords.get(d_name, (15.0, 79.0))
        
        for i in range(3): # 3 PHCs per district
            # Small jitter to scatter markers around the district center (avoiding sea)
            lat = base_lat + random.uniform(-0.15, 0.15)
            lng = base_lng + random.uniform(-0.15, 0.15)
            
            cursor.execute("INSERT OR IGNORE INTO facilities (name, district_id, type, latitude, longitude) VALUES (?, ?, ?, ?, ?)", 
                           (f"{d_name} PHC Node {i+1}", d_id, 'PHC', lat, lng))
    conn.commit()

    cursor.execute("SELECT id FROM facilities")
    facility_ids = [row[0] for row in cursor.fetchall()]

    # HMIS specific reporting indicators (Last 2 Months Simulation)
    # Focus on realistic public health indicators from HMIS
    diseases = [
        ("Dengue Fever", "A90", "Communicable", "Fever, Rash, Joint Pain"),
        ("Typhoid Fever", "A01", "Communicable", "High Fever, Abdominal Pain"),
        ("Acute Diarrheal Disease", "A09", "Communicable", "Loose stools, Dehydration"),
        ("Pneumonia", "J18", "Communicable", "Cough, Breathing difficulty"),
        ("Tuberculosis", "A15", "Communicable", "Chronic cough, Weight loss"),
        ("Diabetes Mellitus", "E11", "Non-Communicable", "Frequent urination, Fatigue"),
        ("Hypertension", "I10", "Non-Communicable", "Headache, High BP reading"),
        ("Severe Anemia", "D50", "Non-Communicable", "Extreme fatigue, Pale skin")
    ]

    print("Generating 3000 realistic HMIS records for the last 60 days across AP...")
    for _ in range(3000):
        f_id = random.choice(facility_ids) if facility_ids else 1
        age = random.randint(1, 80)
        gender = random.choice(['Male', 'Female', 'Female', 'Female']) # Slight skew for maternal health data typical in HMIS
        disease, code, cat, symptoms = random.choice(diseases)
        
        # 60 days ago until now
        days_ago = random.randint(0, 60)
        date = (datetime.now() - timedelta(days=days_ago, hours=random.randint(0, 23), minutes=random.randint(0, 59))).strftime('%Y-%m-%d %H:%M:%S')
        
        visit = random.choice(['OP', 'OP', 'OP', 'IP']) # Mostly OP
        
        cursor.execute("""
            INSERT INTO health_records 
            (facility_id, patient_age, patient_gender, patient_id_anonymized, symptoms, diagnosis_notes, classified_disease, icd_code, snomed_code, category, visit_type, classification_method, confidence, recorded_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (f_id, age, gender, f"HMIS-AP-{random.randint(10000,99999)}", symptoms, "HMIS Portal Sync Data", disease, code, "", cat, visit, "hmis_api", 0.99, date))

    conn.commit()
    cursor.close()
    conn.close()
    print("Success: HMIS portal data successfully seeded into database.")

if __name__ == "__main__":
    seed_hmis_data()
