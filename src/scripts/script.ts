<<<<<<< Updated upstream:scripts/script.ts
// import { ExperiencesLoader } from "./Experiences";
import Chart from '../node_modules/chart.js/auto'
import projects from './project.json';

console.log("ui")
let chart: Chart;

function getRandom() {
  return Math.random() * 100;
}

function generateCanvas() {
  console.log("gen")

  const data = [
    { year: 2010, count: getRandom() },
    { year: 2011, count: getRandom() },
    { year: 2012, count: getRandom() },
    { year: 2013, count: getRandom() },
    { year: 2014, count: getRandom() },
    { year: 2015, count: getRandom() },
    { year: 2016, count: getRandom() },
  ];

  console.log(chart)
  if (chart == null) {
    chart = new Chart(
      document.getElementById('acquisitions') as HTMLCanvasElement,
      {
        type: 'bar',
        data: {
          labels: data.map(row => row.year),
          datasets: [
            {
              data: data.map(row => row.count),
              borderRadius: 10
            }
          ]
        },
        options: {
          responsive: true,
         
          scales: {
            y: {
              display: false
            }
          },

          plugins:{
            legend: {
              display: false
            }
          }
        }
      }
    )
  } else {
    chart.data.datasets.forEach(dataset => {
      dataset.data = data.map(row => row.count);
    });

    chart.update();
  }

}

setInterval(generateCanvas, 1000)
=======
import { Bar } from "./Charts.js";
import { appendChildren, changeImage, createElement, createImgAsButton } from "./DOM.js";
import { ExperiencesLoader } from "./Experiences.js";
import type { Image, Project } from './utils.js';
import { CssClasses, Viewer } from './utils.js';
>>>>>>> Stashed changes:src/scripts/script.ts

const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage") as string;
const projectsNav = document.querySelector("body nav + nav") as HTMLElement;

const burgerMenuButton = document.querySelector("body>div") as HTMLElement;
const navs = document.querySelectorAll("nav") as NodeListOf<HTMLElement>;
const main = document.querySelector("main") as HTMLElement;

const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

let projectList: Map<string, Map<string, Project>> = new Map();

let imageIndexToDisplay = 0;

enum CssClasses {
  underlined = "underlined",
  isDisplayed = "isDisplayed",
  hidden = "hidden",
  visible = "visible",
}

enum ImageViewer {
  previous = -1,
  next = +1
}

interface Project {
  readonly title: string;
  readonly context: string;
  readonly details: string;
  readonly tools: string;
  readonly learned: string;
  readonly images: Image[]
}

interface Image {
  readonly src: string;
  readonly alt: string;
  readonly title: string;
}

init();

switch (activePage) {
  case "Projects":
    buildProjects();
    break;
  case "Experiences":
<<<<<<< Updated upstream:scripts/script.ts
  // new ExperiencesLoader();
=======
    new ExperiencesLoader();
    break;
  case "Skills":
    new Bar();
  default:
    break;
>>>>>>> Stashed changes:src/scripts/script.ts
}

function hideNavs() {
  if (viewportHeight < 600 || viewportWidth < 1000)

    navs.forEach(nav => {
      nav.classList.add(CssClasses.hidden);
      nav.classList.remove(CssClasses.visible);
    })
}

function displayNavs() {
  if (viewportHeight < 600 || viewportWidth < 1000)
    navs.forEach(nav => {
      nav.classList.remove(CssClasses.hidden);
      nav.classList.add(CssClasses.visible);
    })
}

function onDetailsOpen(details: HTMLDetailsElement) {
  if (details.open) {
    document.querySelectorAll("details").forEach(d => {
      if (details != d) {
        d.open = false;
      }
    });
  }
};


function onResizeNavHidder() {
  if (viewportHeight < 600 || viewportWidth < 1000) {
    navs.forEach(nav => {
      nav.classList.remove(CssClasses.visible);
      nav.classList.add(CssClasses.hidden);
    })

  } else {
    navs.forEach(nav => {
      nav.classList.remove(CssClasses.visible);
      nav.classList.remove(CssClasses.hidden);
    })
  }
}

function init() {
  console.log("init")

  document.getElementById(activePage)?.classList.add(CssClasses.underlined);

  window.addEventListener('resize', onResizeNavHidder);
  onResizeNavHidder();

  burgerMenuButton?.addEventListener("click", () => {

    if (navs[0].classList.contains(CssClasses.hidden)) {
      displayNavs();
    } else {
      hideNavs();
    }
  }
  );

}


function buildProjects() {

  import("./project.json")
    .then((rawProjects) => {
      let returnedMap: Map<string, Map<string, Project>> = new Map();
      new Map(Object.entries(rawProjects)).forEach((projects, context) => {

<<<<<<< Updated upstream:scripts/script.ts
        let tempMap: Map<string, Project> = new Map();

        new Map(Object.entries(projects)).forEach((project: Project) => {
          tempMap.set(project.title, project);
        })

        projectList.set(context, tempMap);
=======
  import("../ressources/project.json")
    .then((rawProjects) => {

      new Map(Object.entries(rawProjects)).forEach((projects, context) => {
        if (context !== "default") {
          let tempMap: Map<string, Project> = new Map();

          new Map(Object.entries(projects)).forEach((project: Project) => {
            tempMap.set(project.title, project);
          })

          projectList.set(context, tempMap);

        }
>>>>>>> Stashed changes:src/scripts/script.ts

      })

    })
    .then(() => buildProjectNav());

}

function buildProjectNav() {
  console.log("buildProjectNav")
  projectList.forEach((projects, context) => {
    let details = document.createElement("details");
    details.addEventListener("toggle", () => onDetailsOpen(details));
    let summary = document.createElement("summary");
    let ul = document.createElement("ul");

    summary.innerHTML = context;
    details.appendChild(summary);

    projects.forEach((project: Project) => {
      let li = document.createElement("li");
      li.innerHTML = project.title;
<<<<<<< Updated upstream:scripts/script.ts
      li.addEventListener("click", (e) => { buildProjectHTML([li, summary]); e.stopPropagation() });
=======
      li.addEventListener("click", () => buildProjectHTML([li, summary]));
>>>>>>> Stashed changes:src/scripts/script.ts
      li.addEventListener("click", hideNavs);
      ul.appendChild(li);
    });

    details.appendChild(ul);

    projectsNav.appendChild(details);
  });

  document.querySelectorAll("details")[0].open = true;
  (document.querySelector("details li") as HTMLElement).click();
}

function buildProjectHTML(elementsToUnderline: [HTMLLIElement, HTMLElement]) {
  console.log("buildProjectHTML")

  console.log(elementsToUnderline)

  imageIndexToDisplay = 0;
  main.innerHTML = "";

  document.querySelectorAll("details li").forEach(s => s.removeAttribute("class"));
  document.querySelectorAll("summary").forEach(s => s.removeAttribute("class"));
  elementsToUnderline.forEach(element => element.classList.add(CssClasses.underlined));
  elementsToUnderline[1]
  let projectClickContext: string = elementsToUnderline[1].innerHTML;
  let projects = projectList.get(projectClickContext);
  let clickedProject = projects?.get(elementsToUnderline[0].innerHTML);

  let projectSection = createElement("section");
  appendChildren(projectSection, [
    createElement("p", clickedProject?.context),
    createElement("p", clickedProject?.details),
    appendChildren(createElement("div"), [
      createElement("h3", "Outils"),
      createElement("p", clickedProject?.tools)
    ]),
    appendChildren(createElement("div"), [
      createElement("h3", "Acquis"),
      createElement("p", clickedProject?.learned)
    ]),

  ]);

  let image = clickedProject?.images[imageIndexToDisplay];
  let figureSelectorContainer = createElement("div", null, { class: "figures-container" });

  if (image != undefined) {
<<<<<<< Updated upstream:scripts/script.ts
=======

    let figureSelector = [
      appendChildren(
        createElement("figure"),
        [createElement("img", null, { src: image.src, alt: image.alt, title: image.title })]
      )
    ]

    if (clickedProject?.images?.length === undefined || clickedProject?.images?.length > 1) {
      figureSelector.unshift(createImgAsButton((e: MouseEvent) => changeImage(e, Viewer.previous, clickedProject?.images), { class: "image-button" }))
      figureSelector.push(createImgAsButton((e: MouseEvent) => changeImage(e, Viewer.next, clickedProject?.images), { class: "image-button previousButton" }))
    }

>>>>>>> Stashed changes:src/scripts/script.ts
    appendChildren(
      figureSelectorContainer,
      [createImgAsButton((e: MouseEvent) => changeImage(e, ImageViewer.previous, clickedProject?.images), { class: "image-button" }),
      appendChildren(
        createElement("figure"),
        [createElement("img", null, { src: image.src, alt: image.alt, title: image.title })]
      ),
      createImgAsButton((e: MouseEvent) => changeImage(e, ImageViewer.next, clickedProject?.images), { class: "image-button previousButton" })
      ]
    )
  }


  appendChildren(main, [
    createElement("h2", clickedProject?.title),
    appendChildren(
      createElement("div", null, { class: "project-container" }), [
      projectSection,
      figureSelectorContainer
    ]
    )
  ])

}

function changeImage(e: MouseEvent, view: ImageViewer, images: Image[] | null | undefined) {
  imageIndexToDisplay += view;

  if (images != undefined) {
    if (imageIndexToDisplay < 0 && images) {
      imageIndexToDisplay = images.length - 1
    } else if (imageIndexToDisplay > images.length - 1) {
      imageIndexToDisplay = 0;
    }

    let figure = (e.target as HTMLElement).parentElement?.querySelector("figure") as HTMLElement;

    let img = figure.querySelector("img") as HTMLImageElement;

    figure.removeChild(img);

    img.src = images[imageIndexToDisplay].src;
    img.alt = images[imageIndexToDisplay].alt;
    img.title = images[imageIndexToDisplay].title;

    figure.appendChild(img);
  }
}


async function loadProjects(): Promise<Map<string, Project[]>> {
  return fetch("/scripts/project.json")
    .then(response => response.json());
}


function createElement(elementTag: string, innerHTML: string | null = null, attributes: Record<string, any> | null = null): HTMLElement {
  let element = document.createElement(elementTag);

  if (innerHTML != null) {
    element.innerHTML = innerHTML;
  }

  if (attributes != null) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }
  return element;
}

function appendChildren(element: HTMLElement, children: HTMLElement[]): HTMLElement {
  children.forEach(child => {
    element.appendChild(child);
  })
  return element;
}


function createImgAsButton(callBack: ((this: GlobalEventHandlers, ev: MouseEvent) => any) | null, attributes: Record<string, string> | null = null, src: string = "/images/chevron.png") {

  let button = createElement("img", null, { src })

  if (attributes != null) {
    Object.keys(attributes).forEach((key) => {
      button.setAttribute(key, attributes[key]);
    });
  }

  button.onclick = callBack;

  return button;
}


