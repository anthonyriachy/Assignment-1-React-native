import { GetProductsResponse } from '../../../../services/ProductService/ProductService.type';

export type GetProductsParams = {
    page?: number;
    limit?: number;
};

export type { GetProductsResponse };