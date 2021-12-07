
import csv
import json
 
csvFilePath = r'Küsitud lood - Lood.csv'
jsonFilePath = r'questions.json'
 
output = []
     
with open(csvFilePath, encoding='utf-8') as csvf:
    csvReader = csv.DictReader(csvf)
    
    for row in csvReader:
        
        if row["Esitaja"] == "" and row["Lugu"] == "":
            # Empty row at the end of the document
            continue

        entry = { 
            "key": int(row["Jrk"]), 
            "artist": row["Esitaja"], 
            "song": row["Lugu"], 
            "date": row["Kuupäev"]
        }
        
        output.append(entry)


ordered = sorted(output, key=lambda x: x["key"])

with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
    jsonf.write(json.dumps(ordered, indent=4, ensure_ascii=False))