import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    AppComponent,
    BoardPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    DragDropModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
