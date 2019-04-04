
import { Routes } from '@angular/router';

import { ShowComponent } from './shows/show/show.component';
import { ShowsComponent } from './shows/shows.component';
import { OwnerComponent } from './owner/owner.component';
import { TicketBookedComponent } from './shows/show/ticket-booked/ticket-booked.component';

export const routes: Routes = [
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
        path: '',
        pathMatch: 'full',
        redirectTo: 'shows',
    },
    {
        path: '**',
        redirectTo: 'shows'
    },
];