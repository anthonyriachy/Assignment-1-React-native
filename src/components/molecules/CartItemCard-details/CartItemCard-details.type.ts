import { CartItemDTO } from "../../../types/CartItemDTO"

export type CartItemCardDetailsProps = {
    item:CartItemDTO,
    quantity:number,
    onQuantityChange:(quantity:number)=>void,
    onRemoveItem:()=>void,
}