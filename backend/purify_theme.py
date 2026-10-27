import os
import re

components_dir = r'c:\Users\salma\Downloads\health_data smart\health_data smart\frontend\src\components'

# Patterns to replace for "White and Green" theme
replacements = [
    # Backgrounds - remove dark/blackish backgrounds
    (re.compile(r'background:\s*[\'"]#000[\'"]', re.IGNORECASE), 'background: "var(--background)"'),
    (re.compile(r'background:\s*[\'"]#111[\'"]', re.IGNORECASE), 'background: "var(--surface)"'),
    (re.compile(r'background:\s*[\'"]rgba\(0,\s*0,\s*0,\s*0\.\d+\)[\'"]', re.IGNORECASE), 'background: "var(--surface-light)"'),
    (re.compile(r'background:\s*[\'"]rgba\(15,\s*23,\s*42,\s*0\.\d+\)[\'"]', re.IGNORECASE), 'background: "var(--primary-glow)"'),
    
    # Text colors - replace indigo/light blue text from dark mode with slate/emerald
    (re.compile(r'color:\s*[\'"]#a5b4fc[\'"]', re.IGNORECASE), 'color: "var(--text-muted)"'),
    (re.compile(r'color:\s*[\'"]#fff[\'"]', re.IGNORECASE), 'color: "var(--text)"'),
    (re.compile(r'color:\s*[\'"]white[\'"]', re.IGNORECASE), 'color: "var(--text)"'),
    
    # Border colors
    (re.compile(r'border:\s*[\'"]1px\s+solid\s+rgba\(255,255,255,0.1\)[\'"]', re.IGNORECASE), 'border: "1px solid var(--border)"'),
    
    # Responsive fixes - change fixed grid repeats to auto-fit
    (re.compile(r'gridTemplateColumns:\s*[\'"]repeat\(4,\s*1fr\)[\'"]', re.IGNORECASE), 'gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"'),
    (re.compile(r'gridTemplateColumns:\s*[\'"]repeat\(3,\s*1fr\)[\'"]', re.IGNORECASE), 'gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))"'),
    (re.compile(r'gridTemplateColumns:\s*[\'"]1\.5fr\s+1fr[\'"]', re.IGNORECASE), 'gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"'),
]

files_changed = 0
for filename in os.listdir(components_dir):
    if filename.endswith('.jsx'):
        filepath = os.path.join(components_dir, filename)
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            original_content = content
            
            for regex, replacement in replacements:
                content = regex.sub(replacement, content)
                
            # Extra sweep for style tags inside JSX
            if '<style>' in content:
                # Remove dark mode references in CSS blocks
                content = content.replace('background: #022C22', 'background: var(--background)')
                content = content.replace('background: #064E3B', 'background: var(--surface)')
                content = content.replace('color: #A7F3D0', 'color: var(--text-muted)')
                content = content.replace('color: #f8fafc', 'color: var(--text)')
                content = content.replace('color: white', 'color: var(--text)')
                content = content.replace('background: black', 'background: var(--background)')
                content = content.replace('background: #000', 'background: var(--background)')

            if content != original_content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(content)
                files_changed += 1
                print(f"Purified: {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print(f'\nPurified theme and improved responsiveness in {files_changed} files.')
