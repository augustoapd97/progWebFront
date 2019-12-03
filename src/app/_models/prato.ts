import { Categoria } from './categoria';

export class Prato {
    
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    imagem: string;
    tempoPreparo: number;
    categoria: Categoria;

}
