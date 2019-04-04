import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShowComponent } from '../show.component';
import { HypenTransformPipe } from '../../../hypen-transform.pipe';
import { TicketTypeComponent } from './ticket-type.component';

describe('TicketTypeComponent', () => {
  let component: TicketTypeComponent;
  let fixture: ComponentFixture<TicketTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TicketTypeComponent,
        ShowComponent,
        HypenTransformPipe],
      imports: [RouterTestingModule]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
