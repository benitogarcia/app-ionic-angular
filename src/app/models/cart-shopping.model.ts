import { ComplObligatorio } from "./compl-obligatorio.model";
import { ComplOpcional } from "./compl-opcional.model";

export class CartShopping {
    id: number;
    nombre: string;
    imagen: string;
    cantidad: string;
    ordenes: number;
    precio: number;
    total: number;
    codigo: number;
    c_obligatorio: string;
    d_obligatorio: string;
    c_opcional: ComplOpcional[]
};
