import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH, HEIGHT = 1200, 630

# 1. Create base background (rich deep slate/charcoal)
img = Image.new('RGBA', (WIDTH, HEIGHT), (13, 17, 23, 255))
draw = ImageDraw.Draw(img)

# 2. Add subtle gradient glow behind the logo on the left
glow = Image.new('RGBA', (WIDTH, HEIGHT), (0, 0, 0, 0))
glow_draw = ImageDraw.Draw(glow)
# Red ambient glow
glow_draw.ellipse([60, 100, 480, 520], fill=(225, 29, 72, 35))
glow = glow.filter(ImageFilter.GaussianBlur(50))
img = Image.alpha_composite(img, glow)
draw = ImageDraw.Draw(img)

# 3. Decorative subtle grid / frame border
draw.rectangle([16, 16, WIDTH - 16, HEIGHT - 16], outline=(38, 45, 58, 255), width=2)
# Top-left accent pill line
draw.rectangle([16, 16, 120, 20], fill=(225, 29, 72, 255))

# 4. Paste official 5STARAUTO logo on the left
if os.path.exists('public/logo-5star.png'):
    logo = Image.open('public/logo-5star.png').convert('RGBA')
    logo.thumbnail((360, 320), Image.Resampling.LANCZOS)
    logo_x = 75
    logo_y = (HEIGHT - logo.height) // 2 - 25
    img.paste(logo, (logo_x, logo_y), logo)

# 5. Paste Orly Motoryzacji medal badge below or next to logo
if os.path.exists('public/orly-motoryzacji.png'):
    orly = Image.open('public/orly-motoryzacji.png').convert('RGBA')
    orly.thumbnail((80, 80), Image.Resampling.LANCZOS)
    img.paste(orly, (370, 480), orly)

# Load Windows fonts
font_dir = 'C:/Windows/Fonts'
f_heavy = ImageFont.truetype(os.path.join(font_dir, 'segoeuib.ttf'), 54)
f_h2 = ImageFont.truetype(os.path.join(font_dir, 'segoeuib.ttf'), 26)
f_body = ImageFont.truetype(os.path.join(font_dir, 'segoeui.ttf'), 21)
f_bold = ImageFont.truetype(os.path.join(font_dir, 'segoeuib.ttf'), 21)
f_badge = ImageFont.truetype(os.path.join(font_dir, 'segoeuib.ttf'), 16)
f_small = ImageFont.truetype(os.path.join(font_dir, 'segoeui.ttf'), 17)

# Right column content starts at x = 480
start_x = 490

# Badge: OFICJALNY WARSZTAT SAMOCHODOWY POZNAŃ
badge_text = "WARSZTAT SAMOCHODOWY • POZNAŃ GRUNWALD"
draw.rounded_rectangle([start_x, 65, start_x + 440, 98], radius=8, fill=(225, 29, 72, 30), outline=(225, 29, 72, 120), width=1)
draw.text((start_x + 18, 72), badge_text, font=f_badge, fill=(255, 90, 120, 255))

# Main Brand Title
draw.text((start_x, 115), "5STARAUTO.PL", font=f_heavy, fill=(255, 255, 255, 255))

# Subtitle
draw.text((start_x, 185), "Kompleksowa mechanika i serwis samochodowy", font=f_h2, fill=(203, 213, 225, 255))

# Divider line
draw.line([(start_x, 230), (WIDTH - 80, 230)], fill=(45, 55, 72, 255), width=2)

# Information Badges
boxes = [
    ("4.9 / 5.0 Google Maps", "Ponad 250 zweryfikowanych opinii kierowcow", (245, 158, 11)),
    ("ul. Kazimierza Jarochowskiego 105", "60-129 Poznan (Grunwald / Lazarz)", (225, 29, 72)),
    ("Tel: +48 512 145 314", "Dostepny rowniez WhatsApp oraz Telegram", (34, 197, 94)),
    ("Poniedzialek - Piatek: 09:00 - 19:00", "Sobota - Niedziela: nieczynne", (148, 163, 184)),
]

y_pos = 250
for title, subtitle, color in boxes:
    # Small accent dot / bar
    draw.rounded_rectangle([start_x, y_pos + 4, start_x + 6, y_pos + 36], radius=3, fill=color)
    draw.text((start_x + 20, y_pos), title, font=f_bold, fill=(255, 255, 255, 255))
    draw.text((start_x + 20, y_pos + 26), subtitle, font=f_small, fill=(148, 163, 184, 255))
    y_pos += 62

# Bottom Service Tag Bar
draw.rounded_rectangle([start_x, 505, WIDTH - 80, 560], radius=12, fill=(22, 27, 34, 255), outline=(48, 54, 61, 255), width=1)
draw.text((start_x + 22, 520), "Diagnostyka • Klimatyzacja • Wymiana Opon • Rozrzady • Hamulce • Zawieszenie", font=f_bold, fill=(241, 245, 249, 255))

# Save outputs
os.makedirs('public/images', exist_ok=True)
rgb_img = img.convert('RGB')

img.save('src/app/opengraph-image.png', 'PNG')
img.save('public/opengraph-image.png', 'PNG')
img.save('public/images/og-image.png', 'PNG')
rgb_img.save('public/images/og-image.jpg', 'JPEG', quality=95)

print("OpenGraph images successfully generated at 1200x630!")
