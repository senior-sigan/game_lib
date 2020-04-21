import sys
from PIL import Image
import numpy as np


def print_img(img_path):
	img = Image.open(img_path)
	b = img.tobytes()
	b = str(b)[1:]
	width, height = img.size

	print(f"loadSprite(Uint8Array.allocPlain({b}), {width}, {height});")

for p in sys.argv[1:]:
	print_img(p)