import sqlite3
import random
from datetime import datetime, timedelta
import os
import csv
from bs4 import BeautifulSoup

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_NAME = os.path.join(BASE_DIR, 'health_surveillance.db')
MONTHWISE_DIR = os.path.join(BASE_DIR, 'Andhra Pradesh-monthwise')
ICD10_FILE = os.path.join(BASE_DIR, 'ICD10codes.csv')

# IDSP focus diseases
IDSP_DISEASES = {
    'Malaria': 'B50',
    'Dengue': 'A90',
    'Chikungunya': 'A92.0',
    'Typhoid': 'A01',
    'Cholera': 'A00',
    'Tuberculosis': 'A15',
    'Hepatitis A': 'B15',
    'Diarrhoea': 'A09'
}

def load_icd10_dict():
    icd10_map = {}
    if not os.path.exists(ICD10_FILE):
        print("ICD10codes.csv not found.")
        return icd10_map
    with open(ICD10_FILE, 'r', encoding='utf-8') as f:
        reader = csv.reader(f)
        for row in reader:
            if len(row) >= 6:
                code = row[2]
                desc = row[3]
                icd10_map[code] = desc
    return icd10_map

def parse_hmis_districts():
    # Parse just the April file to get the list of districts
    districts = []
    april_file = os.path.join(MONTHWISE_DIR, 'A - Andhra Pradesh_April.xls')
    if not os.path.exists(april_file):
        print(f"File not found: {april_file}")
        return districts
        
    with open(april_file, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    table = soup.find('table')
    if not table: return districts
    rows = table.find_all('tr')
    if len(rows) > 1:
        cells = rows[1].find_all(['th', 'td'])
        for cell in cells:
            text = cell.get_text(strip=True)
            if text and text != '_Andhra Pradesh':
                districts.append(text)
    return districts

def seed_idsp_data():
    print("Starting AI-Assisted IDSP Data Seeding...")
    icd10_map = load_icd10_dict()
    hmis_districts = parse_hmis_districts()
    
    if not hmis_districts:
        # Fallback districts
        hmis_districts = ['Anantapur', 'Chittoor', 'East Godavari', 'Guntur', 'Krishna', 'Kurnool', 'Prakasam', 'Visakhapatnam']

    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
    except Exception as err:
        print(f"Error connecting to DB: {err}")
        return

    # Ensure districts exist
    for d in hmis_districts:
        cursor.execute("INSERT OR IGNORE INTO districts (name) VALUES (?)", (d,))
    conn.commit()

    cursor.execute("SELECT id, name FROM districts")
    district_map = {row[1]: row[0] for row in cursor.fetchall()}

    # Ensure facilities exist for IDSP reporting
    for d_name, d_id in district_map.items():
        for i in range(2): # 2 Reporting Nodes per district
            cursor.execute("INSERT OR IGNORE INTO facilities (name, district_id, type) VALUES (?, ?, ?)", 
                           (f"{d_name} IDSP Node {i+1}", d_id, 'IDSP_CENTER'))
    conn.commit()

    cursor.execute("SELECT id FROM facilities WHERE type='IDSP_CENTER'")
    facility_ids = [row[0] for row in cursor.fetchall()]

    print(f"Seeding realistic IDSP records for {len(hmis_districts)} districts...")
    
    # Generate IDSP Outbreak Records (Last 3 months)
    records_to_insert = []
    for _ in range(5000): # 5000 records for IDSP dashboard
        f_id = random.choice(facility_ids) if facility_ids else 1
        age = random.randint(1, 75)
        gender = random.choice(['Male', 'Female'])
        
        disease_name = random.choice(list(IDSP_DISEASES.keys()))
        icd_code = IDSP_DISEASES[disease_name]
        
        # Real ICD10 description if available
        diagnosis_notes = icd10_map.get(icd_code.replace('.', ''), f"IDSP Outbreak Monitoring: {disease_name}")
        
        symptoms = f"Symptoms consistent with {disease_name}"
        visit = random.choice(['OP', 'IP'])
        days_ago = random.randint(0, 90)
        date = (datetime.now() - timedelta(days=days_ago, hours=random.randint(0,23))).strftime('%Y-%m-%d %H:%M:%S')
        
        patient_id = f"IDSP-AP-{random.randint(100000, 999999)}"
        
        records_to_insert.append((
            f_id, age, gender, patient_id, symptoms, diagnosis_notes, 
            disease_name, icd_code, "", "Communicable", visit, "idsp_surveillance", 
            round(random.uniform(0.85, 0.99), 2), date
        ))

    cursor.executemany("""
        INSERT INTO health_records 
        (facility_id, patient_age, patient_gender, patient_id_anonymized, symptoms, diagnosis_notes, classified_disease, icd_code, snomed_code, category, visit_type, classification_method, confidence, recorded_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, records_to_insert)

    conn.commit()
    cursor.close()
    conn.close()
    print("Success: IDSP and HMIS integrated data seeded. Ready for Outbreak Monitoring.")

if __name__ == "__main__":
    seed_idsp_data()
