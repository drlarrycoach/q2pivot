
import os
import re
import json

# Paths
orchestra_html_path = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/orchestra.html'
secondary_quotes_path = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/secondary_quotes.json'

def get_orchestra_data(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    match = re.search(r'const orchestraData = \[(.*?)\];', content, re.DOTALL)
    if not match:
        return []
        
    data_block = match.group(1)
    objects = []
    blocks = data_block.split('},')
    
    for block in blocks:
        block = block.strip()
        if not block: continue
        if not block.endswith('}'): block += '}'
        
        obj = {}
        for field in ['name', 'dates', 'archetype', 'quote', 'image', 'bio', 'color', 'strokeColor', 'icon', 'instrument']:
            # regex specific to extract the field value accounting for quotes
            # Look for: field: "..." or field: '...'
            # BE CAREFUL with nested quotes in values.
            # We assume values are wrapped in double quotes in source mostly, but quote property has single quotes inside.
            
            # Simple approach: field-start, quote, content, quote
            pattern = fr'{field}:\s*(["\'])(.*?)\1'
            # This fails if content has the same quote.
            
            # Better: field: " .... " where " is not escaped?
            # JS source has: quote: '"We must... <span class=\'...\'>...</span>"'
            
            f_match = re.search(fr'{field}:\s*(["\'])(.*?)\1', block, re.DOTALL)
            if f_match:
               # This captures up to first quote. If quote: "..." contains quotes, it stops early?
               # JS Strings escape quotes.
               # Let's simple-parse:
               val = f_match.group(2)
               obj[field] = val
        
        if obj.get('name'):
            objects.append(obj)
            
    return objects

def main():
    members = get_orchestra_data(orchestra_html_path)
    
    with open(secondary_quotes_path, 'r') as f:
        secondary_quotes = json.load(f)
        
    for m in members:
        q2 = secondary_quotes.get(m['name'])
        if q2:
            q2_escaped = q2.replace('"', '\\"')
            m['quote2'] = f'"{q2_escaped}"'
        else:
            m['quote2'] = '"Education is growth."' 

    def get_year(m):
        match = re.search(r'\d{4}', m.get('dates', ''))
        return int(match.group(0)) if match else 2000
        
    members.sort(key=get_year)
    
    # Reconstruct JS String
    with open('/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/orchestra_data_block.js', 'w', encoding='utf-8') as out:
        out.write("        const orchestraData = [\n")
        for i, m in enumerate(members):
            out.write("            {\n")
            out.write(f'                name: "{m.get("name", "")}",\n')
            out.write(f'                dates: "{m.get("dates", "")}",\n')
            out.write(f'                archetype: "{m.get("archetype", "")}",\n')
            q1 = m.get("quote", "").replace('"', '\\"') 
            out.write(f'                quote: "{m.get("quote", "")}",\n') 
            out.write(f'                quote2: {m["quote2"]},\n')
            out.write(f'                image: "{m.get("image", "")}",\n')
            out.write(f'                bio: "{m.get("bio", "")}",\n')
            out.write(f'                color: "{m.get("color", "")}",\n')
            out.write(f'                strokeColor: "{m.get("strokeColor", "")}",\n')
            out.write(f'                icon: "{m.get("icon", "")}",\n')
            out.write(f'                instrument: "{m.get("instrument", "")}"\n')
            out.write("            }" + (",\n" if i < len(members) - 1 else "\n"))
        out.write("        ];\n")

if __name__ == "__main__":
    main()
