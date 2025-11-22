export interface Company {
    id: string;
    name: string;
    slug: string;
    logoUrl?: string;
    website?: string;
    description?: string;
    industry?: string;
    verified: boolean;
    createdAt: any; // Timestamp
    updatedAt: any; // Timestamp
}

export interface CompanyFormData {
    name: string;
    logoUrl?: string;
    website?: string;
    description?: string;
    industry?: string;
}
