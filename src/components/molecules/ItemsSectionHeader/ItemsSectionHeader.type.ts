import { ProductDTO } from "../../../types/ProductDTO";

export type ItemsSectionHeaderProps = {
	title: string;
	onClick?: () => void;
	data?: ProductDTO[];
};
