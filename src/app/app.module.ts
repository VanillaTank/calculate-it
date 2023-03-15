import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StartPageComponent } from './start-page/start-page.component';
import { GamePageComponent } from './game-page/game-page.component';
import { ResultPageComponent } from './result-page/result-page.component';
import { LastResultsPageComponent } from './last-results-page/last-results-page.component';
import { SelectLevelPageComponent } from './select-level-page/select-level-page.component';
import { CloseComponent } from './part/close/close.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    GamePageComponent,
    ResultPageComponent,
    LastResultsPageComponent,
    SelectLevelPageComponent,
    CloseComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
