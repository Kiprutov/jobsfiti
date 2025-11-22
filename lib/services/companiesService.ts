import {
    companiesCollection,
    createDocument,
    updateDocument,
    deleteDocument,
    getDocument,
    getDocuments,
    convertTimestamp,
} from '@/lib/firebase/firestore';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { Company, CompanyFormData } from '@/lib/types/company';

// Convert Firestore data to Company type
const convertFirestoreCompany = (doc: any): Company => {
    return {
        ...doc,
        createdAt: doc.createdAt ? convertTimestamp(doc.createdAt) : undefined,
        updatedAt: doc.updatedAt ? convertTimestamp(doc.updatedAt) : undefined,
    };
};

// Create a new company
export const createCompany = async (data: CompanyFormData): Promise<Company> => {
    const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    const companyData = {
        ...data,
        slug,
        verified: false,
    };

    const id = await createDocument(companiesCollection, companyData);
    return {
        id,
        ...companyData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
};

// Get all companies
export const getCompanies = async (): Promise<Company[]> => {
    const docs = await getDocuments<Company>(companiesCollection, [orderBy('name')]);
    return docs.map(convertFirestoreCompany);
};

// Get company by ID
export const getCompanyById = async (id: string): Promise<Company | null> => {
    const doc = await getDocument<Company>(companiesCollection, id);
    if (!doc) return null;
    return convertFirestoreCompany(doc);
};

// Search companies by name
export const searchCompanies = async (searchTerm: string): Promise<Company[]> => {
    // Firestore doesn't support native full-text search.
    // For now, we'll fetch all and filter client-side or use a simple prefix match if possible.
    // A scalable solution would use Algolia/Typesense.
    // Here we'll implement a basic client-side filter for the MVP since the list is likely small initially.

    const allCompanies = await getCompanies();
    const lowerTerm = searchTerm.toLowerCase();

    return allCompanies.filter(c =>
        c.name.toLowerCase().includes(lowerTerm)
    );
};
