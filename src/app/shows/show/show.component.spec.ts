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
import { Show } from 'src/app/shared/show.model';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ShowComponent', () => {
  let comp: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;
  let router: Router;
  let location: Location;
  let hypenPipe: HypenTransformPipe;
  let cs: CinemaService;
  let titleDebugElement: DebugElement;
  let showsNavElement: DebugElement[];

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
      imports: [RouterTestingModule.withRoutes(routes)]
    });
    router = TestBed.get(Router);
    location = TestBed.get(Location);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    comp = fixture.componentInstance;
    hypenPipe = new HypenTransformPipe();
    cs = fixture.debugElement.injector.get(CinemaService);

    fixture.detectChanges();

    router.initialNavigation();

    // showsNavElement = fixture.debugElement.queryAll(By.css('.show-link'));
    // showsNavElement[0].triggerEventHandler('click', null);
  });

  it('should create show comp instance', () => {
    console.log('<<<<< SPEC SHOW COMP: should 1 >>>>>>>>');
    expect(comp).toBeTruthy();
  });

  it('should navigate to first show i.e comedy-show', fakeAsync(() => {
    console.log('<<<<< SPEC SHOW COMP: should 2 >>>>>>>>');
    router.navigate(['shows', 'comedy-show']);
    tick();
    fixture.detectChanges();
    console.log('SPEC SHOW COMP LOCATION PATH: navigate ', location.path());

    expect(location.path()).toBe('/shows/comedy-show');
  }));

  it('should get default seats from service and not be null or empty', () => {
    console.log('<<<<< SPEC SHOW COMP: should 3 >>>>>>>>');
    let defaultSeats = cs.getDefaultSeats();
    console.log('SHOW COMP: Default Seats ', defaultSeats);
    expect(defaultSeats).not.toBeUndefined();
  });
  
  it('should have show name transformed without hypen character', () => {
    console.log('<<<<< SPEC SHOW COMP: should 4 >>>>>>>>');
    comp.selectedShowName = "comedy-show";
    let showName = hypenPipe.transform(comp.selectedShowName, 'remove');
    expect(showName).toEqual("comedy show");
  });

  it('should display show-name in h3 tag on screen', () => {
    console.log('<<<<< SPEC SHOW COMP: should 5 >>>>>>>>');
    comp.selectedShowName = "comedy-show";
    fixture.detectChanges();
    titleDebugElement = fixture.debugElement.query(By.css('h3'));
    console.log('SPEC SHOW COMP: ', titleDebugElement.nativeElement);
    expect(titleDebugElement.nativeElement.textContent).toEqual("comedy show");
  });

  it('should subscribe to current show and set to selectedShow variable ', fakeAsync(() => {
    cs.currentShowData.subscribe(
      show => comp.selectedShow = show
    );
  }));

});
