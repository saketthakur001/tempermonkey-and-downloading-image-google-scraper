import os
from PIL import Image

def create_directories(base_path):
    portrait_dir = os.path.join(base_path, 'portrait')
    landscape_dir = os.path.join(base_path, 'landscape')

    os.makedirs(portrait_dir, exist_ok=True)
    os.makedirs(landscape_dir, exist_ok=True)

    return portrait_dir, landscape_dir

def move_images_by_resolution(base_path):
    portrait_dir, landscape_dir = create_directories(base_path)

    # Traverse through all the subdirectories
    for root, _, files in os.walk(base_path):
        for file in files:
            if file.endswith(('.jpg', '.jpeg', '.png')):
                file_path = os.path.join(root, file)
                
                # Open the image and get its size
                with Image.open(file_path) as img:
                    width, height = img.size

                    # Determine the directory to move the file to
                    if height > width:
                        target_dir = portrait_dir
                    elif width > height:
                        target_dir = landscape_dir
                    else:
                        continue  # Skip images with equal width and height (e.g., square)

                    # Move the file
                    target_path = os.path.join(target_dir, file)
                    os.rename(file_path, target_path)
                    print(f"Moved {file} to {target_dir}")

# Path to the base directory containing artist folders
base_path = '/home/saket/downloads/artists'
move_images_by_resolution(base_path)
