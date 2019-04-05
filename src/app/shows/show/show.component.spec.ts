import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';

import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { routes } from 'src/app/app.routes';
import { HypenTransformPipe } from '../../hypen-transform.pipe';
import { ShowComponent } from './show.component';
import { TicketTypeComponent } from './ticket-type/ticket-type.component';
import { ShowsComponent } from '../shows.component';
import { OwnerComponent } from 'src/app/owner/owner.component';
import { TicketBookedComponent } from './ticket-booked/ticket-booked.component';
import { CinemaService } from 'src/app/services/cinema.service';
import { Show, TicketType } from 'src/app/shared/show.model';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

describe(`ShowComponent`, () => {
  let comp: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;
  let router: Router;
  let location: Location;
  let hypenPipe: HypenTransformPipe;
  let cs: CinemaService;
  let titleDebugElement: DebugElement;
  let showsNavElement: DebugElement[];
  let ttDebugElement: DebugElement;
  let ticketTypeComp: TicketTypeComponent;
  let count: number = 1;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowComponent,
        ShowsComponent,
        OwnerComponent,
        TicketBookedComponent,
        TicketTypeComponent,
        HypenTransformPipe
      ],
      providers: [CinemaService],
      imports: [RouterTestingModule.withRoutes(routes)],
      schemas: [NO_ERRORS_SCHEMA]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    comp = fixture.componentInstance;
    hypenPipe = new HypenTransformPipe();
    cs = fixture.debugElement.injector.get(CinemaService);

    comp.selectedShow = new Show('Comedy Show',
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

    fixture.detectChanges();

    router.initialNavigation();

    // showsNavElement = fixture.debugElement.queryAll(By.css('.show-link'));
    // showsNavElement[0].triggerEventHandler('click', null);

    count++;
  });

  it(`should ${count} create show comp instance`, () => {
    console.log(`<<<<< SPEC SHOW COMP: should ${count} >>>>>>>>`);
    expect(comp).toBeTruthy();
  });

  it(`should ${count} navigate to first show i.e comedy-show`, fakeAsync(() => {
    console.log(`<<<<< SPEC SHOW COMP: should ${count} >>>>>>>>`);
    router.navigate(['shows', 'comedy-show']);
    tick();
    fixture.detectChanges();
    console.log('SPEC SHOW COMP LOCATION PATH: navigate ', location.path());

    expect(location.path()).toBe('/shows/comedy-show');
  }));

  it(`should ${count} get default seats from service and not be null or empty`, () => {
    console.log(`<<<<< SPEC SHOW COMP: should ${count} >>>>>>>>`);
    let defaultSeats = cs.getDefaultSeats();
    // console.log('SHOW COMP: Default Seats ', defaultSeats);
    expect(defaultSeats).not.toBeUndefined();
  });

  it(`should ${count} have show name transformed without hypen character`, () => {
    console.log(`<<<<< SPEC SHOW COMP: should ${count} >>>>>>>>`);
    comp.defaultSeats = cs.getDefaultSeats();
    comp.selectedShowName = "comedy-show";
    let showName = hypenPipe.transform(comp.selectedShowName, 'remove');
    expect(showName).toEqual("comedy show");
  });

  it(`should ${count} display show-name in h3 tag on screen`, () => {
    console.log(`<<<<< SPEC SHOW COMP: should ${count} >>>>>>>>`);
    comp.selectedShowName = "comedy-show";
    fixture.detectChanges();
    titleDebugElement = fixture.debugElement.query(By.css('h3'));
    console.log('SPEC SHOW COMP: ', titleDebugElement.nativeElement);
    expect(titleDebugElement.nativeElement.textContent).toEqual("comedy show");
  });

  // it(`should ${count} subscribe to current show and set to selectedShow variable `, fakeAsync(() => {
  //   cs.currentShowData.subscribe(
  //     show => comp.selectedShow = show
  //   );
  // }));

  it(`should ${count} have child component instance created`, () => {
    console.log(`<<<<< SPEC SHOW COMP: should ${count} >>>>>>>>`);

    ttDebugElement = fixture.debugElement.query(By.css('app-ticket-type'));
    ticketTypeComp = ttDebugElement.componentInstance;

    fixture.detectChanges();

    expect(ticketTypeComp).toBeTruthy();
  });

});
