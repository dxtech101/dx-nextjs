import { UploadCloudIcon, X } from 'lucide-react';
import { useState } from 'react';

const FileUpload = ({
    uploadType,
    loading,
    handleUpload,
    submitButtonLabel,
    submitButton = false,
    onFileSelect
}: any) => {
    const [selectedPicture, setSelectedPicture] = useState<any>(null);
    const [previewUrl, setPreviewUrl] = useState<any>(null);

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setSelectedPicture(file);
        setPreviewUrl(URL?.createObjectURL(file));
        if (onFileSelect) {
            onFileSelect(file);
        }
    };

    const removeSelectedPicture = () => {
        setSelectedPicture(null);
        setPreviewUrl(null);
        if (onFileSelect) {
            onFileSelect(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-72  ${!selectedPicture && "border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"}`}
            >
                {selectedPicture ?
                    <>
                        <div className="relative text-center">
                            {previewUrl && selectedPicture.type.startsWith("image/") && (
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-h-64 rounded-lg"
                                />
                            )}
                            <button
                                onClick={removeSelectedPicture}
                                className="absolute top-2 right-2 bg-gray-900 text-white rounded-full p-1"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                    </> : <>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloudIcon className='w-12 h-12 mb-4 text-gray-500 ' />
                            <p className="mb-2 text-sm text-gray-500 ">
                                <span className="font-semibold">Click to upload</span>{" "}
                                or drag and drop
                            </p>

                            <p className="text-xs text-gray-500 ">
                                {uploadType === "video" ?
                                    "MP4, MOV, AVI, WEBM, M4V, OGV, MKV (MAX. 800x400px)" :
                                    uploadType === "image" ?
                                        "PNG, JPG (MAX. 800x400px)" :
                                        "SVG, PNG, JPG or GIF (MAX. 800x400px)"}
                            </p>
                        </div>
                    </>}
                <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
            {submitButton && (
                <button
                    disabled={!selectedPicture || loading}
                    onClick={handleUpload}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                    {loading ? "Loading..." : `${submitButtonLabel || "Upload"}`}
                </button>
            )}

        </div>
    )
}

export default FileUpload
