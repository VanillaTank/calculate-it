import { Component, Output, EventEmitter } from '@angular/core';
import { View } from '../types';
import {ALL_QUERIES_AMOUNT} from '../config';

@Component({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

    @Output() menuBtnClick = new EventEmitter<View>();

    allQuerisesAmount = ALL_QUERIES_AMOUNT;

    constructor() { }

    onMenuBtnClick(view: View) {
        this.menuBtnClick.emit(view);
    }


}
