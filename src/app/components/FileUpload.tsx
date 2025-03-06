"use client";
import React, {  useState } from "react";
import { IKUpload } from "imagekitio-next";
import {Loader2} from "lucide-react"
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";



interface FileUploadProps{
  onSuccess: (res: IKUploadResponse) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video"
}


export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image" 
} : FileUploadProps) {


  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err :{ message : string}) => {
    console.log("Error", err);
    setError(err.message);
    setUploading(false);
  };
  
  const handleSuccess = (response : IKUploadResponse ) => {
    console.log("Success", response);
    setUploading(false);
    setError(null);
    onSuccess(response);
  };
  
  const handleProgress = (evt : ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };
  
  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };


  const validateFiles = (file : File) => {
    if(!file){
      throw new Error("No file provided");
    }
    if(fileType === "video"){
      if(!file.type.startsWith("video/")){
        // throw new Error("Invalid file type. Please select a video file.");
        setError("Invalid file type. Please select a video file");
        return false;
      }
      if(file.size > 100 * 1024 * 1024){
        setError("Video must be less than 100 MB"); //
        return false;
      }
    }else{
      const validTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp", "image/gif"]  
      if(!validTypes.includes(file.type)){
        setError("Invalid file type. Please select an image file(JPEG/JPG/PNG/WEBP/GIF).");
        return false;
      }
      if(file.size > 5 * 1024 * 1024){
        setError("Image must be less than 5 MB"); //
        return false;
      }
    }
    return false;
  }

  return (
    <div className="App">
      <h1>ImageKit Next.js quick start</h1>

        <p>Upload an image with advanced options</p>
        <IKUpload
          fileName={fileType === 'video' ? 'video' : 'image'}
      
          customCoordinates={"10,10,10,10"}
          useUniqueFileName={true}
          responseFields={["tags"]}
          validateFile={validateFiles}
          folder={fileType ==="video" ? "videos" : "images"}
          onError={onError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleStartUpload}
        />
        {uploading && (
          <div className="flex items-center gap-3 text-sm text-primary">
              <Loader2 size={32} color="#2196F3" className="animate-spin"/>
              <span>Uploading....</span>
          </div>
        )}
        {
          error && <div className="text-sm text-error">{error}</div>  // Display error message if any.
        }
    </div>
  );
}