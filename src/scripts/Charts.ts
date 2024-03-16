import { Chart } from "chart.js/auto";

enum ChartType {
    PIE = "pie",
    BAR = "bar",
    RADAR = "radar"
}

abstract class ChartBuilder {
    readonly options = {
        responsive: false,

        scales: {
            y: {
                display: false
            }
        },

        plugins: {
            legend: {
                display: false
            }
        }
    }

    chart;
    private labels: string[];


    constructor(chartType: ChartType, labels: string[]) {
        this.labels = labels;
        this.chart = new Chart(
            document.getElementById(chartType) as HTMLCanvasElement,
            {
                type: chartType,
                data: {
                    labels: labels,
                    datasets: [
                        {
                            data: labels.map(() => this.getRandom(100)),
                            borderRadius: 10
                        }
                    ]
                },
                options: this.options
            }
        )

        setInterval(() => {
            this.chart.data.datasets[0].data = this.labels.map(() => this.getRandom(100));
            this.chart.update();
        }, this.getRandom(2000, 1000))
    }

    getRandom(max: number, min: number = 0): number {
        return Math.random() * (max - min) + min;
    }

}


export class Bar extends ChartBuilder {

    constructor() {
        super(ChartType.BAR, ["Typescript", "Prometheus", "Java"]);
    }

}

export class Pie extends ChartBuilder {

    constructor() {
        super(ChartType.PIE, ["Typescript", "Prometheus", "Java"]);
    }

}

export class Radar extends ChartBuilder {

    constructor() {
        super(ChartType.RADAR, ["Typescript", "Prometheus", "Java"]);
    }

}