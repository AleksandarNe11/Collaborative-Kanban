import { Card } from './pages/board-page/cards';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsServiceService {

   baseURL = 'http://localhost:88/api'; 


  constructor(private http: HttpClient) { }

  getAll(BoardID: number) { 

     // return this.http.get(`${this.baseURL}/list.php`)
    return this.http.post(`${this.baseURL}/list.php`, {data: BoardID})
      .pipe(
        map((res: any) => { 
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

  update(card: Card) {
    return this.http.put(`${this.baseURL}/update.php`, { data: card });
  }

  delete(CardID: number) {
    const params = new HttpParams()
      .set('id', CardID.toString());
  
    return this.http.delete(`${this.baseURL}/delete.php`, { params: params });
  }

}
