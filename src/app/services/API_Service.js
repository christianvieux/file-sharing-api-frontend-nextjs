import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function generateUploadUrl(fileName) {
  const res = await api.get(`/generate-upload-url`, {
    params: { FileName: fileName },
  });
  return res.data;
}

export async function markUploadComplete(fileCode, fileS3Key) {
  const res = await api.post('/upload-complete', {
    fileCode,
    fileS3Key,
  });
  return res.data;
}

export async function getDownloadUrl(fileCode) {
  const res = await api.get(`/download-url/${fileCode}`);
  return res.data;
}

export async function getAllFiles() {
  const res = await api.get('/files');
  return res.data;
}
