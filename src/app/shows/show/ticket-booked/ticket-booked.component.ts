import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookedData } from 'src/app/shared/show.model';

@Component({
  selector: 'app-ticket-booked',
  templateUrl: './ticket-booked.component.html',
  styleUrls: ['./ticket-booked.component.sass']
})
export class TicketBookedComponent implements OnInit {

  newBookedData: BookedData;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    
    if(!this.route.snapshot.paramMap.get('seats') || !this.route.snapshot.paramMap.get('show')) {
      this.router.navigate(['/shows']);
    }
    this.newBookedData = new BookedData(this.route.snapshot.paramMap.get('seats'), this.route.snapshot.paramMap.get('show'));

  }

}
