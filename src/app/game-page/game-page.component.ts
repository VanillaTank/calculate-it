import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Level, View } from '../types';

const RULES: Rules = {
    easy: {
        maxValue: 20,
        signs: ['+', '-']
    },
    middle: {
        maxValue: 20,
        signs: ['+', '-', '*', '/']
    },
    hard: {
        maxValue: 30,
        signs: ['+', '-', '*', '/']
    }
}

@Component({
    selector: 'app-game-page',
    templateUrl: './game-page.component.html',
    styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

    @Input() selectedLevel!: Level;

    @Output() closeClick = new EventEmitter<View>();

    timerId: any;
    timerString: string = '00:00';

    donePercent = 0;
    allQuerisesAmount = 40;
    doneQueriesAmount = 0;
    query: string = '';

    userAnswer = '';
    rightAnswer = '';


    activeRule: Rule = RULES.middle;
    rightAnswerCount = 0;

    private timer: number = 0;


    constructor() {
        // this.startTimer(); // TODO recomment it
    }

    ngOnInit(): void {
        if (this.selectedLevel) {
            this.activeRule = RULES[this.selectedLevel as keyof Rules];
        }
        this.createQuery();
    }

    startTimer() {
        this.timerId = setInterval(() => {
            this.timer++;
            if (this.timer < 60) {
                this.timerString = this.timer > 9 ? `00:${this.timer}` : `00:0${this.timer}`;
            } else {
                const min = Math.trunc(this.timer / 60) > 9 ? Math.trunc(this.timer / 60) : `0${Math.trunc(this.timer / 60)}`;
                const sec = this.timer % 60 > 9 ? this.timer % 60 : `0${this.timer % 60}`;
                this.timerString = `${min}:${sec}`;
            }
        }, 1000);
    }

    onCloseClick() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
        this.query = '';
        this.doneQueriesAmount = 0;
        this.closeClick.emit('start');
    }

    setDonePercent() {
        this.donePercent = 100 * this.doneQueriesAmount / this.allQuerisesAmount;
    }

    onNextBtnClick() {
        if (this.donePercent < 100) {
            ++this.doneQueriesAmount;
            this.setDonePercent();

            if (this.userAnswer == this.rightAnswer) {
                ++this.rightAnswerCount;
            }
            this.userAnswer = '';
            this.createQuery();
            return;
        }

        if (this.timerId) {
            clearInterval(this.timerId);
        }
        this.doneQueriesAmount = 0;
        this.setDonePercent();

        // передать р-т в result через родителя
        // this.closeClick.emit('start');
    }

    createQuery() {

        const randomSign = this.activeRule.signs[Math.floor(Math.random() * this.activeRule.signs.length)];

        if (randomSign === '+') {
            let a = Math.floor(Math.random() * this.activeRule.maxValue);
            let b = Math.floor(Math.random() * this.activeRule.maxValue);
            this.rightAnswer = (a + b).toString();
            this.query = `${a}+${b}`
        } else if (randomSign === '-') {
            let a = Math.floor(Math.random() * this.activeRule.maxValue);
            let b = Math.floor(Math.random() * this.activeRule.maxValue);
            while (a < b) {
                a = Math.floor(Math.random() * this.activeRule.maxValue);
                b = Math.floor(Math.random() * this.activeRule.maxValue);
            }
            this.rightAnswer = (a - b).toString();
            this.query = `${a}-${b}`
        } else if (randomSign === '*') {

        } else {

        }
    }

    inputHandler($event: any) {
        // TODO обработка ввода. Принимаем только цифры
    }
}

interface Rule {
    maxValue: number;
    signs: string[]
}

interface Rules {
    easy: Rule;
    middle: Rule;
    hard: Rule;
}