import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShowsComponent } from './shows/shows.component';
import { ShowComponent } from './shows/show/show.component';
import { AppRoutingModule } from './app.routing.module';
import { HypenTransformPipe } from './hypen-transform.pipe';
import { TicketTypeComponent } from './shows/show/ticket-type/ticket-type.component';
import { OwnerComponent } from './owner/owner.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowsComponent,
    ShowComponent,
    HypenTransformPipe,
    TicketTypeComponent,
    OwnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
