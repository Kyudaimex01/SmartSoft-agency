import { Routes } from '@angular/router';
import { AddPlaceComponent } from './components/add-place/add-place.component';
import { EditPlaceComponent } from './components/edit-place/edit-place.component';
import { ListPlaceComponent } from './components/list-place/list-place.component';

import { AddRatingComponent } from './components/add-rating/add-rating.component';
import { EditRatingComponent } from './components/edit-rating/edit-rating.component';
import { ListRatingComponent } from './components/list-rating/list-rating.component';

import { AddTuristaComponent } from './components/add-turista/add-turista.component';
import { EditTuristaComponent } from './components/edit-turista/edit-turista.component';
import { ListTuristaComponent } from './components/list-turista/list-turista.component';

import { HomeAppComponent } from './components/home-app/home-app.component';

export const ROUTES: Routes = [
    { path: 'add-place', component: AddPlaceComponent },
    { path: 'edit-place', component: EditPlaceComponent },
    { path: 'list-place', component: ListPlaceComponent },
    { path: 'add-rating', component: AddRatingComponent },
    { path: 'edit-rating', component: EditRatingComponent },
    { path: 'list-rating', component: ListRatingComponent },
    { path: 'add-turista', component: AddTuristaComponent },
    { path: 'edit-turista', component: EditTuristaComponent },
    { path: 'list-turista', component: ListTuristaComponent },
    { path: 'list-turista', component: ListTuristaComponent },
    { path: 'home-app', component: HomeAppComponent },
    { path: '', pathMatch: 'full', redirectTo: 'list-rating' },
    { path: '**', pathMatch: 'full', redirectTo: 'list-rating' }
];
