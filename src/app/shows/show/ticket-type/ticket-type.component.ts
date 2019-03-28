import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TicketType, Seat } from 'src/app/shared/show.model';
import { CinemaService } from 'src/app/services/cinema.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticket-type',
  templateUrl: './ticket-type.component.html',
  styleUrls: ['./ticket-type.component.sass']
})

export class TicketTypeComponent implements OnInit, OnDestroy {

  private subSeatsChanged: Subscription;

  @Input() ticketTypeData: TicketType;
  @Input() defaultSeats: any;

  ticketTypes: any = [];
  isSeatSelected = false;
  selectedSeat = [];
  selectedSeatRates = [];

  constructor(private cinemaService: CinemaService) { }

  ngOnInit() {
    //Get the keys out of types of seats to create ticket types
    this.ticketTypes.push(...Object.keys(this.defaultSeats));

    this.subSeatsChanged = this.cinemaService.seatsChanged
      .subscribe(
        seats => {
          if (!seats.length) {
            this.selectedSeat = [];
            this.selectedSeatRates = [];
          }
        }
      );
  }

  ngOnDestroy() {
    this.subSeatsChanged.unsubscribe();
  }

  onSelectSeat(...args) {
    const [seat, rate] = args;

    // console.log(seat, rate);

    if (seat && rate) {
      console.log('is seat selected? ', this.isSeatSelected);

      if (!this.selectedSeat.includes(seat)) {
        this.selectedSeat.push(seat);
        this.selectedSeatRates.push(rate);
        this.isSeatSelected = !this.isSeatSelected;
      } else {
        this.isSeatSelected = false;
        const findIndex = this.selectedSeat.findIndex(seatX => seatX === seat);
        this.selectedSeatRates.splice(findIndex, 1);
        this.selectedSeat.splice(findIndex, 1);
        console.log('Now what is selectedSeat? ', this.selectedSeat);
      }

      //update seatsChanged subject with new selected seats
      this.cinemaService.seatsChanged.next(this.selectedSeat.slice());

      //calculate subtotal of selected seats
      const subTotal = this.selectedSeatRates.reduce((total, rate) => total + rate, 0);
      //update sub total subject with total
      this.cinemaService.seatsSubTotal.next(subTotal);

    }

    // console.log(this.selectedSeat);
    // console.log(this.selectedSeatRates);

  }

}
