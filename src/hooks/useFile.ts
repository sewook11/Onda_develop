import { deleteFiles } from "@/apis/file"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteFile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (ids: number[]) => deleteFiles(ids),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["posts"]});
        },
        onError: (error) => {
            console.error("파일 삭제 실패", error)
        }
    })
}