import { Observable } from 'rxjs';

export class TicketType {
    constructor(public rate: number, public available_seats: any, public booked_seats: any) {}
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
