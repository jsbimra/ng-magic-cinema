import { async, ComponentFixture, TestBed, inject, fakeAsync, tick, flush } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';

//Routes first?
import { routes } from '../app.routes';

import { ShowsComponent } from './shows.component';
import { HypenTransformPipe } from './../hypen-transform.pipe';
import { CinemaService } from '../services/cinema.service';
import { ShowComponent } from './show/show.component';
import { TicketBookedComponent } from './show/ticket-booked/ticket-booked.component';
import { OwnerComponent } from '../owner/owner.component';
import { TicketTypeComponent } from './show/ticket-type/ticket-type.component';

describe('ShowsComponent', () => {
  let comp: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;
  let hypenCasePipe: HypenTransformPipe;
  let cs: CinemaService;
  let showListAnchorDebugElement: DebugElement[];
  let router: Router;
  let location: Location;
  let navigateSpy: any;

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
    fixture = TestBed.createComponent(ShowsComponent);
    comp = fixture.componentInstance;
    hypenCasePipe = new HypenTransformPipe();

    //using injector on fixture
    cs = fixture.debugElement.injector.get(CinemaService);

    fixture.detectChanges();

    //initialize routing
    router.initialNavigation();

    showListAnchorDebugElement = fixture.debugElement.queryAll(By.css('.show-link'));

  });

  it(`should create the compoonent`, () => {

    console.log(router.url);
    expect(comp).toBeTruthy();
  });

  it('should create the shows comp', fakeAsync(() => {
    // router.navigate(['']);
    // tick();
    console.log('SHOWS COMP: LOCATION: ', location.path());
    comp.shows = cs.getAllShows();
    console.log('SHOWS COMP: ALL SHOWS: ', comp.shows.length);

    expect(comp).toBeTruthy();
  }));

  it('should cs injected via inject() and via testBed.get() both the instance should be matched', () => {

    //Injected service via inject method of angular testing and this is dependency injection syntax like angular 1
    inject([CinemaService], (injectCinemaService: CinemaService) => {
      expect(cs).toBe(injectCinemaService);
    });
    // also we could turn inject method to angular @Inject decorator just syntax is different
    // @Inject((injectCinemaService: CinemaService) => {
    //   expect(cs).toBe(injectCinemaService);
    // }
  });

  it('should get all the shows and not to be null from service using getAllShows method ', () => {
    let shows = cs.getAllShows();
    expect(shows).not.toBeNull();
  });

  it('should display all shows names in .show-list a elment matching with each shows array value', () => {
    let shows = cs.getAllShows();
    showListAnchorDebugElement.map((ele, idx) => {
      expect(ele.nativeElement.textContent).toContain(shows[idx].name);
    })
  });

  it('should .show-list a href value should have tranformed value against each show name', () => {
    let shows = cs.getAllShows();
    let pipe = new HypenTransformPipe();
    showListAnchorDebugElement.map((ele, idx) => {
      // console.log('ele.nativeElement.href ', ele.nativeElement.href);
      let transformValue = pipe.transform(shows[idx].name);
      // console.log('transformValue ', transformValue);
      expect(ele.nativeElement.href).toContain(transformValue);
    })
  });

  it('should render routes properly on screen ', fakeAsync(() => {
    let shows = cs.getAllShows();
    let pipe = new HypenTransformPipe();

    //With single element expect
    // let firstLink = fixture.debugElement.query(By.css('.show-link')).nativeElement;
    // firstLink.click();
    //  //We wait for all pending promises to be resolved.
    // tick();
    // console.log('FINAL: location.path() EXPECT ', location.path());
    // expect(location.path()).toBe(`/shows/${transformValue}`);

    // console.log('SHOWS COMP: LOCATION: ', location.path());
    // console.log('SHOWS COMP: ROUTER: ', router.url);
    // console.info('showListAnchorDebugElement data', showListAnchorDebugElement.length);

    //with list of element expect
    showListAnchorDebugElement.map((ele, idx) => {
      let transformValue = pipe.transform(shows[idx].name);
      // console.log('transformValue before AWAIT ', transformValue);
      // console.log('ele.nativeElement.textContent ', ele.attributes);
      let href = ele.attributes['ng-reflect-router-link'];
      expect(href).toEqual(`${transformValue}`);
    });
  })); //this it block end

});
