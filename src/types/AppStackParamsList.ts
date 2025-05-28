import { AppStackRoutes } from '../constants/AppStackRoutes';

export type AppStackParamsList = {
    [AppStackRoutes.BottomTabs]: undefined;
    [AppStackRoutes.Details]: { itemId: string };
    [AppStackRoutes.Products]: { title: string };
    [AppStackRoutes.Profile]: undefined;
    [AppStackRoutes.SellModal]: { productId?: string };
    [AppStackRoutes.EditProfile]: undefined;
    [AppStackRoutes.Cart]: undefined;
    [AppStackRoutes.Checkout]: undefined;
    [AppStackRoutes.OrderComplete]: undefined;
};