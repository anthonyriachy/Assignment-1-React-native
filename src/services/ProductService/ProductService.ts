import { endpoints } from '../../constants/endpoints';

import axiosInstance from '../../lib/axiosInstance/axiosInstance';
import { handleError } from '../../lib/handleError';
import { GetByIdResponse, GetProductsResponse } from './ProductService.type';

export class ProductService {
    static async getProducts(page:number = 1,limit:number = 10):Promise<GetProductsResponse> {
        try {
            const params = new URLSearchParams();
            params.append('page',page.toString());
            params.append('limit',limit.toString());
            const response = await axiosInstance.get(endpoints.products.getProducts, { params });
            return response.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }

    static async getProductById(productId:string):Promise<GetByIdResponse> {
        try {
            const response = await axiosInstance.get(endpoints.products.getProductById.replace(':productId',productId));
            console.log('response by id:',response)
            return response.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }
    static async searchProducts(searchQuery:string) {
        try {
            const response = await axiosInstance.get(endpoints.products.searchProducts,{
                params:{
                    searchQuery,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }
}
