export type Post = {
    post_id: number;
    title: string;
    content: string;
    category_id: number | null;
    digitalLevel_id: number | null;
    nickname : string;
    area_id: number | null;
    interest_id : number | null;
    image_url?: string;
    created_at: Date;
    updated_at?: Date;
}