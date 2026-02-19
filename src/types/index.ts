export interface Product {
    id: string;
    category: string;
    title: string;
    description: string;
    price: string;
    unit: string;
    image: string;
    materialType: string;
    availability: string;
    specs?: string[];
}
