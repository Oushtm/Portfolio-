import os
from PIL import Image

logo_path = r"c:\Users\oussama\Downloads\New folder\Personal-portfolio-main\client\src\assets\profile\logo.png"
public_dir = r"c:\Users\oussama\Downloads\New folder\Personal-portfolio-main\client\public"

# Open the logo image
img = Image.open(logo_path)

# Ensure image is RGBA (since it's PNG and might have transparency)
if img.mode != "RGBA":
    img = img.convert("RGBA")

# Convert to PNG sizes
img.resize((16, 16), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "favicon-16x16.png"), "PNG")
img.resize((32, 32), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "favicon-32x32.png"), "PNG")
img.resize((192, 192), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "favicon-192.png"), "PNG")
img.resize((512, 512), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "favicon-512.png"), "PNG")
img.resize((180, 180), Image.Resampling.LANCZOS).save(os.path.join(public_dir, "apple-touch-icon.png"), "PNG")

# Convert to ICO
img_ico = img.resize((32, 32), Image.Resampling.LANCZOS)
img_ico.save(os.path.join(public_dir, "favicon.ico"), format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

# Create a nice OG Image (dark background matching the site theme, with logo in center)
og_img = Image.new("RGBA", (1200, 630), (3, 3, 8, 255))
logo_resized = img.resize((400, 400), Image.Resampling.LANCZOS)
# Paste logo in center using the alpha channel of logo_resized as mask
offset = ((1200 - 400) // 2, (630 - 400) // 2)
og_img.paste(logo_resized, offset, mask=logo_resized)
og_img.convert("RGB").save(os.path.join(public_dir, "og-image.png"), "PNG")

print("All favicons and OG images converted successfully from PNG!")
