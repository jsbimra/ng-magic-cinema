import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ShowComponent } from '../show.component';
import { HypenTransformPipe } from '../../../hypen-transform.pipe';
import { TicketTypeComponent } from './ticket-type.component';
import { CinemaService } from 'src/app/services/cinema.service';

describe('TicketTypeComponent', () => {
  let comp: TicketTypeComponent;
  let fixture: ComponentFixture<TicketTypeComponent>;
  let cs: CinemaService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TicketTypeComponent,
        ShowComponent,
        HypenTransformPipe],
      imports: [RouterTestingModule],
      providers: [CinemaService]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketTypeComponent);
    comp = fixture.componentInstance;
    cs = fixture.debugElement.injector.get(CinemaService);

    fixture.detectChanges();
  });

  it('should create', () => {
    
    expect(comp).toBeTruthy();
  });
});
