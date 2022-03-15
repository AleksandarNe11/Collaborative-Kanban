import { Card } from './pages/board-page/cards';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardsServiceService {

  baseURL = 'http://localhost/api'; 

  constructor(private http: HttpClient) { }

  getAll(BoardID: number) { 
    return this.http.get(`${this.baseURL}/list/${BoardID}`)
      .pipe(
        map((res: any) => { 
          return res['data'];
        })
      )
  }

  addCard(card: Card) { 
    return this.http.post(`${this.baseURL}/addCard`, {data: card}).pipe(
      map((res: any) => { 
        return res['data'];
      })
    )
  }



  
  


}
