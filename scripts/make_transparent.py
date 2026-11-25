import numpy as np
from PIL import Image, ImageFilter
from collections import deque
import glob
import os

SOURCE_MAP = {
    "avatar-assistant.png": "avatar_assistant_*.jpg",
    "avatar-ai.png": "avatar_ai_*.jpg",
    "avatar-backend.png": "avatar_backend_*.jpg",
    "avatar-ds.png": "avatar_ds_*.jpg",
    "avatar-ml.png": "avatar_ml_*.jpg",
    "avatar-bicycle.png": "avatar_bicycle_*.jpg",
    "cyclist-frame-1.png": "anime_cyclist_1_*.jpg",
    "cyclist-frame-2.png": "anime_cyclist_2_1794714487688.jpg",
    "cyclist-frame-3.png": "anime_cyclist_3_*.jpg",
    "cyclist-frame-4.png": "avatar_bicycle_*.jpg",
}

BRAIN_DIR = r"C:\Users\FR34K\.gemini\antigravity\brain\b67b46a7-2029-457e-8769-b4b31ca4d52c"
OUT_DIR = r"public\images\avatars"

def process_image(src_path, dest_path, tol=28, feather=1.5):
    im = Image.open(src_path).convert("RGBA")
    arr = np.array(im, dtype=np.float32)
    h, w = arr.shape[:2]

    # Calculate distance from pure white (255, 255, 255)
    r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]
    dist = np.maximum(255 - r, np.maximum(255 - g, 255 - b))
    is_white = dist < tol

    # BFS flood fill from all 4 borders
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()

    for x in range(w):
        if is_white[0, x]:
            visited[0, x] = True
            queue.append((0, x))
        if is_white[h-1, x]:
            visited[h-1, x] = True
            queue.append((h-1, x))
    for y in range(h):
        if is_white[y, 0]:
            visited[y, 0] = True
            queue.append((y, 0))
        if is_white[y, w-1]:
            visited[y, w-1] = True
            queue.append((y, w-1))

    while queue:
        cy, cx = queue.popleft()
        for dy, dx in [(-1,0), (1,0), (0,-1), (0,1)]:
            ny, nx = cy + dy, cx + dx
            if 0 <= ny < h and 0 <= nx < w:
                if not visited[ny, nx] and is_white[ny, nx]:
                    visited[ny, nx] = True
                    queue.append((ny, nx))

    # Mask: 255 for character, 0 for background
    mask = (~visited).astype(np.uint8) * 255
    mask_img = Image.fromarray(mask, mode="L")
    
    # Smooth edges with slight blur to eliminate white halo / jagged edges
    mask_smooth = mask_img.filter(ImageFilter.GaussianBlur(radius=feather))
    mask_arr = np.array(mask_smooth, dtype=np.float32) / 255.0

    # Defringe: wherever mask is partially transparent, decontaminate white background color
    # unmultiply against white: C_true = (C_observed - (1 - alpha)*255) / alpha
    alpha = mask_arr
    for c in range(3):
        color = arr[:,:,c]
        # Decontaminate edge pixels
        edge_mask = (alpha > 0.05) & (alpha < 0.98)
        color[edge_mask] = np.clip((color[edge_mask] - (1.0 - alpha[edge_mask]) * 255.0) / np.maximum(alpha[edge_mask], 0.1), 0, 255)
        arr[:,:,c] = color

    arr[:,:,3] = np.clip(alpha * 255.0, 0, 255)
    
    out_img = Image.fromarray(arr.astype(np.uint8), mode="RGBA")
    out_img.save(dest_path, "PNG", optimize=True)
    print(f"Processed: {src_path} -> {dest_path}")

os.makedirs(OUT_DIR, exist_ok=True)

for dest_name, pattern in SOURCE_MAP.items():
    matches = glob.glob(os.path.join(BRAIN_DIR, pattern))
    if not matches:
        print(f"Warning: No match for {pattern}")
        continue
    src = matches[0]
    dest = os.path.join(OUT_DIR, dest_name)
    process_image(src, dest)

print("All transparent avatar PNGs generated successfully!")

