
import csv
import json
import requests as rs

document_id = "1i9H25hTawxur82lsrdNuArV3JJuoKlvjq353RaUnuAk"
url = "https://docs.google.com/spreadsheets/d/" + document_id + "/export?format=csv&id=" + document_id + "&gid=0"

res=rs.get(url=url)
open('questions.csv', 'wb').write(res.content)

csvFilePath = r'questions.csv'
jsonFilePath = r'../src/Model/questions.json'
 
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


