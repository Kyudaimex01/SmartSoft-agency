import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rating } from '../model/rating';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl = 'http://localhost:8080/api/ratings';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ) {
    console.log('Servicio Rating Funcionando');
  }

  getRatings(): Observable<Rating[]> {
    return this.http.get(this.baseUrl).pipe(
      map(data => data as Rating[])
    );
  }

  getRating(id: number): Observable<Rating> {
    return this.http.get<Rating>(`${this.baseUrl}/${id}`);
  }

  createRating(rating: Rating): Observable<Rating> {
    return this.http.post<Rating>(this.baseUrl, rating, {headers: this.httpHeaders});
  }

  updateRating(rating: Rating): Observable<Rating> {
    return this.http.put<Rating>(this.baseUrl, rating, {headers: this.httpHeaders});
  }

  deleteRating(id: number): Observable<Rating> {
    return this.http.delete<Rating>(`${this.baseUrl}/${id}`, {headers: this.httpHeaders});
  }
}
