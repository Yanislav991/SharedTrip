import { ITrip } from "./ITrip";

export interface IProfile{
    userName:string,
    email:string,
    phoneNumber: string,
    avatarUrl: string,
    trips: Array<ITrip>
}