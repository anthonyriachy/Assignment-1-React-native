import { UseFormSetValue } from "react-hook-form";
import { ProductSchemaType } from "../../../schemas/Product.schema";

export type MapComponentProps = {
    setValue?: UseFormSetValue<ProductSchemaType>;
    latitude?: number;
    longitude?: number;
    locationName?: string;
    isView?: boolean;
}