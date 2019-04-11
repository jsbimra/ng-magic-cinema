import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgRedux, NgReduxModule } from 'ng2-redux';

import { AppComponent } from './app.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowComponent } from './shows/show/show.component';
import { AppRoutingModule } from './app.routing.module';
import { HypenTransformPipe } from './hypen-transform.pipe';
import { TicketTypeComponent } from './shows/show/ticket-type/ticket-type.component';
import { OwnerComponent } from './owner/owner.component';
import { TicketBookedComponent } from './shows/show/ticket-booked/ticket-booked.component';
import { McAppState, rootReducer } from './store';


@NgModule({
  declarations: [
    AppComponent,
    ShowsComponent,
    ShowComponent,
    HypenTransformPipe,
    TicketTypeComponent,
    OwnerComponent,
    TicketBookedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgReduxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(store: NgRedux<McAppState>) {
    store.configureStore(rootReducer, {});
  }
}
