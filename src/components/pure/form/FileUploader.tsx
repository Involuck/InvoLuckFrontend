import React, { useRef, useState } from "react";

type FileUploaderProps = {
  onUpload?: (file: File) => Promise<void> | void;
};

export default function FileUploader({ onUpload }: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);

    // Si es imagen, generamos preview
    if (selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(selected);
    } else {
      setPreview(null);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setProgress(0);

    // Simulación de subida con progreso
    for (let i = 1; i <= 100; i++) {
      await new Promise((r) => setTimeout(r, 30));
      setProgress(i);
    }

    // Llamada externa
    if (onUpload) {
      await onUpload(file);
    }

    setIsUploading(false);
  };

  return (
    <div className="flex flex-col items-center gap-3 border p-4 rounded-lg shadow-md w-full max-w-sm">
      <input
        type="file"
        ref={inputRef}
        onChange={handleSelectFile}
        className="hidden"
      />

      {!file ? (
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Seleccionar archivo
        </button>
      ) : (
        <div className="flex flex-col items-center gap-2">
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover rounded-md border"
            />
          )}

          <p className="text-sm">{file.name}</p>

          {!isUploading ? (
            <button
              onClick={handleUpload}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Subir
            </button>
          ) : (
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
