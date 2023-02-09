import { Component, Output, EventEmitter } from '@angular/core';
import { View } from '../types';

@Component({
    selector: 'app-start-page',
    templateUrl: './start-page.component.html',
    styleUrls: ['./start-page.component.css']
})
export class StartPageComponent {

    @Output()
    menuBtnClick = new EventEmitter<View>();

    constructor() { }

    onMenuBtnClick(view: View) {
        this.menuBtnClick.emit(view);
    }


}
