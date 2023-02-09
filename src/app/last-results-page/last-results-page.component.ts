import { Component, EventEmitter, Output } from '@angular/core';
import { View } from '../types';

@Component({
    selector: 'app-last-results-page',
    templateUrl: './last-results-page.component.html',
    styleUrls: ['./last-results-page.component.css']
})
export class LastResultsPageComponent {

    @Output() closeClick = new EventEmitter<View>();

    // delete it after check
    data = [
        {time: 40, score: '30/30', date: '02/02/23  11:48', level: 'easy'},
        {time: 42, score: '30/30', date: '02/02/23  11:48', level: 'hard'},
        {time: 49, score: '28/30', date: '02/02/23  11:48', level: 'middle'},
        {time: 39, score: '27/30', date: '02/02/23  11:48', level: 'easy'},
        {time: 41, score: '30/30', date: '02/02/23  11:48', level: 'easy'},
        {time: 60, score: '29/30', date: '02/02/23  11:48', level: 'hard'},
        {time: 61, score: '30/30', date: '02/02/23  11:48', level: 'hard'},
        {time: 74, score: '25/30', date: '02/02/23  11:48', level: 'easy'},
    ]

    constructor() { }

    onCloseClick() {
        this.closeClick.emit('start');
    }

    convertTime(time: number): string {
        if( time < 60) {
            return `${time}s`;
        } else {
            const min = Math.trunc(time / 60); 
            const sec = time % 60;
            return `${min}min${sec > 0 ? ` ${sec}sec`: ''}`;
        }
       
    }
}
