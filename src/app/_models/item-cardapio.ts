import { Prato } from './prato';

export class ItemCardapio {
    
    prato: Prato;
    quantidade: number;

    get id() { return this.prato.id }
    get nome() { return this.prato.nome }
    get descricao() { return this.prato.descricao }
    get valor() { return this.prato.valor }
    get imagem() { return this.prato.imagem }
    get tempoPreparo() { return this.prato.tempoPreparo }
    get categoria() { return this.prato.categoria }
    
}
