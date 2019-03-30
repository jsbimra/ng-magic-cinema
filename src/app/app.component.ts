import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TechVerito Cinema';
  isNavVisible = true;

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {

    this.router.events.subscribe((route: any) => {

      if (route.url && route.url.indexOf('ticket-booked') !== -1) {
        console.log(' !== ', route.url);
        this.isNavVisible = false;
      } else {
        console.log(' else ', route.url);
        this.isNavVisible = true;
      }
    });
  }
}
