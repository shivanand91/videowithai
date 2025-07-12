"use client" // This component must be a client component

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import { useRef, useState } from "react";

interface FileUploadProps {
    onSuccess: (res: any) => void
    onProgress?: (progress: number) => void
    fileType?: "image" | "video"
}

const FileUpload = ({
    onSuccess,
    onProgress,
    fileType

}: FileUploadProps) => {

    const [uplaoding, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const validateFile = (file: File) => {
        if (fileType === "video") {
            if (!file.type.startsWith('video/')) {
                setError("Please upload a vaild video file");
            }
        }
        if (file.size > 100 * 1024 * 1024) {
            setError("File size is less than 100MB");
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file) return;

        validateFile(file);
        if (error) return;

        setUploading(true)
        setError(null)

        try {
            const authRes = await fetch("/api/auth/imagekit-auth")
            const auth = await authRes.json()

            const response = await upload({
                file,
                fileName: file.name,
                publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
                signature: auth.signature,
                expire: auth.expire,
                token: auth.token,
                onProgress: (event) => {
                    if (event.lengthComputable && onProgress) {
                        const percent = (event.loaded / event.total) * 100,
                    }
                },


            });

            onSuccess(response);

        } catch (error) {
          setUploading(false)
        } finally {
            setUploading(false)
        }
    }


    return (
        <>
            <input
                type="file"
                accept={fileType === 'video' ? 'video/*' : "image/*"}
                onChange={handleFileChange}
            />
            {uplaoding && <span>Loading...</span>}
        </>
    );
};

export default FileUpload;