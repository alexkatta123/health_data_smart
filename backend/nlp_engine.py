import re
import json
import os
from typing import Dict

# Load the expanded ICD + SNOMED CT database
_codes_path = os.path.join(os.path.dirname(__file__), "disease_codes.json")
with open(_codes_path, "r") as f:
    DISEASE_DATABASE = json.load(f)

# Symptom-to-disease mapping for keyword-based NER (expanded)
SYMPTOM_MAP = {
    "fever": ["dengue", "malaria", "typhoid", "influenza", "covid", "chikungunya", "leptospirosis", "measles"],
    "high fever": ["dengue", "malaria", "typhoid"],
    "cough": ["influenza", "covid", "tuberculosis", "pneumonia", "asthma", "copd"],
    "persistent cough": ["tuberculosis", "copd"],
    "sugar": ["diabetes"],
    "blood sugar": ["diabetes"],
    "glucose": ["diabetes"],
    "blood pressure": ["hypertension"],
    "bp high": ["hypertension"],
    "rash": ["dengue", "measles", "chickenpox", "scabies", "eczema", "psoriasis"],
    "joint pain": ["dengue", "chikungunya", "rheumatoid arthritis", "osteoarthritis"],
    "body pain": ["dengue", "malaria", "influenza", "chikungunya"],
    "headache": ["dengue", "malaria", "typhoid", "meningitis", "hypertension"],
    "vomiting": ["cholera", "gastroenteritis", "typhoid", "diarrhea"],
    "diarrhea": ["cholera", "gastroenteritis", "diarrhea", "dysentery"],
    "loose stools": ["diarrhea", "gastroenteritis", "cholera"],
    "abdominal pain": ["typhoid", "gastroenteritis", "peptic ulcer", "dysentery"],
    "weight loss": ["tuberculosis", "diabetes", "cancer breast", "cancer lung", "hyperthyroidism"],
    "night sweats": ["tuberculosis", "malaria"],
    "breathlessness": ["asthma", "copd", "pneumonia", "heart failure", "covid"],
    "shortness of breath": ["asthma", "copd", "heart failure", "pneumonia"],
    "wheezing": ["asthma", "copd"],
    "chest pain": ["coronary artery disease", "heart failure", "pneumonia"],
    "palpitations": ["hyperthyroidism", "anxiety", "coronary artery disease"],
    "swelling": ["heart failure", "chronic kidney disease", "hypothyroidism"],
    "fatigue": ["anemia", "iron deficiency anemia", "hypothyroidism", "diabetes", "depression"],
    "tiredness": ["anemia", "iron deficiency anemia", "hypothyroidism"],
    "pale": ["anemia", "iron deficiency anemia"],
    "bleeding": ["dengue hemorrhagic"],
    "yellow eyes": ["hepatitis a", "hepatitis b", "hepatitis c", "cirrhosis"],
    "jaundice": ["hepatitis a", "hepatitis b", "hepatitis c", "cirrhosis", "malaria"],
    "seizure": ["epilepsy", "meningitis"],
    "convulsion": ["epilepsy"],
    "eye redness": ["conjunctivitis"],
    "itching": ["scabies", "eczema", "psoriasis"],
    "burning urination": ["urinary tract infection"],
    "frequent urination": ["diabetes", "urinary tract infection"],
    "sadness": ["depression"],
    "insomnia": ["anxiety", "depression"],
    "nervousness": ["anxiety", "hyperthyroidism"],
    "bite": ["snake bite", "dog bite", "rabies"],
    "neck stiffness": ["meningitis"],
    "sore throat": ["diphtheria", "influenza"],
    "whooping cough": ["pertussis"],
    "muscle stiffness": ["tetanus"],
    "red eyes": ["conjunctivitis", "measles"],
}

# ── ML Classifier (scikit-learn TF-IDF + Multinomial Naive Bayes) ──
_ml_model = None
_ml_vectorizer = None
_ml_label_encoder = None

def _build_ml_training_data():
    """Generate synthetic training samples from our symptom map + disease database."""
    import random
    texts = []
    labels = []
    symptom_keys = list(SYMPTOM_MAP.keys())

    for disease_key, disease_info in DISEASE_DATABASE.items():
        related_symptoms = [s for s, diseases in SYMPTOM_MAP.items() if disease_key in diseases]
        if not related_symptoms:
            related_symptoms = random.sample(symptom_keys, min(3, len(symptom_keys)))

        # Create 15 synthetic records per disease for training
        for _ in range(15):
            n_symptoms = random.randint(1, min(4, len(related_symptoms)))
            chosen = random.sample(related_symptoms, n_symptoms)
            text = f"patient presents with {', '.join(chosen)}. diagnosis notes indicate possible {disease_info['name'].lower()}"
            texts.append(text)
            labels.append(disease_key)

    return texts, labels

def _get_ml_model():
    """Lazy-load and train the ML model on first use."""
    global _ml_model, _ml_vectorizer, _ml_label_encoder
    if _ml_model is not None:
        return _ml_model, _ml_vectorizer, _ml_label_encoder

    try:
        from sklearn.feature_extraction.text import TfidfVectorizer
        from sklearn.naive_bayes import MultinomialNB
        from sklearn.preprocessing import LabelEncoder

        texts, labels = _build_ml_training_data()

        _ml_vectorizer = TfidfVectorizer(max_features=500, ngram_range=(1, 2), stop_words='english')
        X = _ml_vectorizer.fit_transform(texts)

        _ml_label_encoder = LabelEncoder()
        y = _ml_label_encoder.fit_transform(labels)

        _ml_model = MultinomialNB(alpha=0.1)
        _ml_model.fit(X, y)

        print(f"[NLP Engine] ML model trained on {len(texts)} samples, {len(DISEASE_DATABASE)} classes")
        return _ml_model, _ml_vectorizer, _ml_label_encoder
    except ImportError:
        print("[NLP Engine] scikit-learn not available, falling back to keyword-only mode")
        return None, None, None

def _ml_classify(combined_text: str) -> Dict:
    """Classify using the trained ML model."""
    model, vectorizer, encoder = _get_ml_model()
    if model is None:
        return None

    X = vectorizer.transform([combined_text])
    proba = model.predict_proba(X)[0]
    top_idx = proba.argmax()
    confidence = float(proba[top_idx])
    disease_key = encoder.inverse_transform([top_idx])[0]

    if disease_key in DISEASE_DATABASE:
        data = DISEASE_DATABASE[disease_key]
        return {
            "disease": data["name"],
            "code": data["icd"],
            "snomed_code": data["snomed"],
            "category": data["category"],
            "confidence": round(confidence, 2),
            "method": "ml_classifier"
        }
    return None

def _keyword_classify(combined_text: str) -> Dict:
    """Fallback: keyword-based classification."""
    scores = {}

    for symptom, associated_diseases in SYMPTOM_MAP.items():
        if symptom in combined_text:
            for disease in associated_diseases:
                scores[disease] = scores.get(disease, 0) + 1

    for disease in DISEASE_DATABASE.keys():
        if disease in combined_text:
            scores[disease] = scores.get(disease, 0) + 5

    if not scores:
        return {
            "disease": "Undifferentiated Fever",
            "code": "R50.9",
            "snomed_code": "386661006",
            "category": "Other",
            "confidence": 0.45,
            "method": "keyword_fallback"
        }

    best_match = max(scores, key=scores.get)
    data = DISEASE_DATABASE[best_match]
    total_score = sum(scores.values())
    confidence = min(0.95, (scores[best_match] / total_score) if total_score > 0 else 0.5)

    return {
        "disease": data["name"],
        "code": data["icd"],
        "snomed_code": data["snomed"],
        "category": data["category"],
        "confidence": round(confidence, 2),
        "method": "keyword_ner"
    }

def classify_patient_record(symptoms: str, notes: str) -> Dict:
    """
    Hybrid NLP Classification Pipeline:
    1. Try ML classifier (TF-IDF + Naive Bayes) first
    2. Fall back to keyword-based NER if ML confidence is low
    3. Returns ICD-10 code, SNOMED CT code, category, and confidence
    """
    combined_text = (symptoms + " " + notes).lower()

    # Try ML classification first
    ml_result = _ml_classify(combined_text)

    if ml_result and ml_result["confidence"] >= 0.3:
        return ml_result

    # Fallback to keyword-based
    keyword_result = _keyword_classify(combined_text)

    # If ML result exists but low confidence, compare with keyword
    if ml_result and keyword_result:
        if ml_result["confidence"] > keyword_result["confidence"]:
            return ml_result

    return keyword_result
