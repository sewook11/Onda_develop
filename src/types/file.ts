
export type FileData = {
    id: number;
    user_id?: number;
    file_url: string;
    file_type: "image" | "video" | "file";
    file_name?: string | null;
    file_size?: number;
    thumbnail?: string;
    uploaded_at?: Date;
}
