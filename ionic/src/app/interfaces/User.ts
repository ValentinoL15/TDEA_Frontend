export interface User {
    _id?: string,
    firstName: string,
    lastName?: string,
    docNumber: number,
    gender: string,
    phone:number,
    birthday?: string,
    birthdayFormatted?: string;
    profileImg?: string,
    pictureAccept?: boolean,
    status?: string,
    instagram?: string,
    notes?: string,
    email: string,
    password:string,
    mercado?: boolean,
    completedFormMarket?: boolean,
    rol?: string[]
}
