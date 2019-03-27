import { Component, OnInit } from '@angular/core';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-show',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.sass']
})
export class ShowsComponent implements OnInit {
  shows = [];

  constructor(private cinemaService: CinemaService) {
    this.shows = this.cinemaService.getAllShows();
  }

  ngOnInit() {

  }

}
