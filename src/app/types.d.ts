export type View = 'start' | 'last-results' | 'select-level' | 'game' | 'result';
export type Level = 'easy' | 'middle' | 'hard';
export interface Result {
    time: number;
    score: number;
    date: string;
    level: Level;
    errors? : string[];
}
