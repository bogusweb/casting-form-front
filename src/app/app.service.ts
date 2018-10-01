import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {Observable} from "rxjs";
import {CastingCategory} from "./interfaces";
import { environment } from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    private http: HttpClient
  ) { }

  getCastingCategories(): Observable<CastingCategory[]> {
    return this.http.get(environment.apiUrl + 'casting_categories').pipe(
      map( (res) => {
        return res['hydra:member'].map( category => {
          return {
            id: category.id,
            title: category.title
          }
        });
      })
    )
  }

  postCastingForm(data): Observable<any> {
    return this.http.post(environment.apiUrl + 'casting_forms', data, httpOptions);
  }
}
