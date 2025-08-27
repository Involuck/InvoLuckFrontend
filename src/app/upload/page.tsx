import FileUploader from "@/components/pure/form/FileUploader";

export default function UploadPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-md rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-xl font-bold mb-4">Subir archivo</h1>
        <FileUploader onUpload={(file) => console.log("Archivo subido:", file)} />
      </div>
    </div>
  );
}
