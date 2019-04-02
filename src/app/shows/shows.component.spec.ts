import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ShowsComponent } from './shows.component';
import { HypenTransformPipe } from './../hypen-transform.pipe';
import { CinemaService } from '../services/cinema.service';
import { routes } from '../app.routes';

describe('ShowsComponent', () => {
  let component: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;
  let hypenCasePipe: HypenTransformPipe;
  let cinemaService: CinemaService;
  let showListAnchorDebugElement: DebugElement[]; 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShowsComponent,
        HypenTransformPipe],
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [CinemaService]
    });

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

    showListAnchorDebugElement = fixture.debugElement.queryAll(By.css('.shows-list a'));

  });

  it('should create the shows component', () => {
    expect(component).toBeTruthy();
  });

  it('should cinemaService injected via inject() and via testBed.get() both the instance should be matched', ()=>{
    
    //Injected service via inject method of angular testing and this is dependency injection syntax like angular 1
    inject([CinemaService], (injectCinemaService: CinemaService) => {
      expect(cinemaService).toBe(injectCinemaService);
    });
    // also we could turn inject method to angular @Inject decorator just syntax is different
    // @Inject((injectCinemaService: CinemaService) => {
    //   expect(cinemaService).toBe(injectCinemaService);
    // }
  });

  it('should get all the shows and not to be null from service using getAllShows method ', ()=> {
    let shows = cinemaService.getAllShows();
    console.log(shows);
    expect(shows).not.toBeNull();
  });

  it('should display all shows names in .show-list a elment matching with each shows array value', () => {
    let shows = cinemaService.getAllShows();
    showListAnchorDebugElement.map((ele, idx) => {
      console.log(ele.nativeElement)
      expect(ele.nativeElement.textContent).toContain(shows[idx].name);
    })
  });

  it('should .show-list a href value should have tranformed value against each show name', () => {
    let shows = cinemaService.getAllShows();
    let pipe = new HypenTransformPipe();
    showListAnchorDebugElement.map((ele, idx) => {
      console.log('ele.nativeElement.href ', ele.nativeElement.href);
      let transformValue = pipe.transform(shows[idx].name);
      console.log('transformValue ', transformValue);
      expect(ele.nativeElement.href).toContain(transformValue);
    })
  });



});
