
import re
import json
import os

html_path = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/orchestra.html'
json_path = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/secondary_quotes.json'

def main():
    # Read HTML
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Read Secondary Quotes
    with open(json_path, 'r', encoding='utf-8') as f:
        secondary_quotes = json.load(f)

    # Extract Data Block
    start_marker = 'const orchestraData = ['
    end_marker = '];'
    
    start_idx = content.find(start_marker)
    valid_end_idx = content.find(end_marker, start_idx) 
    
    # We need to be careful finding the RIGHT '];'. 
    # orchestraData ends before 'const orchestraSections'.
    sections_marker = 'const orchestraSections = ['
    sections_idx = content.find(sections_marker)
    
    # Find the last '];' before sections_idx
    # actually, regex is safer for the block
    
    pattern = re.compile(r'const orchestraData = \[(.*?)\];', re.DOTALL)
    match = pattern.search(content)
    if not match:
        print("Could not find orchestraData block")
        return

    data_block = match.group(1)
    
    # Parse Objects
    objects = []
    # Split by },
    raw_objs = data_block.split('},')
    
    for raw in raw_objs:
        raw = raw.strip()
        if not raw: continue
        if not raw.endswith('}'): raw += '}'
        
        obj = {}
        for field in ['name', 'dates', 'archetype', 'quote', 'image', 'bio', 'color', 'strokeColor', 'icon', 'instrument']:
             # Extract values. Handle simple string assignment
             # Allow for single or double quotes
             # Look for field: "..."
             f_pat = re.compile(fr'{field}:\s*(["\'])(.*?)\1', re.DOTALL)
             f_m = f_pat.search(raw)
             if f_m:
                 obj[field] = f_m.group(2)
        
        if 'name' in obj:
            objects.append(obj)

    # Update Data
    for m in objects:
        name = m.get('name')
        
        # Add Quote 2
        q2 = secondary_quotes.get(name)
        if q2:
            m['quote2'] = q2
        else:
            m['quote2'] = "Education is growth." # Fallback

        # Fix Lave & Wenger Image
        if "Lave & Wenger" in name:
            m['image'] = "assets/images/lave_wenger_connectors_v2_1770625822835.png"

        # Fix Senge Color
        if "Peter Senge" in name:
            m['color'] = "text-emerald-400"
            m['strokeColor'] = "#34d399"

        # Fix Hall Image
        if "Edward T. Hall" in name:
            # Using the generated image path directly as absolute path for now or copy it?
            # Let's use the absolute path since the CP failed.
            m['image'] = "file:///Users/drlarrydavies/.gemini/antigravity/brain/3af15677-f337-42fe-b349-3dfa637c1680/hall_context_decoder_older_1770628328427.png"

    # Sort by Birth Year
    def get_year(m):
        d = m.get('dates', '')
        y_match = re.search(r'\d{4}', d)
        return int(y_match.group(0)) if y_match else 2000
    
    objects.sort(key=get_year)

    # Reconstruct Block
    new_block = "\n"
    for i, m in enumerate(objects):
        new_block += "            {\n"
        new_block += f'                name: "{m.get("name", "")}",\n'
        new_block += f'                dates: "{m.get("dates", "")}",\n'
        new_block += f'                archetype: "{m.get("archetype", "")}",\n'
        new_block += f'                quote: "{m.get("quote", "")}",\n'
        # quote2 formatted as string
        q2_esc = m['quote2'].replace('"', '\\"')
        new_block += f'                quote2: "{q2_esc}",\n'
        new_block += f'                image: "{m.get("image", "")}",\n'
        new_block += f'                bio: "{m.get("bio", "")}",\n'
        new_block += f'                color: "{m.get("color", "")}",\n'
        new_block += f'                strokeColor: "{m.get("strokeColor", "")}",\n'
        new_block += f'                icon: "{m.get("icon", "")}",\n'
        new_block += f'                instrument: "{m.get("instrument", "")}"\n'
        new_block += "            }"
        if i < len(objects) - 1:
            new_block += ",\n"
        else:
            new_block += "\n"
    
    # Replace in Content
    # match.start(1) is start of data inside []
    # match.end(1) is end of data inside []
    
    # We want: content[:match.start(1)] + new_block + content[match.end(1):]
    
    new_content = content[:match.start(1)] + new_block + "        " + content[match.end(1):]

    # Write Back
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print("Successfully updated orchestra.html")

if __name__ == "__main__":
    main()
