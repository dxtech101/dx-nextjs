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
    const [error, setError] = useState<any>()

    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        if (uploadType === "video") {
            if (!file.type.startsWith("video/")) {
                setError("File type is not supported")
                return
            }
        } else if (uploadType === "image") {
            if (!file.type.startsWith("image/")) {
                setError("File type is not supported")
                return
            }
        }
        setSelectedPicture(file);
        setPreviewUrl(URL?.createObjectURL(file));
        if (onFileSelect) {
            onFileSelect(file);
            setError("")
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
                className={`flex flex-col items-center justify-center w-full h-72  ${!selectedPicture && `border-2 border-dashed rounded-lg cursor-pointer ${error ? "border-red-300 bg-red-50 hover:bg-red-100" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}`}
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
                            {previewUrl && selectedPicture.type.startsWith("video/") && (
                                <iframe
                                    src={previewUrl}
                                    className="max-h-64 object-cover rounded-lg"
                                    width={600}
                                    height={2000}
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
                        <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${error ? "text-red-500" : "text-gray-500"}`}>
                            <UploadCloudIcon className='w-12 h-12 mb-4 ' />
                            <p className="mb-2 text-sm ">
                                <span className="font-semibold">Click to upload</span>{" "}
                                or drag and drop
                            </p>

                            <p className="text-xs ">
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
            {error &&
                <span className="text-red-500 text-xs font-bold mt-2">
                    {error}
                </span>
            }
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
