import os

def listar_estructura(ruta, nivel=0, archivo=None):
    try:
        items = sorted(os.listdir(ruta), key=lambda x: (not os.path.isdir(os.path.join(ruta, x)), x.lower()))
    except PermissionError:
        return
    
    for item in items:
        espacio = "    " * nivel + "|-- "
        linea = f"{espacio}{item}"
        print(linea)
        if archivo:
            archivo.write(linea + "\n")
        path_completo = os.path.join(ruta, item)
        if os.path.isdir(path_completo):
            listar_estructura(path_completo, nivel + 1, archivo)

if __name__ == "__main__":
    ruta_proyecto = r"C:\Users\juand\OneDrive\Escritorio\projects\InvoLuck\InvoLuckFrontend"
    print(f"Estructura de: {ruta_proyecto}\n")

    # Guardar también en archivo
    with open(os.path.join(ruta_proyecto, "estructura.txt"), "w", encoding="utf-8") as f:
        f.write(f"Estructura de: {ruta_proyecto}\n\n")
        listar_estructura(ruta_proyecto, archivo=f)

    print("\n✅ Estructura guardada en 'estructura.txt'")
