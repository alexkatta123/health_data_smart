import os
import re

components_dir = r'c:\Users\salma\Downloads\health_data smart\health_data smart\frontend\src\components'

replacements = [
    (re.compile(r'#FF8B71', re.IGNORECASE), 'var(--primary)'),
    (re.compile(r'#E86D52', re.IGNORECASE), 'var(--primary-dark)'),
    (re.compile(r'#FFD5C2', re.IGNORECASE), 'var(--accent)'),
    (re.compile(r'#FFB09C', re.IGNORECASE), 'var(--accent-glow)'),
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

print(f'\nReplaced Peach styles in {files_changed} files.')
