import pandas as pd
import sqlite3
import os
from datetime import datetime

# Database path
DB_NAME = r'c:\Users\salma\Downloads\health_data smart\health_data smart\backend\health_surveillance.db'
MONTHWISE_DIR = r'c:\Users\salma\Downloads\health_data smart\health_data smart\backend\Andhra Pradesh-monthwise'

def get_year_for_month(month_name):
    if month_name in ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']:
        return 2019
    else:
        return 2020

def parse_hmis_file(file_path, month_name):
    try:
        dfs = pd.read_html(file_path)
        df = dfs[0]
        
        indicators = {
            'Dengue': "'14.4.2'",
            'Malaria': "'14.4.1'",
            'Hypertension': "'14.1.2'",
            'Diabetes': "'14.1.1'",
            'Diarrhea': "'14.4.7'"
        }
        
        extracted_data = []
        
        # Identify all unique district names from Level 1 of columns
        # Level 1 contains ['_Andhra Pradesh', 'Anantapur', 'Chittoor', ...]
        all_cols = df.columns.tolist()
        districts = sorted(list(set([c[1] for c in all_cols if not c[1].startswith('Unnamed') and c[1] != 'District'])))
        
        for disease, code_str in indicators.items():
            row_idx = df[df.iloc[:, 1] == code_str].index
            if not row_idx.empty:
                for district in districts:
                    if district == '_Andhra Pradesh': continue
                    
                    try:
                        # Find the column that matches (District, district, Total...)
                        col_to_use = None
                        for col in all_cols:
                            if col[1] == district and 'Total' in str(col[2]):
                                col_to_use = col
                                break
                        
                        if col_to_use:
                            count = df.loc[row_idx[0], col_to_use]
                            if pd.isna(count): count = 0
                            
                            extracted_data.append({
                                'district': district,
                                'disease': disease,
                                'count': int(count),
                                'month': month_name,
                                'year': get_year_for_month(month_name)
                            })
                    except Exception as e:
                        print(f"Error extracting {disease} for {district} in {month_name}: {e}")
        
        return extracted_data
    except Exception as e:
        print(f"Error parsing {file_path}: {e}")
        return []

def integrate_data():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    # Create aggregated table if not exists
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS hmis_official_counts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            district TEXT,
            disease TEXT,
            case_count INTEGER,
            month TEXT,
            year INTEGER,
            report_type TEXT DEFAULT 'Monthly'
        )
    """)
    
    # Clear existing to avoid duplicates if re-running
    cursor.execute("DELETE FROM hmis_official_counts")
    
    files = [f for f in os.listdir(MONTHWISE_DIR) if f.endswith('.xls')]
    total_integrated = 0
    
    for filename in sorted(files):
        month_name = filename.split('_')[-1].replace('.xls', '')
        file_path = os.path.join(MONTHWISE_DIR, filename)
        
        print(f"Processing {month_name}...")
        month_data = parse_hmis_file(file_path, month_name)
        
        for item in month_data:
            cursor.execute("""
                INSERT INTO hmis_official_counts (district, disease, case_count, month, year)
                VALUES (?, ?, ?, ?, ?)
            """, (item['district'], item['disease'], item['count'], item['month'], item['year']))
            total_integrated += 1
            
    conn.commit()
    conn.close()
    print(f"Integrated {total_integrated} HMIS summary data points into hmis_official_counts.")

if __name__ == "__main__":
    integrate_data()
