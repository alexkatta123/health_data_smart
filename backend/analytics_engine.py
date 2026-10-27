import pandas as pd
import numpy as np
from datetime import datetime, timedelta

def detect_trends(records_df: pd.DataFrame):
    """
    Step 5: Trend Detection Engine
    Analyzes temporal patterns to identify spikes/outbreaks.
    """
    if records_df.empty:
        return []

    # Ensure recorded_at is datetime
    records_df['recorded_at'] = pd.to_datetime(records_df['recorded_at'])
    
    # Daily counts
    daily_counts = records_df.groupby([records_df['recorded_at'].dt.date, 'classified_disease']).size().unstack(fill_value=0)
    
    trends = []
    
    for disease in daily_counts.columns:
        counts = daily_counts[disease].values
        if len(counts) < 3: continue
        
        # Calculate moving average to detect spikes
        avg_3day = np.mean(counts[-3:])
        prev_avg = np.mean(counts[:-3]) if len(counts) > 3 else np.mean(counts)
        
        if avg_3day > prev_avg * 1.5 and avg_3day > 5:
            trends.append({
                "disease": disease,
                "status": "Spike Detected",
                "increase": f"{round(((avg_3day - prev_avg)/prev_avg * 100), 1)}%",
                "risk_level": "High" if avg_3day > 10 else "Medium"
            })
            
    return trends

def get_geospatial_clusters(records_df: pd.DataFrame):
    """
    Step 6: Geospatial Intelligence
    Groups data by facility/district to find hotspots.
    """
    if records_df.empty:
        return []
        
    # Mock geospatial clustering logic
    hotspots = records_df.groupby('facility_id').size().reset_index(name='case_count')
    return hotspots.to_dict(orient='records')
