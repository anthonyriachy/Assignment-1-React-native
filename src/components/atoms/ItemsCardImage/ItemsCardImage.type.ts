import { CartItemDTO } from "../../../types/CartItemDTO";
import { ProductDTO } from "../../../types/ProductDTO";

export type ItemsCardImageProps = {
	image: string;
	testID?: string;
	item: ProductDTO | CartItemDTO;
};