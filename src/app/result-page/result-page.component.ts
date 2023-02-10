import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ALL_QUERIES_AMOUNT } from '../config';
import { View, Result } from '../types';

@Component({
    selector: 'app-result-page',
    templateUrl: './result-page.component.html',
    styleUrls: ['./result-page.component.css']
})
export class ResultPageComponent {

    @Input() result: Result | undefined;

    @Output() menuClick = new EventEmitter<View>();

    allQuerisesAmount = ALL_QUERIES_AMOUNT;

    constructor() { }

    onMenuClick() {
        this.menuClick.emit('start');
    }

    convertTime(time: number | undefined): string {
        if(!time) {
            return '';
        }
        
        if (time < 60) {
            return `${time}s`;
        } else {
            const min = Math.trunc(time / 60);
            const sec = time % 60;
            return `${min}min${sec > 0 ? ` ${sec}sec` : ''}`;
        }
    }
}
