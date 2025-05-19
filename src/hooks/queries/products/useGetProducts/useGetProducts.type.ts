import { ProductDTO } from '../../../../types/ProductDTO';

export interface GetProductsParams {
    page?: number;
    limit?: number;
    searchQuery?: string;
}

export interface ProductsResponse {
    data: ProductDTO[];
    total: number;
    page: number;
    limit: number;
}