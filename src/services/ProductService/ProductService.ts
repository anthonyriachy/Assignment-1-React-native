import { endpoints } from '../../constants/endpoints';

import axiosInstance from '../../lib/axiosInstance/axiosInstance';
import { handleError } from '../../lib/handleError';
import { GetByIdResponse, GetProductsResponse, CreateProductResponse } from './ProductService.type';
 export class ProductService {
    static async getProducts(page:number = 1,limit:number = 10):Promise<GetProductsResponse> {
        try {
            const params = new URLSearchParams();
            params.append('page',page.toString());
            params.append('limit',limit.toString());
            const response = await axiosInstance.get(endpoints.products.getProducts, { 
                params: {
                    page: page,
                    limit: limit
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }

    static async createProduct(product: FormData):Promise<CreateProductResponse> {
        try {
            const response = await axiosInstance.post(endpoints.products.createProduct, product, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }


    static async getProductById(productId:string):Promise<GetByIdResponse> {
        try {
            const response = await axiosInstance.get(endpoints.products.getProductById.replace(':productId',productId));
            console.log('response',response.data);
            return response.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }
    static async searchProducts(searchQuery:string) {
        try {
            
            const response = await axiosInstance.get(endpoints.products.searchProducts,{
                params:{

                    query:searchQuery,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }

    static async updateProduct(productId: string, product: FormData): Promise<CreateProductResponse> {
        try {

            
            const response = await axiosInstance.put(
                endpoints.products.updateProduct.replace(':productId', productId),
                product,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            // 
            return response.data;
        } catch (error) {
            // 
            throw new Error(handleError(error));
        }
    }
    static async deleteProduct(productId: string): Promise<CreateProductResponse> {
        try {
            const response = await axiosInstance.delete(
                endpoints.products.deleteProduct.replace(':productId', productId),
            );
            
            return response.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }
}
