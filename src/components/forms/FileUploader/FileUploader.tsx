"use client";

import { useState } from "react";

type Props = {
  onFileSelect?: (file: File | null) => void;
};

export default function FileUploader({ onFileSelect }: Props) {
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file ? file.name : "");
    if (onFileSelect) onFileSelect(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {fileName && <p className="text-sm text-gray-600 mt-1">Selected: {fileName}</p>}
    </div>
  );
}
