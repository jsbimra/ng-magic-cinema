import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketBookedComponent } from './ticket-booked.component';
import { HypenTransformPipe } from '../../../hypen-transform.pipe';
import { TicketTypeComponent } from '../ticket-type/ticket-type.component';
import { ShowComponent } from '../show.component';

describe('TicketBookedComponent', () => {
  let component: TicketBookedComponent;
  let fixture: ComponentFixture<TicketBookedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        TicketBookedComponent,
        ShowComponent,
        HypenTransformPipe,
        TicketTypeComponent,
      ],
      imports: [RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
