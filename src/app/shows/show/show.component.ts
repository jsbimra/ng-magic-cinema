import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  transformShowName: string;
  defaultSeats: any;
  isSeatSelected = false;
  isContinueTicketReview = false;
  selectedSeats: string;
  arrSelectedSeats: any;

  constructor(
    private route: ActivatedRoute,
    private cinemaService: CinemaService,
    private hypenTransform: HypenTransformPipe,
    private router: Router) {

    this.selectedShowName = this.route.snapshot.paramMap.get('id');
    this.defaultSeats = this.cinemaService.getDefaultSeats();
  }

  ngOnInit() {
    this.transformShowName = this.hypenTransform.transform(this.selectedShowName, 'remove');
    this.cinemaService.getShowDetails(this.transformShowName);

    this.cinemaService.currentShowData.subscribe(
      show => this.selectedShow = show
    );

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
    this.router.navigate(['ticket-booked', { seats: this.selectedSeats, show: this.transformShowName }]);
    console.log(this.totalPayLoad);

    let revenueTotal: number = 0;
    this.cinemaService.getRevenueGenerated()
      .subscribe(
        total => {
          revenueTotal = total + this.totalPayLoad.total;

          console.log(total);
        }
      );

    this.cinemaService.setTotalRevenue(revenueTotal);

  }

  onReset() {
    this.cinemaService.seatsChanged.next([]);
  }

}
