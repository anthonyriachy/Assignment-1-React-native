import { AppStackRoutes } from '../constants/AppStackRoutes';

export type AppStackParamsList = {
    [AppStackRoutes.BottomTabs]: undefined;
    [AppStackRoutes.Details]: undefined;
    [AppStackRoutes.Products]: { title: string };
    [AppStackRoutes.Profile]: undefined;
    [AppStackRoutes.SellModal]: undefined;
    SellModal: undefined;
};