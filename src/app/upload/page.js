"use client";

import { useState } from "react";
import { Upload, FileCheck, AlertCircle } from "lucide-react";
import { generateUploadUrl, markUploadComplete } from "../services/API_Service";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileCode, setFileCode] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setIsUploading(true);
      setError(null);

      const { uploadUrl, fileCode, fileS3Key } = await generateUploadUrl(
        file.name
      );

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }

      const completeData = await markUploadComplete(fileCode, fileS3Key);
      setFileCode(completeData.fileCode || fileCode);
      setFile(null);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const resetUpload = () => {
    setFileCode(null);
    setFile(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h1 className="text-xl font-medium mb-6 text-primary">Upload File</h1>

      {fileCode ? (
        <div className="bg-primary-dark border-2 border-dashed border-primary-light rounded-lg p-6 w-full max-w-sm">
          {/* Center everything */}
          <div className="flex flex-col items-center">
            {/* Check icon */}
            <FileCheck className="text-secondary h-12 w-12 mb-3" />

            {/* Header */}
            <h2 className="text-lg font-medium mb-2">File Uploaded</h2>

            {/* Description */}
            <p className="text-center mb-3">Here's the code to share:</p>

            {/* Code display */}
            <div className="bg-primary/10 rounded py-2 px-4 text-center mb-4">
              <span className="text-secondary text-xl font-mono">
                {fileCode}
              </span>
            </div>

            {/* Expiration note */}
            <p className="text-gray text-sm mb-4">Good for 60 mins</p>

            {/* Reset button */}
            <button
              onClick={resetUpload}
              className="bg-secondary hover:bg-secondary-light text-white py-2 px-4 rounded"
            >
              Upload Again
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div
            className={`border-2 border-dashed rounded p-6 mb-4 transition-colors flex flex-col items-center
              ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-primary-dark"
              }
              ${file ? "bg-secondary/5 border-secondary" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}
              className="hidden"
              disabled={isUploading}
            />

            <label
              htmlFor="file-input"
              className="cursor-pointer w-full text-center"
            >
              <div className="flex flex-col items-center">
                <Upload
                  className={`h-10 w-10 mb-2 ${
                    file ? "text-secondary" : "text-primary"
                  }`}
                />

                {file ? (
                  <div>
                    <p className="font-medium mb-1">Ready to upload:</p>
                    <p className="text-sm text-gray mb-1">{file.name}</p>
                    <p className="text-xs text-gray">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium mb-1">
                      Drop file here or click to browse
                    </p>
                  </div>
                )}
              </div>
            </label>
          </div>

          {error && (
            <div className="bg-error/10 text-error rounded p-3 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!file || isUploading}
            className={`w-full py-2 rounded transition-colors font-medium
              ${
                !file
                  ? "bg-light-gray text-gray cursor-not-allowed"
                  : isUploading
                  ? "bg-primary-light text-white cursor-wait"
                  : "bg-primary hover:bg-primary-light text-white"
              }`}
          >
            {isUploading ? "Uploading..." : "Upload File"}
          </button>
        </form>
      )}
    </div>
  );
}
