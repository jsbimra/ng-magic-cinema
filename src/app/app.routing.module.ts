import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { ShowComponent } from './shows/show/show.component';
import { ShowsComponent } from './shows/shows.component';
import { OwnerComponent } from './owner/owner.component';
import { TicketBookedComponent } from './shows/show/ticket-booked/ticket-booked.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'shows',
        pathMatch: 'full',
    },
    {
        path: 'shows',
        component: ShowsComponent,
    },
    {
        path: 'shows/:id',
        component: ShowComponent,
    },
    {
        path: 'owner',
        component: OwnerComponent,
    },
    {
        path: 'ticket-booked',
        component: TicketBookedComponent,
    },
    {
        path: '**',
        redirectTo: 'shows'
    },
]


@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}