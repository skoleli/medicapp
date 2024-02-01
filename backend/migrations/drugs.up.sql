-- Analgesics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (1, 'Aspirin', 'https://example.com/aspirin.jpg', 'Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain and reduce inflammation.', 'Common side effects include stomach pain and heartburn.', 'Do not use if allergic to aspirin or taking blood-thinning medications.'),
  (1, 'Ibuprofen', 'https://example.com/ibuprofen.jpg', 'Ibuprofen is a medication in the nonsteroidal anti-inflammatory drug (NSAID) class used for treating pain and inflammation.', 'Common side effects include upset stomach, heartburn, and drowsiness.', 'Avoid taking on an empty stomach. Consult a doctor if you experience serious side effects.'),
  (1, 'Acetaminophen', 'https://example.com/acetaminophen.jpg', 'Acetaminophen is a pain reliever and a fever reducer.', 'Side effects are rare but may include rash, itching, and swelling.', 'Do not exceed the recommended dosage. Overdose can lead to liver damage.'),
  (1, 'Naproxen', 'https://example.com/naproxen.jpg', 'Naproxen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain and inflammation.', 'Common side effects include upset stomach, heartburn, and drowsiness.', 'Long-term use may increase the risk of heart attack or stroke.'),
  (1, 'Diclofenac', 'https://example.com/diclofenac.jpg', 'Diclofenac is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation.', 'Common side effects include stomach pain and indigestion.', 'Do not use if allergic to diclofenac or have a history of heart or kidney problems.');

-- Antipyretics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (2, 'Paracetamol', 'https://example.com/paracetamol.jpg', 'Paracetamol is a common pain reliever and fever reducer.', 'Rare side effects may include skin rash or bruising.', 'Follow recommended dosages. Overdose can cause severe liver damage.'),
  (2, 'Ibuprofen', 'https://example.com/ibuprofen_antipyretic.jpg', 'Ibuprofen is a medication in the nonsteroidal anti-inflammatory drug (NSAID) class used for treating pain and inflammation.', 'Common side effects include upset stomach, heartburn, and drowsiness.', 'Avoid taking on an empty stomach. Consult a doctor if you experience serious side effects.'),
  (2, 'Aspirin', 'https://example.com/aspirin_antipyretic.jpg', 'Aspirin is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain and reduce inflammation.', 'Common side effects include stomach pain and heartburn.', 'Do not use if allergic to aspirin or taking blood-thinning medications.'),
  (2, 'Acetaminophen', 'https://example.com/acetaminophen_antipyretic.jpg', 'Acetaminophen is a pain reliever and a fever reducer.', 'Side effects are rare but may include rash, itching, and swelling.', 'Do not exceed the recommended dosage. Overdose can lead to liver damage.'),
  (2, 'Naproxen', 'https://example.com/naproxen_antipyretic.jpg', 'Naproxen is a nonsteroidal anti-inflammatory drug (NSAID) used to relieve pain and inflammation.', 'Common side effects include upset stomach, heartburn, and drowsiness.', 'Long-term use may increase the risk of heart attack or stroke.');

-- Antibiotics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (3, 'Amoxicillin', 'https://example.com/amoxicillin.jpg', 'Amoxicillin is an antibiotic used to treat bacterial infections.', 'Common side effects include nausea, vomiting, and diarrhea.', 'Finish the entire course of antibiotics as prescribed.'),
  (3, 'Ciprofloxacin', 'https://example.com/ciprofloxacin.jpg', 'Ciprofloxacin is an antibiotic used to treat a variety of bacterial infections.', 'Common side effects include dizziness, headache, and stomach upset.', 'Avoid prolonged sun exposure and stay hydrated while taking ciprofloxacin.'),
  (3, 'Azithromycin', 'https://example.com/azithromycin.jpg', 'Azithromycin is an antibiotic used to treat a variety of bacterial infections.', 'Common side effects include stomach pain, nausea, and diarrhea.', 'Take azithromycin on an empty stomach, at least 1 hour before or 2 hours after a meal.'),
  (3, 'Penicillin', 'https://example.com/penicillin.jpg', 'Penicillin is an antibiotic used to treat various bacterial infections.', 'Common side effects include rash, itching, and stomach upset.', 'Inform your doctor if you have a history of allergies to penicillin or other antibiotics.'),
  (3, 'Doxycycline', 'https://example.com/doxycycline.jpg', 'Doxycycline is an antibiotic used to treat bacterial infections.', 'Common side effects include nausea, vomiting, and sensitivity to sunlight.', 'Take doxycycline with a full glass of water and remain upright for at least 30 minutes after taking it.');

-- Antivirals kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (4, 'Oseltamivir', 'https://example.com/oseltamivir.jpg', 'Oseltamivir is an antiviral medication used to treat influenza (flu).', 'Common side effects include nausea and vomiting.', 'Start treatment within 48 hours of flu symptoms. Follow the prescribed dosage.'),
  (4, 'Acyclovir', 'https://example.com/acyclovir.jpg', 'Acyclovir is an antiviral drug used to treat herpes simplex, chickenpox, and shingles.', 'Common side effects include nausea and diarrhea.', 'Stay well-hydrated during acyclovir treatment.'),
  (4, 'Lopinavir/Ritonavir', 'https://example.com/lopinavir_ritonavir.jpg', 'Lopinavir/Ritonavir is a combination antiviral medication used to treat HIV.', 'Common side effects include nausea, diarrhea, and headache.', 'Take with food to enhance absorption.'),
  (4, 'Remdesivir', 'https://example.com/remdesivir.jpg', 'Remdesivir is an antiviral medication used to treat COVID-19.', 'Common side effects include nausea and headache.', 'Administered intravenously in a healthcare setting.'),
  (4, 'Zanamivir', 'https://example.com/zanamivir.jpg', 'Zanamivir is an antiviral medication used to treat and prevent influenza (flu).', 'Common side effects include respiratory tract irritation.', 'Inhale through the mouth using a special inhaler.');

-- Antifungals kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (5, 'Fluconazole', 'https://example.com/fluconazole.jpg', 'Fluconazole is an antifungal medication used to treat yeast infections and other fungal infections.', 'Common side effects include nausea, headache, and stomach pain.', 'Finish the entire course of medication even if symptoms improve.'),
  (5, 'Ketoconazole', 'https://example.com/ketoconazole.jpg', 'Ketoconazole is an antifungal medication used to treat fungal infections on the skin and nails.', 'Common side effects include itching and rash.', 'Avoid alcohol and certain medications while taking ketoconazole.'),
  (5, 'Terbinafine', 'https://example.com/terbinafine.jpg', 'Terbinafine is an antifungal medication used to treat fungal infections of the skin and nails.', 'Common side effects include diarrhea, rash, and stomach upset.', 'Notify your doctor if you experience persistent or severe side effects.'),
  (5, 'Itraconazole', 'https://example.com/itraconazole.jpg', 'Itraconazole is an antifungal medication used to treat a variety of fungal infections.', 'Common side effects include nausea, vomiting, and abdominal pain.', 'Take with a full meal to enhance absorption.'),
  (5, 'Nystatin', 'https://example.com/nystatin.jpg', 'Nystatin is an antifungal medication used to treat fungal infections of the skin, mouth, and gastrointestinal tract.', 'Common side effects include diarrhea and stomach upset.', 'Contact your doctor if symptoms do not improve after treatment.');

-- Antiseptics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (6, 'Chlorhexidine', 'https://example.com/chlorhexidine.jpg', 'Chlorhexidine is an antiseptic and disinfectant used to clean and disinfect the skin before surgery and to treat various skin conditions.', 'Skin irritation may occur in some cases.', 'Avoid contact with eyes and ears. Rinse thoroughly if contact occurs.'),
  (6, 'Povidone-Iodine', 'https://example.com/povidone_iodine.jpg', 'Povidone-Iodine is an antiseptic used to disinfect the skin before surgery and to treat minor wounds and infections.', 'Skin irritation may occur in some cases.', 'Avoid using on deep wounds or puncture wounds.'),
  (6, 'Hydrogen Peroxide', 'https://example.com/hydrogen_peroxide.jpg', 'Hydrogen Peroxide is an antiseptic used to clean and disinfect wounds and as a mouthwash.', 'May cause temporary skin irritation.', 'Do not swallow. If ingested, seek medical attention.'),
  (6, 'Benzalkonium Chloride', 'https://example.com/benzalkonium_chloride.jpg', 'Benzalkonium Chloride is an antiseptic used to clean and disinfect skin and mucous membranes.', 'Rare side effects may include skin rash or irritation.', 'Avoid contact with eyes and mouth.'),
  (6, 'Isopropyl Alcohol', 'https://example.com/isopropyl_alcohol.jpg', 'Isopropyl Alcohol is an antiseptic used to clean and disinfect skin and surfaces.', 'May cause dryness or irritation.', 'Keep away from heat and flames. For external use only.');

-- Antacids kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (7, 'Tums', 'https://example.com/tums.jpg', 'Tums is an antacid used to relieve heartburn and indigestion.', 'Side effects are rare but may include constipation.', 'Do not exceed the recommended dosage. Consult a doctor if symptoms persist.'),
  (7, 'Rolaids', 'https://example.com/rolaids.jpg', 'Rolaids is an antacid used for the relief of heartburn and indigestion.', 'Common side effects include constipation or diarrhea.', 'Take as directed. If symptoms persist, consult a healthcare professional.'),
  (7, 'Maalox', 'https://example.com/maalox.jpg', 'Maalox is an antacid used to relieve indigestion and heartburn.', 'Side effects are rare but may include diarrhea.', 'Avoid using Maalox if you have kidney problems.'),
  (7, 'Pepto-Bismol', 'https://example.com/pepto_bismol.jpg', 'Pepto-Bismol is an antacid and anti-diarrheal medication used to treat heartburn, indigestion, and upset stomach.', 'Common side effects include darkening of the tongue or stool.', 'Contact a doctor if symptoms persist or worsen.'),
  (7, 'Alka-Seltzer', 'https://example.com/alka_seltzer.jpg', 'Alka-Seltzer is an antacid and pain reliever used to treat heartburn, acid indigestion, and headache.', 'Common side effects include nausea and stomach cramps.', 'Avoid using with other salicylate-containing products.');

-- Antihistamines kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (8, 'Loratadine', 'https://example.com/loratadine.jpg', 'Loratadine is an antihistamine used to relieve allergy symptoms.', 'Common side effects include headache and dry mouth.', 'Take loratadine as directed by your doctor or pharmacist.'),
  (8, 'Cetirizine', 'https://example.com/cetirizine.jpg', 'Cetirizine is an antihistamine used to relieve allergy symptoms such as watery eyes, runny nose, and itching.', 'Common side effects include drowsiness and dry mouth.', 'Avoid activities requiring mental alertness while taking cetirizine.'),
  (8, 'Diphenhydramine', 'https://example.com/diphenhydramine.jpg', 'Diphenhydramine is an antihistamine used to relieve symptoms of allergy, hay fever, and the common cold.', 'Common side effects include drowsiness and dry mouth.', 'Avoid alcohol and other sedatives while taking diphenhydramine.'),
  (8, 'Fexofenadine', 'https://example.com/fexofenadine.jpg', 'Fexofenadine is an antihistamine used to relieve allergy symptoms such as sneezing, runny nose, and itchy eyes.', 'Common side effects include headache and back pain.', 'Take fexofenadine with or without food.');

-- Anticoagulants kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (9, 'Warfarin', 'https://example.com/warfarin.jpg', 'Warfarin is an anticoagulant used to prevent and treat blood clots.', 'Common side effects include bleeding and easy bruising.', 'Regular monitoring of blood clotting time (INR) is required.'),
  (9, 'Rivaroxaban', 'https://example.com/rivaroxaban.jpg', 'Rivaroxaban is an anticoagulant used to reduce the risk of stroke and blood clots in people with atrial fibrillation.', 'Common side effects include bleeding and muscle pain.', 'Take rivaroxaban with food to enhance absorption.'),
  (9, 'Apixaban', 'https://example.com/apixaban.jpg', 'Apixaban is an anticoagulant used to prevent blood clots in people with certain heart rhythm disorders.', 'Common side effects include bleeding and bruising.', 'Do not stop taking apixaban without consulting your doctor.'),
  (9, 'Dabigatran', 'https://example.com/dabigatran.jpg', 'Dabigatran is an anticoagulant used to reduce the risk of stroke and blood clots in people with atrial fibrillation.', 'Common side effects include bleeding and stomach upset.', 'Take dabigatran with a full glass of water.'),
  (9, 'Heparin', 'https://example.com/heparin.jpg', 'Heparin is an anticoagulant used to prevent and treat blood clots.', 'Common side effects include bleeding and low blood platelets.', 'Administered by injection under the skin or into a vein.');

-- Antidepressants kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (10, 'Fluoxetine', 'https://example.com/fluoxetine.jpg', 'Fluoxetine is an antidepressant used to treat major depressive disorder, obsessive-compulsive disorder, and panic disorder.', 'Common side effects include nausea and insomnia.', 'May take several weeks to feel the full benefits.'),
  (10, 'Sertraline', 'https://example.com/sertraline.jpg', 'Sertraline is an antidepressant used to treat depression, obsessive-compulsive disorder, and social anxiety disorder.', 'Common side effects include diarrhea and dizziness.', 'Notify your doctor if you experience worsening mood or thoughts of suicide.'),
  (10, 'Venlafaxine', 'https://example.com/venlafaxine.jpg', 'Venlafaxine is an antidepressant used to treat major depressive disorder, generalized anxiety disorder, and panic disorder.', 'Common side effects include drowsiness and increased sweating.', 'Avoid alcohol and certain medications while taking venlafaxine.'),
  (10, 'Citalopram', 'https://example.com/citalopram.jpg', 'Citalopram is an antidepressant used to treat depression and panic disorder.', 'Common side effects include dry mouth and drowsiness.', 'Do not stop taking citalopram abruptly; consult your doctor for a tapering schedule.'),
  (10, 'Bupropion', 'https://example.com/bupropion.jpg', 'Bupropion is an antidepressant used to treat major depressive disorder and to help people quit smoking.', 'Common side effects include insomnia and dry mouth.', 'Notify your doctor if you experience mood changes or suicidal thoughts.');

-- Antipsychotics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (11, 'Risperidone', 'https://example.com/risperidone.jpg', 'Risperidone is an antipsychotic used to treat schizophrenia and bipolar disorder.', 'Common side effects include weight gain and drowsiness.', 'Regular monitoring of blood sugar and cholesterol levels is recommended.'),
  (11, 'Olanzapine', 'https://example.com/olanzapine.jpg', 'Olanzapine is an antipsychotic used to treat schizophrenia and bipolar disorder.', 'Common side effects include weight gain and drowsiness.', 'May increase the risk of high blood sugar and cholesterol.'),
  (11, 'Quetiapine', 'https://example.com/quetiapine.jpg', 'Quetiapine is an antipsychotic used to treat schizophrenia and bipolar disorder.', 'Common side effects include drowsiness and weight gain.', 'May cause dizziness; rise slowly from a sitting or lying position.'),
  (11, 'Aripiprazole', 'https://example.com/aripiprazole.jpg', 'Aripiprazole is an antipsychotic used to treat schizophrenia and bipolar disorder.', 'Common side effects include headache and nausea.', 'Notify your doctor if you experience uncontrollable movements or signs of high blood sugar.'),
  (11, 'Clozapine', 'https://example.com/clozapine.jpg', 'Clozapine is an antipsychotic used to treat schizophrenia in patients who do not respond to other medications.', 'Common side effects include weight gain and increased saliva.', 'Requires regular blood tests to monitor for a serious side effect called agranulocytosis.');

-- Antiemetics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (12, 'Ondansetron', 'https://example.com/ondansetron.jpg', 'Ondansetron is an antiemetic used to prevent nausea and vomiting caused by chemotherapy or surgery.', 'Common side effects include headache and constipation.', 'Inform your doctor if you have a history of heart problems.'),
  (12, 'Metoclopramide', 'https://example.com/metoclopramide.jpg', 'Metoclopramide is an antiemetic used to treat nausea and vomiting caused by certain conditions and medications.', 'Common side effects include drowsiness and diarrhea.', 'May cause irreversible tardive dyskinesia; notify your doctor of any unusual movements.'),
  (12, 'Prochlorperazine', 'https://example.com/prochlorperazine.jpg', 'Prochlorperazine is an antiemetic used to treat severe nausea and vomiting.', 'Common side effects include drowsiness and dry mouth.', 'Avoid activities requiring mental alertness while taking prochlorperazine.'),
  (12, 'Diphenhydramine', 'https://example.com/diphenhydramine_antiemetic.jpg', 'Diphenhydramine is an antiemetic used to prevent and treat nausea and vomiting.', 'Common side effects include drowsiness and dry mouth.', 'Avoid alcohol and other sedatives while taking diphenhydramine.'),
  (12, 'Scopolamine', 'https://example.com/scopolamine.jpg', 'Scopolamine is an antiemetic used to prevent nausea and vomiting associated with motion sickness and anesthesia.', 'Common side effects include dry mouth and blurred vision.', 'Apply the patch to a hairless area behind the ear at least 4 hours before needed.');
-- Diğer ilaç kategorileri için benzer INSERT işlemlerini devam ettirin

-- Bronchodilators kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (13, 'Albuterol', 'https://example.com/albuterol.jpg', 'Albuterol is a bronchodilator used to treat and prevent bronchospasm in conditions such as asthma and chronic obstructive pulmonary disease (COPD).', 'Common side effects include tremors and nervousness.', 'Seek medical attention if symptoms do not improve or worsen.'),
  (13, 'Formoterol', 'https://example.com/formoterol.jpg', 'Formoterol is a long-acting bronchodilator used to treat asthma and COPD.', 'Common side effects include headache and increased heart rate.', 'Not for use as a rescue medication.'),
  (13, 'Ipratropium', 'https://example.com/ipratropium.jpg', 'Ipratropium is a bronchodilator used to treat bronchospasm associated with COPD.', 'Common side effects include dry mouth and blurred vision.', 'Rinse mouth after each use to prevent dry mouth.'),
  (13, 'Salmeterol', 'https://example.com/salmeterol.jpg', 'Salmeterol is a long-acting bronchodilator used to treat asthma and COPD.', 'Common side effects include headache and throat irritation.', 'Not for use as a rescue medication.'),
  (13, 'Terbutaline', 'https://example.com/terbutaline.jpg', 'Terbutaline is a bronchodilator used to treat bronchospasm associated with asthma and COPD.', 'Common side effects include tremors and palpitations.', 'Seek medical attention if symptoms persist or worsen.');

-- Diuretics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (14, 'Hydrochlorothiazide', 'https://example.com/hydrochlorothiazide.jpg', 'Hydrochlorothiazide is a diuretic used to treat high blood pressure and fluid retention.', 'Common side effects include dizziness and increased urination.', 'Monitor blood pressure and kidney function regularly.'),
  (14, 'Furosemide', 'https://example.com/furosemide.jpg', 'Furosemide is a loop diuretic used to treat edema and hypertension.', 'Common side effects include dehydration and electrolyte imbalance.', 'Take in the morning to avoid nighttime urination.'),
  (14, 'Spironolactone', 'https://example.com/spironolactone.jpg', 'Spironolactone is a diuretic used to treat fluid retention and high blood pressure.', 'Common side effects include breast tenderness and increased potassium levels.', 'Avoid potassium supplements and salt substitutes.'),
  (14, 'Bumetanide', 'https://example.com/bumetanide.jpg', 'Bumetanide is a loop diuretic used to treat edema and heart failure.', 'Common side effects include dizziness and muscle cramps.', 'Monitor electrolytes regularly during treatment.'),
  (14, 'Chlorthalidone', 'https://example.com/chlorthalidone.jpg', 'Chlorthalidone is a diuretic used to treat high blood pressure and edema.', 'Common side effects include dizziness and increased blood glucose levels.', 'Report signs of electrolyte imbalance to your doctor.');

-- Antidiabetics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (15, 'Metformin', 'https://example.com/metformin.jpg', 'Metformin is an oral antidiabetic medication used to treat type 2 diabetes.', 'Common side effects include gastrointestinal upset and diarrhea.', 'Monitor kidney function regularly.'),
  (15, 'Insulin Glargine', 'https://example.com/insulin_glargine.jpg', 'Insulin Glargine is a long-acting insulin used to treat diabetes.', 'Common side effects include hypoglycemia and injection site reactions.', 'Regular blood glucose monitoring is essential.'),
  (15, 'Sitagliptin', 'https://example.com/sitagliptin.jpg', 'Sitagliptin is an oral antidiabetic medication used to treat type 2 diabetes.', 'Common side effects include upper respiratory tract infection and headache.', 'Inform your doctor of any signs of pancreatitis.'),
  (15, 'Glyburide', 'https://example.com/glyburide.jpg', 'Glyburide is an oral antidiabetic medication used to treat type 2 diabetes.', 'Common side effects include hypoglycemia and gastrointestinal upset.', 'Avoid alcohol and certain medications that may increase the risk of hypoglycemia.'),
  (15, 'Empagliflozin', 'https://example.com/empagliflozin.jpg', 'Empagliflozin is an oral antidiabetic medication used to treat type 2 diabetes.', 'Common side effects include urinary tract infections and increased urination.', 'Monitor kidney function regularly.');

-- Antiepileptics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (16, 'Levetiracetam', 'https://example.com/levetiracetam.jpg', 'Levetiracetam is an antiepileptic medication used to treat seizures.', 'Common side effects include drowsiness and dizziness.', 'Notify your doctor if you experience mood changes or unusual behavior.'),
  (16, 'Valproic Acid', 'https://example.com/valproic_acid.jpg', 'Valproic Acid is an antiepileptic medication used to treat seizures and bipolar disorder.', 'Common side effects include nausea and hair loss.', 'Regular monitoring of liver function is required.'),
  (16, 'Carbamazepine', 'https://example.com/carbamazepine.jpg', 'Carbamazepine is an antiepileptic medication used to treat seizures and trigeminal neuralgia.', 'Common side effects include dizziness and double vision.', 'Avoid grapefruit and grapefruit juice during treatment.'),
  (16, 'Lamotrigine', 'https://example.com/lamotrigine.jpg', 'Lamotrigine is an antiepileptic medication used to treat seizures and bipolar disorder.', 'Common side effects include headache and rash.', 'Report any signs of rash or severe skin reactions to your doctor.'),
  (16, 'Topiramate', 'https://example.com/topiramate.jpg', 'Topiramate is an antiepileptic medication used to treat seizures and prevent migraine headaches.', 'Common side effects include weight loss and difficulty concentrating.', 'Drink plenty of fluids to prevent kidney stones.');

-- Anti-inflammatory drugs kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (17, 'Ibuprofen', 'https://example.com/ibuprofen.jpg', 'Ibuprofen is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation.', 'Common side effects include stomach upset and heartburn.', 'Take with food or milk to reduce the risk of stomach upset.'),
  (17, 'Naproxen', 'https://example.com/naproxen.jpg', 'Naproxen is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation.', 'Common side effects include stomach upset and drowsiness.', 'Avoid alcohol and smoking during treatment.'),
  (17, 'Celecoxib', 'https://example.com/celecoxib.jpg', 'Celecoxib is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation.', 'Common side effects include headache and dizziness.', 'May increase the risk of cardiovascular events; use with caution in patients with heart disease.'),
  (17, 'Diclofenac', 'https://example.com/diclofenac.jpg', 'Diclofenac is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation.', 'Common side effects include stomach upset and rash.', 'Avoid prolonged exposure to sunlight during treatment.'),
  (17, 'Meloxicam', 'https://example.com/meloxicam.jpg', 'Meloxicam is a nonsteroidal anti-inflammatory drug (NSAID) used to treat pain and inflammation.', 'Common side effects include stomach upset and swelling.', 'Take with food to reduce the risk of stomach upset.');

-- Antimigraine agents kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (18, 'Sumatriptan', 'https://example.com/sumatriptan.jpg', 'Sumatriptan is an antimigraine agent used to treat migraine headaches.', 'Common side effects include chest pain and flushing.', 'Do not use in patients with heart disease or uncontrolled hypertension.'),
  (18, 'Rizatriptan', 'https://example.com/rizatriptan.jpg', 'Rizatriptan is an antimigraine agent used to treat migraine headaches.', 'Common side effects include dizziness and nausea.', 'Do not exceed the recommended dose; may cause serious side effects.'),
  (18, 'Ergotamine', 'https://example.com/ergotamine.jpg', 'Ergotamine is an antimigraine agent used to treat severe migraines.', 'Common side effects include nausea and vomiting.', 'Avoid alcohol and smoking during treatment.'),
  (18, 'Zolmitriptan', 'https://example.com/zolmitriptan.jpg', 'Zolmitriptan is an antimigraine agent used to treat migraine headaches.', 'Common side effects include dizziness and throat discomfort.', 'Do not use in patients with heart disease or uncontrolled hypertension.'),
  (18, 'Propranolol', 'https://example.com/propranolol.jpg', 'Propranolol is a beta-blocker used to prevent migraine headaches.', 'Common side effects include fatigue and dizziness.', 'May mask symptoms of low blood sugar; use with caution in diabetic patients.');

-- Antihypertensives kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (19, 'Enalapril', 'https://example.com/enalapril.jpg', 'Enalapril is an antihypertensive used to treat high blood pressure and heart failure.', 'Common side effects include dizziness and cough.', 'Monitor blood pressure regularly.'),
  (19, 'Amlodipine', 'https://example.com/amlodipine.jpg', 'Amlodipine is an antihypertensive used to treat high blood pressure and chest pain.', 'Common side effects include swelling of the ankles and dizziness.', 'Do not stop taking amlodipine abruptly; consult your doctor.'),
  (19, 'Losartan', 'https://example.com/losartan.jpg', 'Losartan is an angiotensin II receptor blocker (ARB) used to treat high blood pressure and heart failure.', 'Common side effects include back pain and dizziness.', 'Avoid potassium supplements and salt substitutes.'),
  (19, 'Hydralazine', 'https://example.com/hydralazine.jpg', 'Hydralazine is an antihypertensive used to treat high blood pressure.', 'Common side effects include headache and flushing.', 'Regular monitoring of blood pressure is required.'),
  (19, 'Metoprolol', 'https://example.com/metoprolol.jpg', 'Metoprolol is a beta-blocker used to treat high blood pressure and chest pain.', 'Common side effects include fatigue and slow heart rate.', 'Do not stop taking metoprolol abruptly; consult your doctor.');

-- Antispasmodics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (20, 'Dicyclomine', 'https://example.com/dicyclomine.jpg', 'Dicyclomine is an antispasmodic used to treat irritable bowel syndrome (IBS).', 'Common side effects include dry mouth and blurred vision.', 'Avoid alcohol and activities requiring mental alertness.'),
  (20, 'Mebeverine', 'https://example.com/mebeverine.jpg', 'Mebeverine is an antispasmodic used to treat irritable bowel syndrome (IBS).', 'Common side effects include dizziness and constipation.', 'Take 20 minutes before meals.'),
  (20, 'Hyoscyamine', 'https://example.com/hyoscyamine.jpg', 'Hyoscyamine is an antispasmodic used to treat gastrointestinal spasms.', 'Common side effects include dry mouth and blurred vision.', 'Avoid activities requiring mental alertness.'),
  (20, 'Cyclobenzaprine', 'https://example.com/cyclobenzaprine.jpg', 'Cyclobenzaprine is a muscle relaxant and antispasmodic used to treat muscle spasms.', 'Common side effects include drowsiness and dry mouth.', 'Avoid alcohol and other sedatives.'),
  (20, 'Scopolamine', 'https://example.com/scopolamine_antispasmodic.jpg', 'Scopolamine is an antispasmodic used to treat motion sickness and nausea.', 'Common side effects include dry mouth and blurred vision.', 'Apply the patch behind the ear at least 4 hours before needed.');

-- Antinauseants kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (21, 'Ondansetron', 'https://example.com/ondansetron_antinauseant.jpg', 'Ondansetron is an antinauseant used to prevent nausea and vomiting caused by chemotherapy or surgery.', 'Common side effects include headache and constipation.', 'Inform your doctor if you have a history of heart problems.'),
  (21, 'Metoclopramide', 'https://example.com/metoclopramide_antinauseant.jpg', 'Metoclopramide is an antinauseant used to treat nausea and vomiting caused by certain conditions and medications.', 'Common side effects include drowsiness and diarrhea.', 'May cause irreversible tardive dyskinesia; notify your doctor of any unusual movements.'),
  (21, 'Prochlorperazine', 'https://example.com/prochlorperazine_antinauseant.jpg', 'Prochlorperazine is an antinauseant used to treat severe nausea and vomiting.', 'Common side effects include drowsiness and dry mouth.', 'Avoid activities requiring mental alertness while taking prochlorperazine.'),
  (21, 'Dimenhydrinate', 'https://example.com/dimenhydrinate.jpg', 'Dimenhydrinate is an antinauseant used to prevent and treat motion sickness and nausea.', 'Common side effects include drowsiness and dry mouth.', 'Avoid alcohol and other sedatives while taking dimenhydrinate.'),
  (21, 'Ginger', 'https://example.com/ginger.jpg', 'Ginger is a natural antinauseant used to relieve nausea.', 'Common side effects are rare but may include heartburn or mouth irritation.', 'Consult your doctor before using ginger if you are pregnant or taking other medications.');

-- Antiarrhythmics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (22, 'Amiodarone', 'https://example.com/amiodarone.jpg', 'Amiodarone is an antiarrhythmic medication used to treat various types of irregular heartbeats.', 'Common side effects include fatigue and lung problems.', 'Requires regular monitoring of lung and thyroid function.'),
  (22, 'Flecainide', 'https://example.com/flecainide.jpg', 'Flecainide is an antiarrhythmic medication used to treat certain types of abnormal heart rhythms.', 'Common side effects include dizziness and blurred vision.', 'Notify your doctor if you experience chest pain or difficulty breathing.'),
  (22, 'Propafenone', 'https://example.com/propafenone.jpg', 'Propafenone is an antiarrhythmic medication used to treat certain types of irregular heartbeats.', 'Common side effects include nausea and headache.', 'Take with food to reduce stomach upset.'),
  (22, 'Sotalol', 'https://example.com/sotalol.jpg', 'Sotalol is an antiarrhythmic medication used to treat certain types of irregular heartbeats.', 'Common side effects include dizziness and fatigue.', 'Do not stop taking sotalol abruptly; consult your doctor.'),
  (22, 'Dofetilide', 'https://example.com/dofetilide.jpg', 'Dofetilide is an antiarrhythmic medication used to treat atrial fibrillation.', 'Common side effects include chest pain and dizziness.', 'Requires careful monitoring of kidney function.');

-- Antithyroid drugs kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (23, 'Methimazole', 'https://example.com/methimazole.jpg', 'Methimazole is an antithyroid drug used to treat hyperthyroidism.', 'Common side effects include rash and nausea.', 'Regular monitoring of thyroid function is required.'),
  (23, 'Propylthiouracil', 'https://example.com/propylthiouracil.jpg', 'Propylthiouracil is an antithyroid drug used to treat hyperthyroidism.', 'Common side effects include liver problems and joint pain.', 'Notify your doctor of any signs of liver dysfunction.'),
  (23, 'Radioactive Iodine (I-131)', 'https://example.com/radioactive_iodine.jpg', 'Radioactive Iodine is used to treat hyperthyroidism by destroying thyroid cells.', 'Common side effects include neck pain and swelling.', 'May cause hypothyroidism; thyroid function will need to be monitored regularly.'),
  (23, 'Lugol''s Solution', 'https://example.com/lugols_solution.jpg', 'Lugol''s Solution is an iodine solution used to prepare the thyroid gland for surgery or to treat hyperthyroidism.', 'Common side effects include metallic taste and mouth sores.', 'Take with milk or fruit juice to reduce stomach upset.'),
  (23, 'Thyroidectomy', 'https://example.com/thyroidectomy.jpg', 'Thyroidectomy is a surgical procedure to remove part or all of the thyroid gland.', 'Common side effects include difficulty swallowing and voice changes.', 'Requires lifelong thyroid hormone replacement therapy.');

-- Antineoplastics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (24, 'Paclitaxel', 'https://example.com/paclitaxel.jpg', 'Paclitaxel is an antineoplastic agent used to treat various cancers, including breast and ovarian cancer.', 'Common side effects include hair loss and neuropathy.', 'May cause severe allergic reactions; premedication is often required.'),
  (24, 'Cisplatin', 'https://example.com/cisplatin.jpg', 'Cisplatin is an antineoplastic agent used to treat various cancers, including testicular and bladder cancer.', 'Common side effects include kidney damage and hearing loss.', 'Requires careful monitoring of kidney function.'),
  (24, 'Imatinib', 'https://example.com/imatinib.jpg', 'Imatinib is a targeted antineoplastic agent used to treat certain types of leukemia and gastrointestinal stromal tumors.', 'Common side effects include nausea and fatigue.', 'Regular monitoring of blood counts is required.'),
  (24, 'Rituximab', 'https://example.com/rituximab.jpg', 'Rituximab is a monoclonal antibody used to treat certain types of non-Hodgkin lymphoma and rheumatoid arthritis.', 'Common side effects include infusion reactions and increased risk of infections.', 'Patients should be monitored during and after administration.'),
  (24, 'Etoposide', 'https://example.com/etoposide.jpg', 'Etoposide is an antineoplastic agent used to treat various cancers, including lung and testicular cancer.', 'Common side effects include nausea and hair loss.', 'May cause low blood counts; regular monitoring is required.');

-- Immunosuppressants kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (25, 'Cyclosporine', 'https://example.com/cyclosporine.jpg', 'Cyclosporine is an immunosuppressant used to prevent organ rejection in transplant recipients.', 'Common side effects include high blood pressure and kidney problems.', 'Regular monitoring of kidney function is required.'),
  (25, 'Tacrolimus', 'https://example.com/tacrolimus.jpg', 'Tacrolimus is an immunosuppressant used to prevent organ rejection in transplant recipients.', 'Common side effects include tremors and high blood sugar.', 'Avoid grapefruit and grapefruit juice during treatment.'),
  (25, 'Mycophenolate Mofetil', 'https://example.com/mycophenolate_mofetil.jpg', 'Mycophenolate Mofetil is an immunosuppressant used to prevent organ rejection in transplant recipients.', 'Common side effects include nausea and diarrhea.', 'Take on an empty stomach, 1 hour before or 2 hours after meals.'),
  (25, 'Sirolimus', 'https://example.com/sirolimus.jpg', 'Sirolimus is an immunosuppressant used to prevent organ rejection in transplant recipients.', 'Common side effects include high cholesterol and mouth sores.', 'Avoid grapefruit and grapefruit juice during treatment.'),
  (25, 'Azathioprine', 'https://example.com/azathioprine.jpg', 'Azathioprine is an immunosuppressant used to prevent organ rejection in transplant recipients and treat certain autoimmune diseases.', 'Common side effects include nausea and low blood cell counts.', 'Regular monitoring of blood counts is required.');

-- Antifibrinolytics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (26, 'Tranexamic Acid', 'https://example.com/tranexamic_acid.jpg', 'Tranexamic Acid is an antifibrinolytic used to prevent excessive bleeding during surgery or trauma.', 'Common side effects include nausea and headache.', 'Inform your doctor if you have a history of blood clots.'),
  (26, 'Aminocaproic Acid', 'https://example.com/aminocaproic_acid.jpg', 'Aminocaproic Acid is an antifibrinolytic used to treat excessive bleeding.', 'Common side effects include dizziness and muscle pain.', 'Inform your doctor if you have a history of kidney problems.'),
  (26, 'Epsilon-Aminocaproic Acid', 'https://example.com/epsilon_aminocaproic_acid.jpg', 'Epsilon-Aminocaproic Acid is an antifibrinolytic used to treat excessive bleeding.', 'Common side effects include nausea and fatigue.', 'Inform your doctor if you have a history of heart disease.'),
  (26, 'Tranexamic Acid Injection', 'https://example.com/tranexamic_acid_injection.jpg', 'Tranexamic Acid Injection is an antifibrinolytic used to reduce bleeding during surgery.', 'Common side effects include fever and vomiting.', 'Administered by healthcare professionals in a medical setting.'),
  (26, 'Aprotinin', 'https://example.com/aprotinin.jpg', 'Aprotinin is an antifibrinolytic used to reduce bleeding during heart surgery.', 'Common side effects include fever and low blood pressure.', 'Administered by healthcare professionals in a medical setting.');

-- Thyroid hormones kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (27, 'Levothyroxine', 'https://example.com/levothyroxine.jpg', 'Levothyroxine is a thyroid hormone used to treat hypothyroidism.', 'Common side effects include weight loss and insomnia.', 'Take on an empty stomach, at least 30 minutes before breakfast.'),
  (27, 'Liothyronine', 'https://example.com/liothyronine.jpg', 'Liothyronine is a thyroid hormone used to treat hypothyroidism.', 'Common side effects include nervousness and rapid heart rate.', 'Take as directed by your doctor; do not exceed the recommended dose.'),
  (27, 'Desiccated Thyroid Extract', 'https://example.com/desiccated_thyroid_extract.jpg', 'Desiccated Thyroid Extract is a natural thyroid hormone supplement used to treat hypothyroidism.', 'Common side effects include hair loss and weight changes.', 'Take consistently with or without food.'),
  (27, 'Thyroid USP', 'https://example.com/thyroid_usp.jpg', 'Thyroid USP is a natural thyroid hormone supplement used to treat hypothyroidism.', 'Common side effects include sweating and anxiety.', 'Take consistently with or without food.'),
  (27, 'Eltroxin', 'https://example.com/eltroxin.jpg', 'Eltroxin is a thyroid hormone used to treat hypothyroidism.', 'Common side effects include fatigue and weight gain.', 'Take on an empty stomach, at least 30 minutes before breakfast.');


-- Hormonal contraceptives kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (28, 'Combined Oral Contraceptive', 'https://example.com/combined_oral_contraceptive.jpg', 'Combined Oral Contraceptive is a hormonal contraceptive containing both estrogen and progestin.', 'Common side effects include nausea and breast tenderness.', 'Use as directed; missed doses may reduce effectiveness.'),
  (28, 'Progestin-Only Contraceptive', 'https://example.com/progestin_only_contraceptive.jpg', 'Progestin-Only Contraceptive is a hormonal contraceptive containing only progestin.', 'Common side effects include irregular periods and mood changes.', 'Use as directed; missed doses may reduce effectiveness.'),
  (28, 'Contraceptive Patch', 'https://example.com/contraceptive_patch.jpg', 'Contraceptive Patch is a hormonal contraceptive worn on the skin to release hormones.', 'Common side effects include skin irritation and headache.', 'Apply to clean, dry skin; change patch weekly.'),
  (28, 'Contraceptive Implant', 'https://example.com/contraceptive_implant.jpg', 'Contraceptive Implant is a hormonal contraceptive inserted under the skin to release hormones.', 'Common side effects include changes in menstrual bleeding and weight gain.', 'Inserted by a healthcare professional.'),
  (28, 'Depo-Provera', 'https://example.com/depo_provera.jpg', 'Depo-Provera is a hormonal contraceptive injection given every three months.', 'Common side effects include irregular periods and weight gain.', 'Administered by a healthcare professional.');

-- Opioid analgesics kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (29, 'Morphine', 'https://example.com/morphine.jpg', 'Morphine is an opioid analgesic used to treat moderate to severe pain.', 'Common side effects include constipation and drowsiness.', 'May cause respiratory depression; use with caution in patients with respiratory conditions.'),
  (29, 'Oxycodone', 'https://example.com/oxycodone.jpg', 'Oxycodone is an opioid analgesic used to treat moderate to severe pain.', 'Common side effects include nausea and dizziness.', 'May cause drowsiness; avoid alcohol and other sedatives.'),
  (29, 'Hydrocodone', 'https://example.com/hydrocodone.jpg', 'Hydrocodone is an opioid analgesic used to treat moderate to severe pain.', 'Common side effects include constipation and drowsiness.', 'Avoid alcohol and other sedatives during treatment.'),
  (29, 'Codeine', 'https://example.com/codeine.jpg', 'Codeine is an opioid analgesic used to treat mild to moderate pain.', 'Common side effects include nausea and constipation.', 'May cause drowsiness; avoid alcohol and other sedatives.'),
  (29, 'Fentanyl', 'https://example.com/fentanyl.jpg', 'Fentanyl is a potent opioid analgesic used to treat severe pain, often in the form of patches.', 'Common side effects include nausea and drowsiness.', 'Do not use in opioid-naive patients; risk of respiratory depression.');

-- Antiplatelet agents kategorisi için örnek ilaçlar
INSERT INTO drugs (drug_category_id, name, image_url, description, side_effects, warnings)
VALUES
  (30, 'Aspirin', 'https://example.com/aspirin.jpg', 'Aspirin is an antiplatelet agent used to prevent blood clots and reduce the risk of heart attack and stroke.', 'Common side effects include stomach upset and bleeding.', 'Take with food to reduce the risk of stomach upset.'),
  (30, 'Clopidogrel', 'https://example.com/clopidogrel.jpg', 'Clopidogrel is an antiplatelet agent used to prevent blood clots and reduce the risk of heart attack and stroke.', 'Common side effects include bruising and bleeding.', 'Notify your doctor of any signs of bleeding.'),
  (30, 'Ticagrelor', 'https://example.com/ticagrelor.jpg', 'Ticagrelor is an antiplatelet agent used in combination with aspirin to prevent blood clots in patients with certain heart conditions.', 'Common side effects include bleeding and shortness of breath.', 'Take as directed by your doctor.'),
  (30, 'Prasugrel', 'https://example.com/prasugrel.jpg', 'Prasugrel is an antiplatelet agent used to prevent blood clots in patients with certain heart conditions.', 'Common side effects include bleeding and shortness of breath.', 'Take as directed by your doctor.'),
  (30, 'Dipyridamole', 'https://example.com/dipyridamole.jpg', 'Dipyridamole is an antiplatelet agent used in combination with aspirin to prevent blood clots in patients with certain heart conditions.', 'Common side effects include headache and dizziness.', 'Notify your doctor of any signs of bleeding.');
