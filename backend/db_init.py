import sqlite3
import os

DB_NAME = 'health_surveillance.db'

def init_db():
    try:
        conn = sqlite3.connect(DB_NAME)
        cursor = conn.cursor()
        print(f"Connected to SQLite database: {DB_NAME}")
    except Exception as err:
        print(f"Error connecting to SQLite: {err}")
        return

    TABLES = {}
    TABLES['districts'] = (
        "CREATE TABLE IF NOT EXISTS districts ("
        "  id INTEGER PRIMARY KEY AUTO_INCREMENT,"
        "  name TEXT NOT NULL"
        ")")

    TABLES['facilities'] = (
        "CREATE TABLE IF NOT EXISTS facilities ("
        "  id INTEGER PRIMARY KEY AUTO_INCREMENT,"
        "  name TEXT NOT NULL,"
        "  district_id INTEGER,"
        "  type TEXT NOT NULL,"
        "  FOREIGN KEY (district_id) REFERENCES districts (id) ON DELETE CASCADE"
        ")")

    # Health records is handled by SQLAlchemy in main.py, 
    # but we'll add it here too if we want to run this script standalone.
    TABLES['health_records'] = (
        "CREATE TABLE IF NOT EXISTS health_records ("
        "  id INTEGER PRIMARY KEY AUTO_INCREMENT,"
        "  facility_id INTEGER,"
        "  patient_age INTEGER,"
        "  patient_gender TEXT,"
        "  symptoms TEXT,"
        "  diagnosis_notes TEXT,"
        "  classified_disease TEXT,"
        "  icd_code TEXT,"
        "  category TEXT,"
        "  visit_type TEXT,"
        "  confidence REAL DEFAULT 0.0,"
        "  officer_validated INTEGER DEFAULT 0,"
        "  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
        ")")

    for table_name in TABLES:
        table_description = TABLES[table_name]
        # SQLite uses INTEGER PRIMARY KEY for auto increment, but slightly different syntax
        # Let's fix the AUTO_INCREMENT for SQLite
        table_description = table_description.replace("AUTO_INCREMENT", "")
        
        try:
            print(f"Creating table {table_name}: ", end='')
            cursor.execute(table_description)
        except Exception as err:
            print(f"Error: {err}")
        else:
            print("OK")

    conn.commit()
    cursor.close()
    conn.close()

if __name__ == "__main__":
    init_db()
