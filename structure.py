import os

# Ruta de tu proyecto
project_path = r"C:\Users\juand\OneDrive\Escritorio\other\This is me\version2\projects\InvoLuck\InvoLuckFrontend"

# Carpetas a ignorar
ignore_dirs = { "node_modules", ".next", ".swc", "coverage", "playwright-report", "test-results", ".git" }

def list_files(start_path, ignore_dirs):
    for root, dirs, files in os.walk(start_path):
        # Filtrar carpetas a ignorar
        dirs[:] = [d for d in dirs if d not in ignore_dirs]

        # Mostrar la estructura
        level = root.replace(start_path, '').count(os.sep)
        indent = '    ' * level
        print(f"{indent}{os.path.basename(root)}/")
        sub_indent = '    ' * (level + 1)
        for f in files:
            print(f"{sub_indent}{f}")

if __name__ == "__main__":
    list_files(project_path, ignore_dirs)
