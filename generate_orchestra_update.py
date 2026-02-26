
import os
import re
import json

# Paths
orchestra_html_path = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/orchestra.html'
secondary_quotes_path = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/secondary_quotes.json'
output_path = '/Users/drlarrydavies/Brain_2.0/04_Integration/Q2Pivot_site/q2pivot/update_payload.json'

def get_orchestra_data(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the block between "const orchestraData = [" and "];"
    # This matches the specific formatting in the file
    match = re.search(r'const orchestraData = \[(.*?)\];', content, re.DOTALL)
    if not match:
        return []
        
    data_block = match.group(1)
    
    # We need to parse this JS object-like string into Python dicts
    # This is tricky without a full parser, but formatting is consistent
    # { ... }, { ... }
    
    # Split by closing brace + comma
    # This is naive but works if formatting is consistent
    objects = []
    # Remove leading whitespace
    blocks = data_block.split('},')
    
    for block in blocks:
        block = block.strip()
        if not block: continue
        if not block.endswith('}'): block += '}'
        
        # Extract fields
        obj = {}
        for field in ['name', 'dates', 'archetype', 'quote', 'image', 'bio', 'color', 'strokeColor', 'icon', 'instrument']:
            # regex for key: "value" or key: 'value'
            # field: "..."
            f_match = re.search(fr'{field}:\s*(["\'])(.*?)\1', block, re.DOTALL)
            if f_match:
                obj[field] = f_match.group(2)
        
        if obj.get('name'):
            objects.append(obj)
            
    return objects

def main():
    members = get_orchestra_data(orchestra_html_path)
    
    with open(secondary_quotes_path, 'r') as f:
        secondary_quotes = json.load(f)
        
    # Update members
    for m in members:
        # Add quote2
        q2 = secondary_quotes.get(m['name'])
        if q2:
            # Escape double quotes for JS
            q2_escaped = q2.replace('"', '\\"')
            m['quote2'] = f'"{q2_escaped}"'
        else:
            m['quote2'] = '"Education is growth."' # Fallback
            
    # Sort by date
    def get_year(m):
        # Extract first 4 digit number
        match = re.search(r'\d{4}', m.get('dates', ''))
        return int(match.group(0)) if match else 2000
        
    members.sort(key=get_year)
    
    # Reconstruct JS String for orchestraData
    js_data = "const orchestraData = [\n"
    for i, m in enumerate(members):
        js_data += "            {\n"
        js_data += f'                name: "{m["name"]}",\n'
        js_data += f'                dates: "{m["dates"]}",\n'
        js_data += f'                archetype: "{m["archetype"]}",\n'
        # Quote 1 is usually already escaped/formatted in source, but we extracted the raw content group
        # We need to be careful. The regex grabbed the inner content.
        # We should use the original quote string if possible to preserve spans, 
        # BUT we extracted only the value.
        # Let's trust the value extraction and re-wrap.
        # Note: The extraction regex in get_orchestra_data was looking for quotes.
        # The value might contain <span class='...'> which uses single quotes.
        # So wrapping in double quotes is safer, provided we escape double quotes inside.
        q1 = m["quote"].replace('"', '\\"') # escape internal double quotes
        js_data += f'                quote: "{q1}",\n'
        js_data += f'                quote2: {m["quote2"]},\n' # quote2 already quoted/escaped above
        js_data += f'                image: "{m["image"]}",\n'
        js_data += f'                bio: "{m["bio"]}",\n'
        js_data += f'                color: "{m["color"]}",\n'
        js_data += f'                strokeColor: "{m["strokeColor"]}",\n'
        js_data += f'                icon: "{m["icon"]}",\n'
        js_data += f'                instrument: "{m["instrument"]}"\n'
        js_data += "            }"
        if i < len(members) - 1:
            js_data += ",\n"
        else:
            js_data += "\n"
    js_data += "        ];"
    
    # Rotating Quotes Component Replacement
    rotating_quotes_js = """        // Rotating Quotes Component
        function RotatingQuotes() {
            // Aggregate all quotes (primary and secondary)
            const allQuotes = useMemo(() => {
                const q = [];
                orchestraData.forEach(m => {
                    if (m.quote) q.push({ text: m.quote, author: m.name, instrument: m.instrument });
                    if (m.quote2) q.push({ text: m.quote2, author: m.name, instrument: m.instrument });
                });
                // Fisher-Yates Shuffle
                for (let i = q.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [q[i], q[j]] = [q[j], q[i]];
                }
                return q;
            }, []);

            const [index, setIndex] = useState(0);
            const [currentQuote, setCurrentQuote] = useState(allQuotes[0]);

            useEffect(() => {
                const interval = setInterval(() => {
                    setIndex((prev) => {
                        let next = (prev + 1) % allQuotes.length;
                        // Build-in retry to avoid same author back-to-back
                        if (allQuotes[next].author === allQuotes[prev].author) {
                             next = (next + 1) % allQuotes.length;
                        }
                        return next;
                    });
                }, 10000); // 10 seconds per quote
                
                return () => clearInterval(interval);
            }, [allQuotes]);

            useEffect(() => {
                setCurrentQuote(allQuotes[index]);
            }, [index, allQuotes]);

            return (
                <div 
                    className="px-8 mx-auto my-12 text-center relative h-48 flex items-center justify-center border-b border-white/5 pb-8"
                    style={{ width: '100%', maxWidth: '1600px' }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex flex-col items-center justify-center px-4"
                        >
                            <p
                                className="text-xl md:text-2xl font-serif text-gray-200 mb-6 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: currentQuote.text }}
                            />
                            <div className="flex items-center gap-2 text-sm text-gray-400 font-mono tracking-wide">
                                <span className="text-q2-cyan font-bold uppercase">{currentQuote.author}</span>
                                <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
                                <span className="text-q2-gold border border-q2-gold/30 px-2 py-0.5 rounded-full text-xs bg-q2-gold/5">
                                    {currentQuote.instrument}
                                </span>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            );
        }"""

    # Output
    payload = {
        'orchestraData_block': js_data,
        'rotatingQuotes_block': rotating_quotes_js
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(payload, f, indent=2)

if __name__ == "__main__":
    main()
