import { Component } from '@angular/core';
import { View, Level } from './types';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'calculate It';

    view: View;

    selectedLevel!: Level;

    constructor() {
        this.view = 'start';
        this.getSelectedLevel();
        this.pointAutors();
    }

    // --- Работа с выбором уровня
    getSelectedLevel() {    
        this.selectedLevel = localStorage.getItem('level') as Level ?? 'easy';
        console.log(this.selectedLevel);
    }

    setSelectedLevel(level: Level) {
        this.selectedLevel = level;
        localStorage.setItem('level', this.selectedLevel);
    }
    // --- Конец - Работа с выбором уровня

    setView(view: View ) {
        this.view = view;
    }

    pointAutors() {
        console.log('Background image was designed by Vectorium / Freepik - http://www.freepik.com');
        console.log('Logo was created by SnakeEdit - https://www.deviantart.com/thesnakeedit');
    }
}
