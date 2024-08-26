export interface Empresa {
    _id?:any,
    dueno: string,
    razonSocial: string,
    cuit: number,
    condicionTributaria: string,
    tipoFactura: string,
    adress: string,
    mail: string,
    phone: number,
    sedes?: Array<any>
}