import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';

import { ShowComponent } from './show.component';
import { Show } from '../../shared/show.model';
import { TicketTypeComponent } from './ticket-type/ticket-type.component';
import { HypenTransformPipe } from '../../hypen-transform.pipe';

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ShowComponent, 
        TicketTypeComponent, 
        HypenTransformPipe,
        Show ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
