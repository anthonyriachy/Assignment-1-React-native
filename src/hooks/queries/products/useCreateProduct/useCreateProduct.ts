import { useMutation } from "@tanstack/react-query";
import { ProductService } from "../../../../services/ProductService";
import { queryClient } from "../../../../lib/queryClient";
import OneSignalService from "../../../../services/OneSignalService";

export const useCreateProduct = () => {
    return useMutation({
        mutationFn: async(product: FormData) => {
            const response = await ProductService.createProduct(product);
            return response.data;
        },
        onSuccess: async (data) => {
            queryClient.invalidateQueries({ queryKey: ['products'] });
            
            // Send notification to all users
            await OneSignalService.getInstance().sendNotificationToAll(
                'New Product Available!',
                `${data.title} has been added to the store!`,
                {
                    productId: data._id,
                    type: 'new_product',
                    price: data.price?.toString(),
                    image: data.images?.[0]?.url,
                }
            );
        },
        onError: (error) => {
            throw new Error(error.message);
        }
    });
};