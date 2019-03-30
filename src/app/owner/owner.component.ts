import { Component, OnInit, OnDestroy } from '@angular/core';
import { CinemaService } from '../services/cinema.service';
import { RevenuePayloadType } from '../shared/show.model';
// import { Subscription } from 'rxjs';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.sass']
})
export class OwnerComponent implements OnInit, OnDestroy {
  // private subRevenueGen: Subscription;

  isRevenuePayLoadReady: boolean = false;
  revenuePayLoad: RevenuePayloadType;

  constructor(private cinemaService: CinemaService) { }

  ngOnInit() { 
    console.log(this.revenuePayLoad);
    this.revenuePayLoad = new RevenuePayloadType(0, 0, 0, 0);
    this.onReveuneGenerate();
  }

  ngOnDestroy() {
    // this.subRevenueGen.unsubscribe();
  }

  onReveuneGenerate() {
    console.log('on print revenue');
    this.cinemaService.getRevenueGenerated()
      .subscribe(
        total => {
          this.revenuePayLoad = this.cinemaService.getTotalRevenue(total);
          console.log(this.revenuePayLoad);

          if(this.revenuePayLoad.total !== 0) {
            this.isRevenuePayLoadReady = true;
          } else {
            this.isRevenuePayLoadReady = false;
          }
        }
      )
  }

}
