import os

image_file_types = ("jpg", "png", "jpeg")
video_file_types = ("mp4", "mov")

def write_all_file_paths(root_folder: str, output_file: str = "manifest.txt"):
    with open(output_file, "w", encoding="utf-8") as f:
        for dirpath, dirnames, filenames in os.walk(root_folder):
            dirpath = dirpath.split(root_folder)[1]
            for filename in filenames:
                ext = filename.split(".")[-1]
                if ext not in image_file_types: continue
                path = "/" + os.path.join(dirpath, filename)
                f.write(path + "\n")

if __name__ == "__main__":
    folder_to_scan = "./www/files"
    write_all_file_paths(folder_to_scan)
    print("All file paths written to manifest")