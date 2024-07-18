import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { GuidanceComponent } from './pages/guidance/guidance.component';
import { CategoriesComponent } from './pages/categories/categories.component';
// import { ModalComponent } from './pages/modal/modal.component';
import { GameComponent } from './pages/game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GuidanceComponent,
    CategoriesComponent,
    GameComponent,
    // ModalComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
