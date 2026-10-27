import os
import glob

components_dir = r"c:\Users\salma\Downloads\health_data smart\health_data smart\frontend\src\components"
files = glob.glob(os.path.join(components_dir, "*.jsx"))

count = 0
for file_path in files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'primary-btn' in content:
        new_content = content.replace('primary-btn', 'h-btn h-btn-primary')
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1
        
print(f"Updated {count} files.")
