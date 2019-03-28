import { Component, OnInit, Input } from '@angular/core';
import { TicketType, Seat } from 'src/app/shared/show.model';

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.sass']
})
export class TicketTypeComponent implements OnInit {

  @Input() ticketTypeName: string;
  @Input() ticketTypeData: TicketType;
  @Input() defaultSeats: any;

  isSeatSelected = false;
  selectedSeat = [];

  constructor() { }

  ngOnInit() {
    console.log(this.ticketTypeData);
  }

  onSelectSeat(...args) {
    const [seat, rate] = args;

    // console.log(seat, rate);

    if (seat && rate) {
      console.log('is seat selected? ', this.isSeatSelected);

      if (!this.selectedSeat.includes(seat)) {
        this.selectedSeat.push(seat);
        this.isSeatSelected = !this.isSeatSelected;
      } else {
        this.isSeatSelected = false;
        const findIndex = this.selectedSeat.findIndex(seatX => seatX === seat);
        console.log('findIndex? ', findIndex);
        this.selectedSeat.splice(findIndex, 1);
        console.log('Now what is selectedSeat? ', this.selectedSeat);

      }
    }

    console.log(this.selectedSeat);
  }

}
