import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarRatingModule } from 'ngx-bar-rating';

import { HttpClientModule } from '@angular/common/http';
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

// Importar rutas
import { ROUTES } from './app.routes';
import { RouterModule } from '@angular/router';

// Importar ReactiveFormsModule para los formularios
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddPlaceComponent,
    EditPlaceComponent,
    ListPlaceComponent,
    AddRatingComponent,
    EditRatingComponent,
    ListRatingComponent,
    AddTuristaComponent,
    EditTuristaComponent,
    ListTuristaComponent,
    HomeAppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot( ROUTES, { useHash: true } ),
    ReactiveFormsModule,
    BarRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
