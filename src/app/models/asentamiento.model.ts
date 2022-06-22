export class Asentamiento {
    id: number;
    asentamiento: string;
    tipo_asentamiento: string;
    codigopostal: string;
    zona: string;
    idestado: number;
    idmunicipio: number;
}

export class Estado {
    id: number;
    estado: string;
    capital: string;
}

export class Municipio {
    id: number;
    municipio: string;
    idEstado: number;
}