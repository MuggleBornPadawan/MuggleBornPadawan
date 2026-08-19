import csv

input_file = '/home/rgroot/MuggleBornPadawan/dummy/dummy/lenny100_companies.csv'

category_map = {
    "Artificial Intelligence (Frontier Labs": "Artificial Intelligence (Frontier Labs, Infrastructure & Tooling)",
    "Developer Tools": "Developer Tools, Data & Infrastructure",
    "Robotics": "Robotics, Aerospace & Defense",
    "Consumer": "Consumer, Collaboration & Marketplaces",
}

rows = []
with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    header = next(reader)
    for row in reader:
        cat = row[1]
        if cat in category_map:
            row[1] = category_map[cat]
        rows.append(row)

with open(input_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(header)
    for row in rows:
        writer.writerow(row)

print("Fixed categories.")
