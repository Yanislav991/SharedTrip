export interface ITrip {
    [key: string]: any;
    id:number;
    date: Date;
    description: string;
    endPoint: string;
    price: number;
    placeForLuggage: boolean;
    freeSeats: number;
    startPoint: string;
    carImageUrl: string;
    userName:string;
}