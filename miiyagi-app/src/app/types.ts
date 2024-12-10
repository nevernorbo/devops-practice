// the Exercise interface defined for the redux toolkit entity adapter
export interface Exercise {
    id: number;
    date: string;
    order: number;
    name: string;
    sets?: number;
    repetitions?: number;
}
