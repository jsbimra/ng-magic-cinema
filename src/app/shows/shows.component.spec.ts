import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { ShowsComponent } from './shows.component';
import { HypenTransformPipe } from './../hypen-transform.pipe';
import { ShowComponent } from '../shows/show/show.component';
import { OwnerComponent } from '../owner/owner.component';
import { TicketBookedComponent } from '../shows/show/ticket-booked/ticket-booked.component';
import { routes } from '../app.routes';

describe('ShowsComponent', () => {
  let component: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;
  let hypenCasePipe: HypenTransformPipe;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowsComponent,
        ShowComponent,
        TicketBookedComponent,
        OwnerComponent,
        HypenTransformPipe],
      imports: [RouterTestingModule.withRoutes(routes)]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    router.initialNavigation();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ShowsComponent);
    hypenCasePipe = new HypenTransformPipe();
    fixture.detectChanges();
  });
  // it('should create the shows component', () => {
  //   component = fixture.componentInstance;
  //   expect(component).toBeTruthy();
  // });
});
