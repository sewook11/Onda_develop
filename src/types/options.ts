export type AgeGroup = {
    id: number;
    group: number;
    display?: string;
}

export type Area = { 
    id: number;
    area_name: string;
    depth?: "시" | "구" | "동";
    children?: Area[];
}

export type Category = {
    id: number;
    category_name: string;
}

export type DigitalLevel = {
    id: number;
    level: number;
    description: string;
    display?: string
}

export type Interest = {
    id: number;
    interest_name: string;
} 