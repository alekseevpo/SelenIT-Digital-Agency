from PIL import Image
import sys

def get_gradient_colors(image_path):
    try:
        img = Image.open(image_path)
        width, height = img.size
        print(f"Image Dimensions: {width}x{height}")
        
        # Sample from the horizontal center line
        y = height // 2
        
        # Sample at 20%, 50%, and 80% width
        x_left = int(width * 0.2)
        x_center = int(width * 0.5)
        x_right = int(width * 0.8)
        
        c_left = img.getpixel((x_left, y))
        c_center = img.getpixel((x_center, y))
        c_right = img.getpixel((x_right, y))
        
        def rgb_to_hex(rgb):
            # Check if rgb has 4 values (RGBA)
            if len(rgb) == 4:
                return '#{:02x}{:02x}{:02x} (Alpha: {})'.format(rgb[0], rgb[1], rgb[2], rgb[3])
            return '#{:02x}{:02x}{:02x}'.format(rgb[0], rgb[1], rgb[2])
            
        print(f"Color at 20%: {rgb_to_hex(c_left)}")
        print(f"Color at 50%: {rgb_to_hex(c_center)}")
        print(f"Color at 80%: {rgb_to_hex(c_right)}")
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        get_gradient_colors(sys.argv[1])
    else:
        print("Please provide an image path.")
