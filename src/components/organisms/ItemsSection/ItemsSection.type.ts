import { ProductDTO } from "../../../types/ProductDTO";

export type ItemsSectionProps = {
	title: string;
	horizontal?: boolean;
	onClick?: () => void;
	data?: ProductDTO[];
};
