import os

def write_all_file_paths(root_folder: str, output_file: str = "manifest.txt"):
    with open(output_file, "w", encoding="utf-8") as f:
        for dirpath, dirnames, filenames in os.walk(root_folder):
            for filename in filenames:
                abs_path = os.path.abspath(os.path.join(dirpath, filename))
                f.write(abs_path + "\n")

# Example usage
if __name__ == "__main__":
    folder_to_scan = "./www/files"
    write_all_file_paths(folder_to_scan)
    print("All file paths written to file_paths.txt")