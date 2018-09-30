import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {CastingCategory} from "./interfaces";

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
    return this.http.get('https://young-plateau-55712.herokuapp.com/api/casting_categories').pipe(
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
}
