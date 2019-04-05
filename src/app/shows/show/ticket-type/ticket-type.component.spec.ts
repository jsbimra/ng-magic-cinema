import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShowComponent } from '../show.component';
import { HypenTransformPipe } from '../../../hypen-transform.pipe';
import { TicketTypeComponent } from './ticket-type.component';
import { CinemaService } from 'src/app/services/cinema.service';
import { routes } from 'src/app/app.routes';
import { ShowsComponent } from '../../shows.component';
import { OwnerComponent } from 'src/app/owner/owner.component';
import { TicketBookedComponent } from '../ticket-booked/ticket-booked.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Show } from 'src/app/shared/show.model';

describe('TicketTypeComponent', () => {
  let comp: TicketTypeComponent;
  let fixture: ComponentFixture<TicketTypeComponent>;
  let cs: CinemaService;
  let router: Router;
  let location: Location;
  let count: number = 1;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowsComponent,
        ShowComponent,
        OwnerComponent,
        TicketBookedComponent,
        TicketTypeComponent,
        HypenTransformPipe],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [CinemaService]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTypeComponent);
    comp = fixture.componentInstance;
    cs = fixture.debugElement.injector.get(CinemaService);

    comp.ticketTypes.push(...Object.keys(cs.getDefaultSeats()));

    comp.ticketTypeData = new Show('Comedy Show',
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
      });

    count++;

    fixture.detectChanges();
    router.initialNavigation();
  });

  it(`should ${count} create ticket type comp`, () => {
    console.log('<<<<< TICKET-TYPE COMP: should 1 >>>>>>>>');
    expect(comp).toBeTruthy();
  });

});
