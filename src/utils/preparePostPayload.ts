import { uploadFiles } from "@/apis/file";
import { PostCreatePayload } from "@/apis/post";
import { PostFormData } from "@/app/community/write/_components/PostForm";

function isUploadedFile(
  file: File | { id: number } | null | undefined
): file is { id: number } {
  return (
    typeof file === "object" &&
    file !== null &&
    "id" in file &&
    typeof file.id === "number"
  );
}

export const preparePostPayload = async (
  formData: PostFormData
): Promise<PostCreatePayload> => {
  let fileId: number | null = null;

  const rawFile = formData.file;
  if (rawFile && rawFile instanceof File) {
    try {
      const uploadedFile = await uploadFiles(rawFile, "post");
      fileId = uploadedFile.ids[0]; // 첫 번째 파일 ID 사용
    } catch (error) {
      console.error("파일 업로드 실패:", error);
      throw new Error("파일 업로드에 실패했습니다.");
    }
  } else if (isUploadedFile(rawFile)) {
    // 이미 업로드된 파일인 경우
    fileId = rawFile.id;
  }

  return {
    title: formData.title,
    content: formData.content,
    category_id: formData.category?.id ?? 0,
    interest_id: formData.interest?.id ?? null,
    area_id: formData.area?.childId?.id ?? null,
    file: fileId ?? null,
  };
};
