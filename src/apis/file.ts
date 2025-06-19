import { FileData } from "@/types/file";
import api from "./app";
import { END_POINT } from "@/constants/route";

export const getFiles = async (): Promise<FileData[]> => {
  const response = await api.get<FileData[]>(END_POINT.FILES_LIST);
  console.log("파일 목록", response.data);

  return response.data;
};

export const uploadFiles = async (payload: File): Promise<FileData> => {
  const formData = new FormData();
  formData.append("file", payload);

  const response = await api.post<FileData>(END_POINT.FILES_UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    }
  });
  console.log("파일 업로드", response.data);

  return response.data;
};

export const deleteFiles = async (ids: number[]): Promise<void> => {
  const response = await api.delete(END_POINT.FILES_DELETE, {
    data: { ids },
  });
  console.log("파일 삭제", response.data);

  return response.data;
};
