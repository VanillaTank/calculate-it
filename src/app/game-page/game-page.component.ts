import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Level, View, Result } from '../types';
import {ALL_QUERIES_AMOUNT} from '../config';
 
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
export class GamePageComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('userInput') userInput!: ElementRef;

    @Input() selectedLevel!: Level;

    @Output() closeClick = new EventEmitter<View>();
    @Output() traningEnd = new EventEmitter<Result>();

    timerId: any;
    timerString: string = '00:00';

    donePercent = 0;
    allQuerisesAmount = ALL_QUERIES_AMOUNT;
    doneQueriesAmount = 0;
    query: string = '';

    userAnswer = '';
    rightAnswer = '';
    userErrors: string[] = [];

    activeRule: Rule = RULES.middle;
    rightAnswerCount = 0;

    private timer: number = 0;


    constructor() {}

    ngOnInit(): void {
        if (this.selectedLevel) {
            this.activeRule = RULES[this.selectedLevel as keyof Rules];
        }
        this.createQuery();
        this.startTimer();
    }


    ngAfterViewInit() {
        this.userInput?.nativeElement.focus();
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

    isEmptyValue() {
        if(this.userAnswer === null || this.userAnswer === undefined || this.userAnswer.toString().trim() === '') {
            return true;
        }
        return false;
    }

    onNextBtnClick() {
        
        if(this.isEmptyValue()) {
            return;
        }

        if (this.donePercent < 100) {
            ++this.doneQueriesAmount;
            this.setDonePercent();

            if (this.userAnswer == this.rightAnswer) {
                ++this.rightAnswerCount;
            } else {
                this.userErrors.push(`${this.query}=${this.userAnswer}`);
            }
            this.userAnswer = '';
            this.createQuery();
            this.userInput?.nativeElement.focus();
            return;
        }

        if (this.timerId) {
            clearInterval(this.timerId);
        }
        this.doneQueriesAmount = 0;
        this.setDonePercent();

        this.traningEnd.emit({
            time: this.timer,
            score: this.rightAnswerCount,
            date: this.getDateSting(),
            level: this.selectedLevel,
            errors: this.userErrors,
        });
        this.closeClick.emit('result');
        this.rightAnswerCount = 0;
    }

    private getDateSting(): string {
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear().toString().slice(2);
        const hours = date.getHours() > 9 ? date.getHours() : '0'+date.getHours();
        const min = date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes();
        return `${day}/${month}/${year} ${hours}:${min}`;
    }

    createQuery() {

        const randomSign = this.activeRule.signs[Math.floor(Math.random() * this.activeRule.signs.length)];

        if (randomSign === '+') {
            let a = Math.floor(Math.random() * this.activeRule.maxValue);
            let b = Math.floor(Math.random() * this.activeRule.maxValue);
            this.rightAnswer = (a + b).toString();
            this.query = `${a}+${b}`
        } 
        else if (randomSign === '-') {
            let a = Math.floor(Math.random() * this.activeRule.maxValue);
            let b = Math.floor(Math.random() * this.activeRule.maxValue);
            while (a < b) {
                a = Math.floor(Math.random() * this.activeRule.maxValue);
                b = Math.floor(Math.random() * this.activeRule.maxValue);
            }
            this.rightAnswer = (a - b).toString();
            this.query = `${a}-${b}`
        } 
        else if (randomSign === '*') {
            let a = Math.floor(Math.random() * this.activeRule.maxValue/2);
            let b = Math.floor(Math.random() * this.activeRule.maxValue/2);
            this.rightAnswer = (a * b).toString();
            this.query = `${a} * ${b}`
        } 
        else {
            // c : a = b
            let a = Math.ceil(Math.random() * this.activeRule.maxValue/2);
            let b = Math.floor(Math.random() * this.activeRule.maxValue/2);
            let c = a * b;
            this.rightAnswer = (b).toString();
            this.query = `${c} : ${a}`
        }
    }
    ngOnDestroy() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
        this.query = '';
        this.doneQueriesAmount = 0;
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