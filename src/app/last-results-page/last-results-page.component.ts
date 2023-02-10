import { Component, EventEmitter, Output } from '@angular/core';
import { View, Result } from '../types';
import { ALL_QUERIES_AMOUNT, LAST_RESULT_KEY } from '../config';

@Component({
    selector: 'app-last-results-page',
    templateUrl: './last-results-page.component.html',
    styleUrls: ['./last-results-page.component.css']
})
export class LastResultsPageComponent {

    @Output() closeClick = new EventEmitter<View>();

    allQuerisesAmount = ALL_QUERIES_AMOUNT;
    data: Result[];

    constructor() {
        this.data = JSON.parse(localStorage.getItem(LAST_RESULT_KEY) as string) || [];
    }

    onCloseClick() {
        this.closeClick.emit('start');
    }

    convertTime(time: number): string {
        if (time < 60) {
            return `${time}s`;
        } else {
            const min = Math.trunc(time / 60);
            const sec = time % 60;
            return `${min}min${sec > 0 ? ` ${sec}sec` : ''}`;
        }
    }
}
