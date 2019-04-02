import { TestBed, async, ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { tick } from '@angular/core/src/render3';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { Location } from '@angular/common';
import { ShowsComponent } from './shows/shows.component';
import { ShowComponent } from './shows/show/show.component';
import { OwnerComponent } from './owner/owner.component';
import { TicketBookedComponent } from './shows/show/ticket-booked/ticket-booked.component';
import { HypenTransformPipe } from './hypen-transform.pipe';
import { TicketTypeComponent } from './shows/show/ticket-type/ticket-type.component';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let navDebugElement: DebugElement[];
  let navHTMLELement: HTMLElement;
  let router: Router;
  let location: Location;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ShowsComponent,
        ShowComponent,
        OwnerComponent,
        TicketTypeComponent,
        TicketBookedComponent,
        HypenTransformPipe
      ],
      imports: [RouterTestingModule.withRoutes(routes)]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);
    //initialize routing
    router.initialNavigation();

  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();

    //After detectChanges grap the element or construtor initial values
    navDebugElement = fixture.debugElement.queryAll(By.css('.nav-link.nav-item'));
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TechVerito Cinema'`, () => {
    expect(app.title).toEqual('TechVerito Cinema');
  });

  it(`should have isNavVisible property to be true by default`, () => {
    expect(app.isNavVisible).toBeTruthy();
  });

  // it('navigate to "" redirects to /shows', async(() => {
  //   router.navigate(['/owner']);
  //   // tick(1);
  //   fixture.detectChanges(); // wait to finish all async or promises so call tick function
  //   console.log(location);
  //   expect(location.path()).toBe('/shows');

  // }) ); 
  //failing

  it('navigate to "" redirects to /shows', async () => {
    await fixture.ngZone.run(async () => {
      await router.navigate(['']);
    });
    
    expect(location.path()).toBe('/shows');
  });

  it('navigate to /owner', async () => {
    await fixture.ngZone.run(async () => {
      await router.navigate(['/owner']);
    });
    
    expect(location.path()).toBe('/owner');
  });

  it('should render title in a anchor tag inside h1', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1 a').textContent).toContain('TechVerito Cinema');
  });

  it('should have nav links items matched inside .nav-links.nav-items', () => {
    const nav = ['Shows', 'Owner'];

    navDebugElement.map((ele, idx) => {
      // console.log('debugelement value ', ele.nativeElement);
      expect(ele.nativeElement.textContent).toEqual(nav[idx]);

    });
  });

});
