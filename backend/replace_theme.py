import os
import re

components_dir = r'c:\Users\salma\Downloads\health_data smart\health_data smart\frontend\src\components'

dark_bgs = [
    r'#(?:0a0f1e|0f172a|05080f|0d111a|1a1a1a|111111|000000|0a0d17|05070a|07090f|1E1E1E|1A202C|121212|1e293b|000|111|07090f|0a0d17|140E0C|1A1210|261B19|332421)',
    r'rgba?\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.[1-9]\s*\)',
    r'rgba?\(\s*10\s*,\s*13\s*,\s*23\s*,\s*0\.[1-9]\s*\)',
    r'rgba?\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.0[1-9]\s*\)'
]

dark_bg_pattern = "|".join(dark_bgs)

replacements = [
    (re.compile(rf'background:\s*({dark_bg_pattern})\s*;', re.IGNORECASE), 'background: var(--surface);'),
    (re.compile(rf'background-color:\s*({dark_bg_pattern})\s*;', re.IGNORECASE), 'background-color: var(--surface);'),
    (re.compile(r'background:\s*(?:black|rgba\(0,0,0,0\.\d+\))\s*;', re.IGNORECASE), 'background: var(--surface);'),
    (re.compile(r'background:\s*#0[a-f0-9]{5}\s*;', re.IGNORECASE), 'background: var(--surface);'),
    (re.compile(r'background:\s*#1[a-f0-9]{5}\s*;', re.IGNORECASE), 'background: var(--surface-light);'),
    (re.compile(r'color:\s*(?:white|#ffffff|#fff)\s*;', re.IGNORECASE), 'color: var(--text);'),
    (re.compile(r'color:\s*#(?:94a3b8|cbd5e1|475569|64748b)\s*;', re.IGNORECASE), 'color: var(--text-muted);'),
    # Extra replacement for remaining hardcoded blues/purples that clash with Peach/Green
    (re.compile(r'color:\s*#8b5cf6\s*;', re.IGNORECASE), 'color: var(--primary);'), # Purple to Primary (Peach)
    (re.compile(r'color:\s*#0ea5e9\s*;', re.IGNORECASE), 'color: var(--secondary);'), # Blue to Secondary (Green)
    (re.compile(r'background:\s*#8b5cf6\s*;', re.IGNORECASE), 'background: var(--primary);'),
    (re.compile(r'background:\s*#0ea5e9\s*;', re.IGNORECASE), 'background: var(--secondary);'),
]

files_changed = 0
for filename in os.listdir(components_dir):
    if filename.endswith('.jsx'):
        filepath = os.path.join(components_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        original_content = content
        
        for regex, replacement in replacements:
            content = regex.sub(replacement, content)
                
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            files_changed += 1
            print(f"Updated: {filename}")

print(f'\nReplaced dark styles in {files_changed} files.')
