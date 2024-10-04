import os
from PIL import Image

# Define the source and target directories
source_dir = '/home/saket/downloads/artists_paintings'
portrait_dir = '/home/saket/downloads/portrait'
landscape_dir = '/home/saket/downloads/landscape'

# Create target directories if they don't exist
os.makedirs(portrait_dir, exist_ok=True)
os.makedirs(landscape_dir, exist_ok=True)

# Loop through artists' folders
for artist in os.listdir(source_dir):
    artist_dir = os.path.join(source_dir, artist)
    if os.path.isdir(artist_dir):
        # Create artist subdirectories in portrait and landscape folders
        artist_portrait_dir = os.path.join(portrait_dir, artist)
        artist_landscape_dir = os.path.join(landscape_dir, artist)
        os.makedirs(artist_portrait_dir, exist_ok=True)
        os.makedirs(artist_landscape_dir, exist_ok=True)
        
        for img_name in os.listdir(artist_dir):
            img_path = os.path.join(artist_dir, img_name)
            try:
                with Image.open(img_path) as img:
                    width, height = img.size
                    new_name = f"{artist}.{img_name.split('.')[0]}.jpg"
                    
                    if width > height:
                        target_dir = artist_landscape_dir
                    else:
                        target_dir = artist_portrait_dir
                    
                    img.save(os.path.join(target_dir, new_name))
            except Exception as e:
                print(f"Error processing {img_name}: {e}")
