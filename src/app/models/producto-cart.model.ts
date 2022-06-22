export class Opcional {
    id: number;
    complemento: string;
    precio: number;
}

export class Obligatorio {
    id: number;
    complemento: string;
}

export class ProductoCart {
    id: number = 0;
    nombre: string;
    descripcion: string;
    imagen: string;
    cantidad: string;
    precio: number = 0;
    complementoOpcional: boolean;
    complementoObligatorio: boolean;
    complOpcional: Opcional[];
    complObligatorio: Obligatorio[];
}
