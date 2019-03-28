import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Show, TotalPayLoad } from 'src/app/shared/show.model';
import { HypenTransformPipe } from 'src/app/hypen-transform.pipe';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.sass'],
  providers: [HypenTransformPipe]
})
export class ShowComponent implements OnInit, OnDestroy {
  private subSeatsChanged: Subscription;
  private subTotalSub: Subscription;
  // private subCurrentShowData: Subscription;

  totalPayLoad: TotalPayLoad;
  selectedShow: Show;
  selectedShowName: string = '';
  defaultSeats: any;
  isSeatSelected = false;
  isContinueTicketReview = false;
  selectedSeats: string;
  arrSelectedSeats: any;

  constructor(
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private hypenTransform: HypenTransformPipe) {

    this.selectedShowName = this.route.snapshot.paramMap.get('id');
    this.defaultSeats = this.cinemaService.getDefaultSeats();

  }

  ngOnInit() {
    const transformShowName = this.hypenTransform.transform(this.selectedShowName, 'remove');
    this.cinemaService.getShowDetails(transformShowName);

    this.cinemaService.currentShowData.subscribe(
      show => this.selectedShow = show
    );
    console.log('selectedShow data', this.selectedShow);

    //Subscribe if seat selected
    this.subSeatsChanged = this.cinemaService.seatsChanged
      .subscribe(
        seats => {
          if (seats.length) {
            this.arrSelectedSeats = seats.slice();
            this.selectedSeats = seats.join(', ');
            this.isSeatSelected = true;
          } else {
            this.arrSelectedSeats = [];
            this.isSeatSelected = false;
            this.isContinueTicketReview = false;
          }
        }
      );

    this.subTotalSub = this.cinemaService.seatsSubTotal.subscribe(
      subtotal => {
        if (subtotal) {
          const total = this.cinemaService.calculateTotal(subtotal);
          const tax = ((subtotal * 14) / 100);
          const sbc = ((subtotal * .5) / 100);
          const kkc = ((subtotal * .5) / 100);
          this.totalPayLoad = new TotalPayLoad(total, subtotal, tax, sbc, kkc);
        }
      }
    );


  }

  ngOnDestroy() {
    this.subSeatsChanged.unsubscribe();
    this.subTotalSub.unsubscribe();
    // this.subCurrentShowData.unsubscribe();
  }

  onBookContinue() {
    this.isContinueTicketReview = true;
  }

  onBookNow() {
    console.log('On Book Now fired');

    this.cinemaService.updateSeats(this.arrSelectedSeats, this.defaultSeats);

    // this.subCurrentShowData = this.cinemaService.currentShowData.subscribe(
    //   show => {
    //     const arrOfSelectedSeats = this.arrSelectedSeats;
    //     for(const type of Object.keys(this.defaultSeats)) {
    //       arrOfSelectedSeats.map( seat => {
    //         const findIndex = show[type].available_seats.findIndex( seatX => seatX.trim() === seat.trim());
    //         if(findIndex !== -1 && findIndex !== "undefined") {
    //           show[type].available_seats.splice(findIndex, 1);
    //         }
    //       })
    //     }
    //   }
    // );

  }

  onReset() {
    this.cinemaService.seatsChanged.next([]);
  }

}
