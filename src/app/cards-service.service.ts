import { Card } from './pages/board-page/cards';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsServiceService {

  baseURL = 'http://localhost:88/476_php'; 

  constructor(private http: HttpClient) { }

  getAll(BoardID: number) { 
    // return this.http.get(`${this.baseURL}/list/${BoardID}`)
    console.log(`${this.baseURL}/list.php`);
    return this.http.get(`${this.baseURL}/list.php`)
      .pipe(
        map((res: any) => { 
          console.log(res['data']);
          return res['data'];
        })
      )
  }

  addCard(card: Card) { 
    return this.http.post(`${this.baseURL}/addCard.php`, {data: card}).pipe(
      map((res: any) => { 
        return res['data'];
      })
    )
  }
}