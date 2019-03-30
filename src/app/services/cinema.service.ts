import { Injectable } from '@angular/core';
import { Show, Seat, TotalPayLoad } from '../shared/show.model';
import { Subject, ReplaySubject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  seatsChanged = new Subject<any>();
  seatsSubTotal = new Subject<any>();
  currentShowData = new ReplaySubject<any>();
  revenueGenerated = new BehaviorSubject<any>(0);

  taxRate: number = 14;
  sbc: number = .5;
  kkc: number = .5;

  defaultSeats: Object = {
    platinum: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
    gold: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10'],
    silver: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10']
  };

  shows: Show[] = [
    new Show('Comedy Show',
      {
        rate: 320,
        available_seats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9'],
      },
      {
        rate: 280,
        available_seats: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
      }, {
        rate: 240,
        available_seats: ['C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
      }),

    new Show('Horror Show',
      {
        rate: 320,
        available_seats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'],
      },
      {
        rate: 280,
        available_seats: ['B2', 'B3', 'B4', 'B5', 'B6'],
      }, {
        rate: 240,
        available_seats: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
      }),

    new Show('Drama Show',
      {
        rate: 320,
        available_seats: ['A1', 'A2', 'A3', 'A4', 'A5'],
      },
      {
        rate: 280,
        available_seats: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
      }, {
        rate: 240,
        available_seats: ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
      })
  ];

  constructor() { }

  getAllShows() {
    return this.shows.slice();
  }

  getShowDetails(name: string) {
    if (name) {
      const currentShow = this.shows.find(show => show.name.toLowerCase() === name);
      this.currentShowData.next(currentShow);
      return currentShow;
    }
  }
  getDefaultSeats() {
    return this.defaultSeats;
  }

  calculateTotal(subtotal: number, taxRate: number = this.taxRate, sbc: number = this.sbc, kkc: number = this.kkc) {
    return subtotal + (Math.abs((subtotal * taxRate / 100)) + Math.abs((subtotal * sbc / 100)) + Math.abs((subtotal * kkc / 100)));
  }

  getTotalRevenue(total: number) {
    return {
      total,
      tax: this.roundDigits(total - (total - Math.abs((total * this.taxRate / 100))), 2),
      sbc: this.roundDigits(total - (total - Math.abs((total * this.sbc / 100))), 2),
      kkc: this.roundDigits(total - (total - Math.abs((total * this.kkc / 100))), 2)
    }
  }

  updateSeats(arrOfSelectedSeats: any, defaultSeats: any) {
    this.currentShowData.subscribe(
      show => {
        for (const type of Object.keys(defaultSeats)) {
          arrOfSelectedSeats.map(seat => {
            const findIndex = show[type].available_seats.findIndex(seatX => seatX.trim() === seat.trim());
            if (findIndex !== -1 && findIndex !== "undefined") {
              show[type].available_seats.splice(findIndex, 1);
            }
          });
        }
      }
    );
  }

  setTotalRevenue(total) {
    this.revenueGenerated.next(total);
  }

  getRevenueGenerated(): Observable<any> {
    return this.revenueGenerated.asObservable()
  }

  roundDigits(value:any, places:any) {
    /// TS_IGNORE         
    return +(Math.round(value + "e+" + places) + "e-" + places);
  }
}
