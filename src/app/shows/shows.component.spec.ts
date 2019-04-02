import { async, ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { ShowsComponent } from './shows.component';
import { HypenTransformPipe } from './../hypen-transform.pipe';
import { CinemaService } from '../services/cinema.service';
import { routes } from '../app.routes';
import { ShowComponent } from './show/show.component';
import { TicketBookedComponent } from './show/ticket-booked/ticket-booked.component';
import { OwnerComponent } from '../owner/owner.component';
import { TicketTypeComponent } from './show/ticket-type/ticket-type.component';

describe('ShowsComponent', () => {
  let component: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;
  let hypenCasePipe: HypenTransformPipe;
  let cinemaService: CinemaService;
  let showListAnchorDebugElement: DebugElement[];
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowsComponent,
        ShowComponent,
        TicketBookedComponent,
        OwnerComponent,
        TicketTypeComponent,
        HypenTransformPipe],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [CinemaService]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ShowsComponent);
    component = fixture.componentInstance;
    hypenCasePipe = new HypenTransformPipe();

    //using parent TestBed injector
    // cinemaService = TestBed.get(CinemaService);
    //uses injector on fixture
    cinemaService = fixture.debugElement.injector.get(CinemaService);

    fixture.detectChanges();

    showListAnchorDebugElement = fixture.debugElement.queryAll(By.css('.show-link'));

  });

  it('should create the shows component', () => {
    expect(component).toBeTruthy();
  });

  it('should cinemaService injected via inject() and via testBed.get() both the instance should be matched', () => {

    //Injected service via inject method of angular testing and this is dependency injection syntax like angular 1
    inject([CinemaService], (injectCinemaService: CinemaService) => {
      expect(cinemaService).toBe(injectCinemaService);
    });
    // also we could turn inject method to angular @Inject decorator just syntax is different
    // @Inject((injectCinemaService: CinemaService) => {
    //   expect(cinemaService).toBe(injectCinemaService);
    // }
  });

  it('should get all the shows and not to be null from service using getAllShows method ', () => {
    let shows = cinemaService.getAllShows();
    console.log(shows);
    expect(shows).not.toBeNull();
  });

  it('should display all shows names in .show-list a elment matching with each shows array value', () => {
    let shows = cinemaService.getAllShows();
    showListAnchorDebugElement.map((ele, idx) => {
      expect(ele.nativeElement.textContent).toContain(shows[idx].name);
    })
  });

  it('should .show-list a href value should have tranformed value against each show name', () => {
    let shows = cinemaService.getAllShows();
    let pipe = new HypenTransformPipe();
    showListAnchorDebugElement.map((ele, idx) => {
      // console.log('ele.nativeElement.href ', ele.nativeElement.href);
      let transformValue = pipe.transform(shows[idx].name);
      // console.log('transformValue ', transformValue);
      expect(ele.nativeElement.href).toContain(transformValue);
    })
  });

  it('it should redirect to specific routes dynamically on shows-list link element clicked', fakeAsync(() => {
    let shows = cinemaService.getAllShows();
    let pipe = new HypenTransformPipe();

    //With single element expect
    // let firstLink = fixture.debugElement.query(By.css('.show-link')).nativeElement;
    // firstLink.click();
    //  //We wait for all pending promises to be resolved.
    // tick();
    // console.log('FINAL: location.path() EXPECT ', location.path());
    // expect(location.path()).toBe(`/shows/${transformValue}`);

    //with list of element expect
    showListAnchorDebugElement.map((ele, idx) => {
      let transformValue = pipe.transform(shows[idx].name);
      // console.log('transformValue before AWAIT ', transformValue);
      ele.nativeElement.click();
      tick();
      console.log('FINAL: location.path() EXPECT ', location.path());
      expect(location.path()).toBe(`/shows/${transformValue}`);
    });

  }));

});
