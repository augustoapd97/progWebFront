import { Categoria } from './categoria';

export class Restaurante {

    idUsuario: number;
    CNPJ: string;
    nomeFantasia: string;
    razaoSocial: string;
    logotipo?: string;
    telefones: {
        telefone: string;
        whatsapp: boolean;
    }[];
    
    categorias: Categoria[];

}
