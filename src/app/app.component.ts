import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgRedux, select } from 'ng2-redux';
import { McAppState, initialState } from './store';
import { INCREMENT_LIKE } from './actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @select() likeCounter: Number;

  title = 'Redux Magic Cinema';
  isNavVisible = true;
  likeCount = 0;

  constructor(private route: ActivatedRoute, 
      private router: Router, 
      private ngRedux: NgRedux<McAppState>) { }

  ngOnInit() {  
    this.router.events.subscribe((route: any) => {

      if (route.url && route.url.indexOf('ticket-booked') !== -1) {
        this.isNavVisible = false;
      } else {
        this.isNavVisible = true;
      }
    });
  }

  incrementLike() {
    this.ngRedux.dispatch({ type: INCREMENT_LIKE });
  }
}
