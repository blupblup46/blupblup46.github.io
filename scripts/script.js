// import { ExperiencesLoader } from "./Experiences";
import Chart from '../node_modules/chart.js/auto';
console.log("ui");
function getRandom() {
    return Math.random() * 100;
}
function generateCanvas() {
    const data = [
        { year: 2010, count: getRandom() },
        { year: 2011, count: getRandom() },
        { year: 2012, count: getRandom() },
        { year: 2013, count: getRandom() },
        { year: 2014, count: getRandom() },
        { year: 2015, count: getRandom() },
        { year: 2016, count: getRandom() },
    ];
    new Chart(document.getElementById('acquisitions'), {
        type: 'bar',
        data: {
            labels: data.map(row => row.year),
            datasets: [
                {
                    label: 'Acquisitions by year',
                    data: data.map(row => row.count)
                }
            ]
        }
    });
}
setTimeout(generateCanvas, 1000);
const activePage = document.getElementsByTagName("main")[0].getAttribute("activePage");
const projectsNav = document.querySelector("body nav + nav");
const burgerMenuButton = document.querySelector("body>div");
const navs = document.querySelectorAll("nav");
const main = document.querySelector("main");
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;
let projectList = new Map();
let imageIndexToDisplay = 0;
var CssClasses;
(function (CssClasses) {
    CssClasses["underlined"] = "underlined";
    CssClasses["isDisplayed"] = "isDisplayed";
    CssClasses["hidden"] = "hidden";
    CssClasses["visible"] = "visible";
})(CssClasses || (CssClasses = {}));
var ImageViewer;
(function (ImageViewer) {
    ImageViewer[ImageViewer["previous"] = -1] = "previous";
    ImageViewer[ImageViewer["next"] = 1] = "next";
})(ImageViewer || (ImageViewer = {}));
init();
switch (activePage) {
    case "Projects":
        buildProjects();
        break;
    case "Experiences":
    // new ExperiencesLoader();
}
function hideNavs() {
    if (viewportHeight < 600 || viewportWidth < 1000)
        navs.forEach(nav => {
            nav.classList.add(CssClasses.hidden);
            nav.classList.remove(CssClasses.visible);
        });
}
function displayNavs() {
    if (viewportHeight < 600 || viewportWidth < 1000)
        navs.forEach(nav => {
            nav.classList.remove(CssClasses.hidden);
            nav.classList.add(CssClasses.visible);
        });
}
function onDetailsOpen(details) {
    if (details.open) {
        document.querySelectorAll("details").forEach(d => {
            if (details != d) {
                d.open = false;
            }
        });
    }
}
;
function onResizeNavHidder() {
    if (viewportHeight < 600 || viewportWidth < 1000) {
        navs.forEach(nav => {
            nav.classList.remove(CssClasses.visible);
            nav.classList.add(CssClasses.hidden);
        });
    }
    else {
        navs.forEach(nav => {
            nav.classList.remove(CssClasses.visible);
            nav.classList.remove(CssClasses.hidden);
        });
    }
}
function init() {
    var _a;
    console.log("init");
    (_a = document.getElementById(activePage)) === null || _a === void 0 ? void 0 : _a.classList.add(CssClasses.underlined);
    window.addEventListener('resize', onResizeNavHidder);
    onResizeNavHidder();
    burgerMenuButton === null || burgerMenuButton === void 0 ? void 0 : burgerMenuButton.addEventListener("click", () => {
        if (navs[0].classList.contains(CssClasses.hidden)) {
            displayNavs();
        }
        else {
            hideNavs();
        }
    });
}
function buildProjects() {
    import("./project.json")
        .then((rawProjects) => {
        let returnedMap = new Map();
        new Map(Object.entries(rawProjects)).forEach((projects, context) => {
            let tempMap = new Map();
            new Map(Object.entries(projects)).forEach((project) => {
                tempMap.set(project.title, project);
            });
            projectList.set(context, tempMap);
        });
    })
        .then(() => buildProjectNav());
}
function buildProjectNav() {
    console.log("buildProjectNav");
    projectList.forEach((projects, context) => {
        let details = document.createElement("details");
        details.addEventListener("toggle", () => onDetailsOpen(details));
        let summary = document.createElement("summary");
        let ul = document.createElement("ul");
        summary.innerHTML = context;
        details.appendChild(summary);
        projects.forEach((project) => {
            let li = document.createElement("li");
            li.innerHTML = project.title;
            li.addEventListener("click", (e) => { buildProjectHTML([li, summary]); e.stopPropagation(); });
            li.addEventListener("click", hideNavs);
            ul.appendChild(li);
        });
        details.appendChild(ul);
        projectsNav.appendChild(details);
    });
    document.querySelectorAll("details")[0].open = true;
    document.querySelector("details li").click();
}
function buildProjectHTML(elementsToUnderline) {
    console.log("buildProjectHTML");
    console.log(elementsToUnderline);
    imageIndexToDisplay = 0;
    main.innerHTML = "";
    document.querySelectorAll("details li").forEach(s => s.removeAttribute("class"));
    document.querySelectorAll("summary").forEach(s => s.removeAttribute("class"));
    elementsToUnderline.forEach(element => element.classList.add(CssClasses.underlined));
    elementsToUnderline[1];
    let projectClickContext = elementsToUnderline[1].innerHTML;
    let projects = projectList.get(projectClickContext);
    let clickedProject = projects === null || projects === void 0 ? void 0 : projects.get(elementsToUnderline[0].innerHTML);
    let projectSection = createElement("section");
    appendChildren(projectSection, [
        createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.context),
        createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.details),
        appendChildren(createElement("div"), [
            createElement("h3", "Outils"),
            createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.tools)
        ]),
        appendChildren(createElement("div"), [
            createElement("h3", "Acquis"),
            createElement("p", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.learned)
        ]),
    ]);
    let image = clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.images[imageIndexToDisplay];
    let figureSelectorContainer = createElement("div", null, { class: "figures-container" });
    if (image != undefined) {
        appendChildren(figureSelectorContainer, [createImgAsButton((e) => changeImage(e, ImageViewer.previous, clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.images), { class: "image-button" }),
            appendChildren(createElement("figure"), [createElement("img", null, { src: image.src, alt: image.alt, title: image.title })]),
            createImgAsButton((e) => changeImage(e, ImageViewer.next, clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.images), { class: "image-button previousButton" })
        ]);
    }
    appendChildren(main, [
        createElement("h2", clickedProject === null || clickedProject === void 0 ? void 0 : clickedProject.title),
        appendChildren(createElement("div", null, { class: "project-container" }), [
            projectSection,
            figureSelectorContainer
        ])
    ]);
}
function changeImage(e, view, images) {
    var _a;
    imageIndexToDisplay += view;
    if (images != undefined) {
        if (imageIndexToDisplay < 0 && images) {
            imageIndexToDisplay = images.length - 1;
        }
        else if (imageIndexToDisplay > images.length - 1) {
            imageIndexToDisplay = 0;
        }
        let figure = (_a = e.target.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector("figure");
        let img = figure.querySelector("img");
        figure.removeChild(img);
        img.src = images[imageIndexToDisplay].src;
        img.alt = images[imageIndexToDisplay].alt;
        img.title = images[imageIndexToDisplay].title;
        figure.appendChild(img);
    }
}
async function loadProjects() {
    return fetch("/scripts/project.json")
        .then(response => response.json());
}
function createElement(elementTag, innerHTML = null, attributes = null) {
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
function appendChildren(element, children) {
    children.forEach(child => {
        element.appendChild(child);
    });
    return element;
}
function createImgAsButton(callBack, attributes = null, src = "/images/chevron.png") {
    let button = createElement("img", null, { src });
    if (attributes != null) {
        Object.keys(attributes).forEach((key) => {
            button.setAttribute(key, attributes[key]);
        });
    }
    button.onclick = callBack;
    return button;
}
