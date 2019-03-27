import { Injectable } from '@angular/core';
import { Show } from '../shared/show.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
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
        booked_seats: []
      },
      {
        rate: 280,
        available_seats: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
        booked_seats: []
      }, {
        rate: 240,
        available_seats: ['C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
        booked_seats: []
      }),

    new Show('Horror Show',
      {
        rate: 320,
        available_seats: ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7'],
        booked_seats: []
      },
      {
        rate: 280,
        available_seats: ['B2', 'B3', 'B4', 'B5', 'B6'],
        booked_seats: []
      }, {
        rate: 240,
        available_seats: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7'],
        booked_seats: []
      }),

    new Show('Drama Show',
      {
        rate: 320,
        available_seats: ['A1', 'A2', 'A3', 'A4', 'A5'],
        booked_seats: []
      },
      {
        rate: 280,
        available_seats: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
        booked_seats: []
      }, {
        rate: 240,
        available_seats: ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
        booked_seats: []
      }),

    // {
    //   name: 'Horror Show',
    //   platium: {
    //     available_seats: ['A1', 'A2', 'A3', 'A4', 'A5'],
    //     booked_seats: []
    //   },
    //   gold: {
    //     available_seats: ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
    //     booked_seats: []
    //   },
    //   silver: {
    //     available_seats: ['C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9'],
    //     booked_seats: []
    //   }
    // }
  ];

  constructor() { }

  getAllShows() {
    return this.shows.slice();
  }

  getShowDetails(name: string) {
    if (name) {
      return this.shows.find(show => show.name.toLowerCase() === name);
    }
  }
  getDefaultSeats() {
    return this.defaultSeats;
  }
}
