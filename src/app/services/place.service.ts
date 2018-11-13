import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Place } from '../model/place';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private baseUrl = 'http://localhost:8080/api/places';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ) {
    console.log('Servicio Place Funcionando');
  }

  getPlaces(): Observable<Place[]> {
    return this.http.get(this.baseUrl).pipe(
      map(data => data as Place[])
    );
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.baseUrl}/${id}`);
  }

  createPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(this.baseUrl, place, {headers: this.httpHeaders});
  }

  updatePlace(place: Place): Observable<Place> {
    return this.http.put<Place>(this.baseUrl, place, {headers: this.httpHeaders});
  }

  deletePlace(id: number): Observable<Place> {
    return this.http.delete<Place>(`${this.baseUrl}/${id}`, {headers: this.httpHeaders});
  }
}
