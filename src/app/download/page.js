"use client";

import { useState } from "react";
import { Download, FileCheck, AlertCircle, Clock, File } from "lucide-react";
import { getDownloadUrl } from "../services/API_Service";

export default function DownloadPage() {
  const [fileCode, setFileCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileInfo, setFileInfo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fileCode.trim()) return;

    try {
      setIsLoading(true);
      setError(null);

      const data = await getDownloadUrl(fileCode.trim());

      setFileInfo({
        downloadUrl: data.downloadUrl,
        fileName: data.fileName || "File",
        fileSize: data.fileSize,
        expiresAt: data.expiresAt,
      });
    } catch (err) {
      let errorMessage = "File not found";

      if (err.response) {
        if (err.response.status === 404) {
          errorMessage = "File not found. Check the code and try again.";
        } else if (err.response.status === 410) {
          errorMessage = "This file has expired.";
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      }

      setError(errorMessage);
      setFileInfo(null);
    } finally {
      setIsLoading(false);
    }
  };

  const resetDownload = () => {
    setFileInfo(null);
    setFileCode("");
    setError(null);
  };

  {console.log(fileInfo)}
  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h1 className="text-xl font-medium mb-6 text-primary">Download File</h1>

      {fileInfo ? (
        <div className="rounded p-6 w-full max-w-sm">
          <div className="flex flex-col items-center">
            <FileCheck className="text-secondary h-12 w-12 mb-3" />
            <h2 className="text-lg font-medium mb-2">File Found</h2>

            <div className="w-full mb-4">
              {fileInfo.expiresAt && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-gray">
                    Expires: {formatDate(fileInfo.expiresAt)}
                  </span>
                </div>
              )}
            </div>

            <a
              href={fileInfo.downloadUrl}
              download
              className="bg-primary hover:bg-primary-light text-white py-2 px-4 rounded transition-colors w-full text-center mb-3 flex items-center justify-center"
            >
              <Download className="h-5 w-5 mr-2" />
              Download File
            </a>

            <button
              onClick={resetDownload}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Enter a different code
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="border rounded-lg p-4 mb-4">
            <label
              htmlFor="file-code"
              className="block text-sm font-medium mb-1 text-primary"
            >
              Enter File Code
            </label>
            <input
              type="text"
              id="file-code"
              value={fileCode}
              onChange={(e) => setFileCode(e.target.value)}
              placeholder="Enter the 6-digit code"
              className="w-full px-3 py-2 rounded border border-light-gray focus:outline-none focus:ring-1 focus:ring-primary text-foreground bg-primary-dark mb-2"
              disabled={isLoading}
              autoComplete="off"
              autoFocus
            />
            <p className="text-xs text-gray">
              Enter the code you received when the file was uploaded
            </p>
          </div>

          {error && (
            <div className="bg-error/10 text-error rounded p-3 mb-4 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!fileCode.trim() || isLoading}
            className={`cursor-pointer w-full py-2 rounded transition-colors font-medium flex items-center justify-center
              ${
                !fileCode.trim()
                  ? "bg-light-gray text-gray cursor-not-allowed"
                  : isLoading
                  ? "bg-primary-light text-white cursor-wait"
                  : "bg-primary hover:bg-primary-light text-white"
              }`}
          >
            {isLoading ? (
              <>
                <span className="inline-block h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Checking...
              </>
            ) : (
              <>
                <Download className=" h-5 w-5 mr-2" />
                Find File
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
