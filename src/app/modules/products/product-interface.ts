 export type TProduct = {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[] | null ;
    variants: Array<{
        type: string;
        value: string;
    }>;
    inventory: {
        quantity: number;
        inStock: boolean;
    };
};

