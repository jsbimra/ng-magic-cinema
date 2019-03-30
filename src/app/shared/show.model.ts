import { Observable } from 'rxjs';

export class TicketType {
    constructor(public rate: number, public available_seats: any) {}
}

export class Seat {
    constructor(public seat: string, public rate: number) {}
}

export class BookedData {
    constructor(private seats: string, private show: string) {}
}
export class Show {
    public name: string;
    public platinum: TicketType;
    public gold: TicketType;
    public silver: TicketType;
    
    constructor(name: string, platinum: TicketType, gold: TicketType, silver: TicketType) { 
            this.name = name;
            this.platinum = platinum;
            this.gold = gold;
            this.silver = silver;
        }
}

export class TotalPayLoad {
    constructor(public total:number, public subtotal:number, public tax:number, public sbc:number, public kkc:number ) {}
}
export class RevenuePayloadType {
    constructor(public total:number, public tax:number, public sbc:number, public kkc:number ) {}
}