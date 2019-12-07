import { ItemPedido } from './item-pedido';

export class Pedido {

    id: number;
    troco?: number;
    idCartao?: number;

    pratos: ItemPedido[];


}