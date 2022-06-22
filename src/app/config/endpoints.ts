import { environment } from "src/environments/environment";

export const APIs = {

    auth: {
        login: environment.urlDomain + '/auth/',
        registrar: environment.urlDomain + '/usuario/'
    },
    sucursal: {
        getSucursales: environment.urlDomain + '/sucursal/'
    },
    categoria: {
        getCategoriasSucursal: environment.urlDomain + '/categoria/?sucursal={0}'
    },
    producto: {
        getProductos: environment.urlDomain + '/producto/',
        getProductosCategoria: environment.urlDomain + '/producto/?categoria={0}',
        getProductoId: environment.urlDomain + '/producto/?producto={0}',
    },
    asentamiento: {
        getEstados:  environment.urlDomain + "/asentamiento/estado/",
        getMunicipios: "/api.food/asentamiento/municipio/",
        getMunicipiosEstado:  environment.urlDomain + "/asentamiento/municipio/?idestado={0}",
        getAsentamientosMunicipio:  environment.urlDomain + "/asentamiento/codigopostal/?idmunicipio={0}",
        getAsentamientosCP:  environment.urlDomain + "/asentamiento/codigopostal/?cp={0}",
    },
    direccion: {
        api: 'http://192.168.0.103/api.food/direccion/',
        delete: 'http://192.168.0.103/api.food/direccion/?direccion={0}'
    }

}