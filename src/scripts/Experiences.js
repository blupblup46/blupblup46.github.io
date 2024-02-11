export class ExperiencesLoader {
    constructor() {
        this.indexOfExperience = 0;
        this.main = document.querySelector("main");
        this.experiences = null;
        this.build();
    }
    build() {
        this.load().then(experiences => {
            console.log(experiences);
        });
    }
    async load() {
        return fetch("/scripts/experiences.json")
            .then(response => response.json());
    }
}
