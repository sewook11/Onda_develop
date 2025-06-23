import { deleteFiles, FileUploadResponse, uploadFiles } from '@/apis/file';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type UploadPayload = {
    file: File;
    category: 'post' | 'profile' | 'meet' | 'certificate' | 'other';
};

export function useUploadFile() {
    const queryClient = useQueryClient();
  
    return useMutation<FileUploadResponse, Error, UploadPayload>({
      mutationFn: ({ file, category }) => uploadFiles(file, category),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['files'] });
      },
    });
}

export function useDeleteFiles() {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number[]>({
        mutationFn: (ids) => deleteFiles(ids),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['files'] }); // 목록 갱신
        },
    });
}