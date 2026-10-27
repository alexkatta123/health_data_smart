import re
import string

def clean_text(text: str) -> str:
    """
    : Data Preprocessing
    Normalizes medical text, removes punctuation, and handles case sensitivity.
    """
    if not text:
        return ""
    
    # Convert to lowercase
    text = text.lower()
    
    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))
    
    # Remove extra whitespaces
    text = re.sub(r'\s+', ' ', text).strip()
    
    # Normalize common medical abbreviations (Simplified)
    abbreviations = {
        "bp": "blood pressure",
        "hr": "heart rate",
        "temp": "temperature",
        "pt": "patient",
        "sob": "shortness of breath"
    }
    
    for abbr, full in abbreviations.items():
        text = re.sub(r'\b' + abbr + r'\b', full, text)
        
    return text

def anonymize_data(patient_name: str) -> str:
    """
    : DPDP Compliance
    Simple anonymization for demonstration.
    """
    return "ANON_" + patient_name[:2].upper() + "XX"
