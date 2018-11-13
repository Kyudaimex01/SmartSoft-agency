import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Turista } from '../model/turista';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TuristaService {

  private baseUrl = 'http://localhost:8080/api/turistas';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ) {
    console.log('Servicio Turista Funcionando');
  }

  getTuristas(): Observable<Turista[]> {
    return this.http.get(this.baseUrl).pipe(
      map(data => data as Turista[])
    );
  }

  getTurista(id: number): Observable<Turista> {
    return this.http.get<Turista>(`${this.baseUrl}/${id}`);
  }

  createTurista(turista: Turista): Observable<Turista> {
    return this.http.post<Turista>(this.baseUrl, turista, {headers: this.httpHeaders});
  }

  updateTurista(turista: Turista): Observable<Turista> {
    return this.http.put<Turista>(this.baseUrl, turista, {headers: this.httpHeaders});
  }

  deleteTurista(id: number): Observable<Turista> {
    return this.http.delete<Turista>(`${this.baseUrl}/${id}`, {headers: this.httpHeaders});
  }
}
