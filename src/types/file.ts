export type FileData = {
    id: number;
    user_id?: number;
    file: string;
    file_type: "image" | "video" | "file";
    category: "post" | "profile" | "meet" | "certificate" | "other";
    file_name?: string | null;
    file_size?: number;
    thumbnail?: string;
    uploaded_at?: Date;
}

export type PostFile = Omit<FileData, "category">;

