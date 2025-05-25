import { CartItemDTO } from "../../types/CartItemDTO";

export interface CartState {
  items: CartItemDTO[];
  addItem: (item: Omit<CartItemDTO, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}
