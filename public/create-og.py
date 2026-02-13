#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Создаем изображение 1200x630
width, height = 1200, 630
image = Image.new('RGB', (width, height), color='#000000')
draw = ImageDraw.Draw(image)

# Градиент фон
for y in range(height):
    # От черного к темно-серому
    r = int(0 + (30 * y / height))
    g = int(0 + (41 * y / height)) 
    b = int(0 + (59 * y / height))
    draw.rectangle([(0, y), (width, y+1)], fill=(r, g, b))

# Декоративные круги
draw.ellipse([20, 20, 180, 180], fill=(220, 38, 38, 25))  # Красный круг с прозрачностью
draw.ellipse([1020, 450, 1180, 610], fill=(239, 68, 68, 25))  # Красный круг

# Текст Selen.IT
try:
    # Попробуем использовать системный шрифт
    font_large = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 72)
    font_medium = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 48)
    font_small = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 24)
except:
    # Если системный шрифт недоступен, используем стандартный
    font_large = ImageFont.load_default()
    font_medium = ImageFont.load_default()
    font_small = ImageFont.load_default()

# Логотип
draw.text((100, 150), "Selen", fill=(255, 255, 255), font=font_large)
draw.text((340, 150), ".IT", fill=(220, 38, 38), font=font_large)

# Подчеркивание
draw.rectangle([100, 230, 440, 235], fill=(220, 38, 38))

# Заголовок
draw.text((100, 280), "Digital Agency", fill=(255, 255, 255), font=font_medium)

# Подзаголовок
draw.text((100, 350), "Web Development • UI/UX Design • Branding", fill=(148, 163, 184), font=font_small)

# URL
draw.text((100, 400), "selenit-digital-agency.vercel.app", fill=(100, 116, 139), font=font_small)

# Сохраняем
image.save('og-final.png', 'PNG')
print("OG изображение создано: og-final.png")
