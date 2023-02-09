import { Component, Input, EventEmitter, Output } from '@angular/core';
import  {View, Level} from '../types'

@Component({
    selector: 'app-select-level-page',
    templateUrl: './select-level-page.component.html',
    styleUrls: ['./select-level-page.component.css']
})
export class SelectLevelPageComponent {

    @Input() selectedLevel!: Level;

    @Output() closeClick = new EventEmitter<View>();

    @Output() changeLevel = new EventEmitter<Level>();

    initLevel: Level = this.selectedLevel;

    data: LevelData[] = [
        {
            paragraf1: 'Random numbers from 0 to 20 are generated.',
            paragraf2: 'Addition and subtraction are used.',
            button: { id: 'easy', name: 'Easy' }
        },

        {
            paragraf1: 'Number from 0 to 20.',
            paragraf2: 'Addition, subtraction, multiplication, division.',
            button: { id: 'middle', name: 'Middle' }
        },

        {
            paragraf1: 'Number from 0 to 50.',
            paragraf2: 'Addition, subtraction, multiplication, division.',
            button: { id: 'hard', name: 'Hard' }
        },
    ]

    constructor() { }


    onCloseClick() {
        this.closeClick.emit('start');
        if (this.initLevel !== this.selectedLevel) {
            this.changeLevel.emit(this.selectedLevel);
        }
    }

    onLevelBtnClick(level: Level) {
        this.selectedLevel = level;
    }
}

interface LevelData {
    paragraf1: string;
    paragraf2: string;
    button: {
        id: Level;
        name: string
    }
}