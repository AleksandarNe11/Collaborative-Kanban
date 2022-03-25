import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:80/api'; 

  getBoardID(BoardName: string) { 
    // return this.http.get(`${this.baseURL}/list/${BoardID}`)

    return this.http.get(`${this.baseURL}/list.php`)

      .pipe(
        map((res: any) => { 
          return res['data'];
        })
      )
  }
}
