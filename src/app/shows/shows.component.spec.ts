import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShowsComponent } from './shows.component';
import { HypenTransformPipe } from './../hypen-transform.pipe';

describe('ShowsComponent', () => {
  let component: ShowsComponent;
  let fixture: ComponentFixture<ShowsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ShowsComponent, 
        HypenTransformPipe],
        imports: [RouterTestingModule]
    });
  }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ShowsComponent);
  //   fixture.detectChanges();
  // });

  // it('should create the app', () => {
    
  //   fixture = TestBed.createComponent(ShowsComponent);
  //   let app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });
});
