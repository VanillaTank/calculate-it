import { Component } from '@angular/core';
import { View, Level, Result } from './types';
import {LAST_RESULT_KEY, LEVEL_KEY, ALL_QUERIES_AMOUNT} from './config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'calculate It';
    result: Result | undefined;
    view: View;
    allQuerisesAmount = ALL_QUERIES_AMOUNT;
    selectedLevel!: Level;

    constructor() {
        this.view = 'start';
        this.getSelectedLevel();
        this.pointAutors();
    }

    // --- Работа с выбором уровня
    getSelectedLevel() {
        this.selectedLevel = localStorage.getItem(LEVEL_KEY) as Level ?? 'easy';
    }

    setSelectedLevel(level: Level) {
        this.selectedLevel = level;
        localStorage.setItem(LEVEL_KEY, this.selectedLevel);
    }
    // --- Конец - Работа с выбором уровня

    setView(view: View) {
        this.view = view;
    }

    pointAutors() {
        console.log('Background image was designed by Vectorium / Freepik - http://www.freepik.com');
        console.log('Logo was created by SnakeEdit - https://www.deviantart.com/thesnakeedit');
    }

    onTraningEnd($event: Result) {
        this.result = $event;
        const res: Result[] | [] = JSON.parse(localStorage.getItem(LAST_RESULT_KEY) as string) || [];
        const resultToSave: Result = {
            time: this.result.time,
            score: `${this.result.score}/${this.allQuerisesAmount}`,
            date: this.result.date,
            level: this.result.level,
        }
        res.unshift(resultToSave as never);
        localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(res));
    }
}
