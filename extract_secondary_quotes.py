
import os
import re
import json

# Paths
orchestra_html_path = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/orchestra.html'
personas_dir = '/Users/drlarrydavies/Brain_2.0/00_Orchestra_Personas_ALL'

def get_orchestra_data(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"Read {len(content)} bytes from HTML.")
    
    # improved regex to find names
    # matches name: "..."
    names = re.findall(r'name:\s*"([^"]+)"', content)
    quotes = re.findall(r'quote:\s*\'([^\']+)\'|quote:\s*"([^"]+)"', content)
    
    print(f"Found {len(names)} names.")
    
    members = []
    for i, name in enumerate(names):
        # Quote might be in group 1 or 2 depending on quote style
        if i < len(quotes):
            q_grp = quotes[i]
            current_quote = q_grp[0] if q_grp[0] else q_grp[1]
        else:
            current_quote = ""
            
        members.append({
            'name': name,
            'current_quote': current_quote
        })
    
    return members

def find_persona_file(name, personas_dir):
    # Map special names
    search_name = name
    if "Lave & Wenger" in name:
        search_name = "LAVE"
    elif "Bennett" in name:
        search_name = "BENNETT"
    elif "Wiggins" in name:
        search_name = "WIGGINS"
    elif "McTighe" in name: # Fix McTighe mapping
        search_name = "WIGGINS" # They share a file? "17_WIGGINS_MCTIGHE..."
    elif "Duckworth" in name:
        search_name = "DUCKWORTH"
    else:
        # Last name usually
        parts = name.split()
        if "Jr." in parts:
            search_name = "VONNEGUT"
        else:
            search_name = parts[-1]
        
    for filename in os.listdir(personas_dir):
        if search_name.upper() in filename.upper():
            return os.path.join(personas_dir, filename)
    return None

def extract_quotes_from_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()
    
    # Try to find quotes in the ### 1. ... sections or ## EXCERPTS
    # We'll grab all text in double quotes that is decently long
    
    candidates = []
    
    # 1. Regex for quoted text
    matches = re.findall(r'"([^"]{30,300})"', text)
    candidates.extend(matches)
    
    return candidates

def main():
    members = get_orchestra_data(orchestra_html_path)
    updates = {}
    
    for member in members:
        filepath = find_persona_file(member['name'], personas_dir)
        if not filepath:
            print(f"Use fallback for {member['name']} (File not found)")
            updates[member['name']] = "Education is not preparation for life; education is life itself."
            continue
            
        candidates = extract_quotes_from_markdown(filepath)
        
        # Select best
        selected = None
        current_clean = re.sub(r'<[^>]+>', '', member['current_quote']) # remove spans
        
        for cand in candidates:
            if current_clean[:20] in cand: # rough check if same
                continue
            if "The " in cand and len(cand) < 40: # Skip Headers
                continue
                
            selected = cand
            break
        
        if selected:
            # Clean up newlines
            selected = selected.replace('\n', ' ').strip()
            updates[member['name']] = selected
        else:
            print(f"No new quote for {member['name']}, using fallback")
            updates[member['name']] = "We learn by doing, reflecting, and iterating."

    print("--- JSON START ---")
    print(json.dumps(updates, indent=2))
    print("--- JSON END ---")

if __name__ == "__main__":
    main()
