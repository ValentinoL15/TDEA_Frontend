export interface User {
    firstName: string,
    lastName?: string,
    docNumber: number,
    gender: string,
    phone:number,
    birthday?: Date,
    birthdayFormatted?: string;
    profileImg?: string,
    instagram?: string,
    notes?: string,
    email: string,
    password:string,
}
