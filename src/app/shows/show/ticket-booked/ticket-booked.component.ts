import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookedData } from 'src/app/shared/show.model';

@Component({
  selector: 'app-ticket-booked',
  templateUrl: './ticket-booked.component.html',
  styleUrls: ['./ticket-booked.component.sass']
})
export class TicketBookedComponent implements OnInit {

  newBookedData: BookedData;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.newBookedData = new BookedData(this.route.snapshot.paramMap.get('seats'), this.route.snapshot.paramMap.get('show'));

    console.log(this.newBookedData);
  }

}
