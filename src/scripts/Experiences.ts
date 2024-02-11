interface Experience{
    readonly topic: string;
    readonly period:string;
    readonly company:string;
    readonly context: string;
    readonly details: string;
    readonly learned: Learned;
}

<<<<<<< Updated upstream:scripts/Experiences.ts
interface Learned{
    readonly element: string;
    readonly comment: string;
}


export class ExperiencesLoader{
    readonly main: HTMLElement;
    readonly experiences: Experience[]|null;

    indexOfExperience: number = 0;
=======
export class ExperiencesLoader {
    main: HTMLElement;
>>>>>>> Stashed changes:src/scripts/Experiences.ts

    constructor(){
        this.main = document.querySelector("main") as HTMLElement;
        this.experiences = null;
        this.build();
    }

    build(){
        this.load().then(experiences=>{
            console.log(experiences);
        })
    }

    async load() : Promise<Map<string, Experience[]>> {
        return fetch("/scripts/experiences.json")
        .then(response => response.json());
    }
}