import { Chart } from 'chart.js/auto'

enum ChartType {
    PIE = "pie",
    BAR = "bar",
    RADAR = "radar"
}

abstract class ChartBuilder {
    readonly options = {
        responsive: true,

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

    private chart;
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
                            data: labels.map(row => this.getRandom()),
                            borderRadius: 10
                        }
                    ]
                },
                options: this.options
            }
        )

        setInterval(this.updateChart, 1000)
    }

    getRandom(): number {
        return Math.random() * 100;
    }

    private updateChart() {
        this.chart.data.datasets[0].data = this.labels.map(() => this.getRandom());
        this.chart.update();
    }
}


export class Bar extends ChartBuilder {


    private data = [
        { skill: "Typescript", count: this.getRandom() },
        { skill: "Prometheus", count: this.getRandom() },
        { skill: "Java", count: this.getRandom() },
        { skill: "Springboot", count: this.getRandom() },
        { skill: "Grafana", count: this.getRandom() },
        { skill: "PromQL", count: this.getRandom() },
        { skill: 2016, count: this.getRandom() },
    ];

    constructor(){
        super(ChartType.BAR, ["Typescript", "Prometheus", "Java"]);
    }

}