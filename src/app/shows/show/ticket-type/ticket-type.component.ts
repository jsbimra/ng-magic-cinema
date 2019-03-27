import { Component, OnInit, Input } from '@angular/core';
import { TicketType } from 'src/app/shared/show.model';

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.sass']
})
export class TicketTypeComponent implements OnInit {

  @Input() ticketTypeName: string;
  @Input() ticketTypeData: TicketType;
  @Input() defaultSeats: any;

  constructor() {

  }

  ngOnInit() {
    console.log(this.ticketTypeData.available_seats);
  }

}
