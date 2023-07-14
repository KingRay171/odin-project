import css from "./style.css";

function Item(name, description, dueDate, priority) {
  this.name = name;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
  this.isCompleted = false;
  this.id = new Date().toString();
}

function Project(name) {
  this.name = name;
  this.items = [];
  this.addItem = (item) => {
    this.items.push(item);
  };
  this.id = new Date().toString();
}

const projects = [];

const newProjectName = document.getElementById("name");
const projectsList = document.querySelector(".projects-list");
const addItem = document.querySelector(".add");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");
const modalName = document.getElementById("item-name");
const modalDesc = document.getElementById("desc");
const modalPriority = document.getElementById("priority");
const modalDate = document.getElementById("date");
const modalTime = document.getElementById("time");
const modalSubmit = document.querySelector(".submit");
const bodyContent = document.querySelector(".body-content");

document.getElementById("delete").addEventListener("click", () => {
  const projectToDelete = document.querySelector(".selected-project");
  projects.filter((e) => projectToDelete.textContent !== e.name);
  projectToDelete.remove();
  localStorage.removeItem(projectToDelete.textContent);
});

const addItemDOM = (item) => {
  const body = document.querySelector(".body-content");

  const itemDiv = document.createElement("div");
  itemDiv.style.display = "flex";
  itemDiv.style.color = "white";
  itemDiv.style.border = "1px solid white";

  const left = document.createElement("div");
  left.style.display = "flex";
  left.style.flexDirection = "column";
  left.style.gap = "4px";

  const right = document.createElement("div");

  const name = document.createElement("div");
  name.textContent = item.name;

  const date = document.createElement("div");
  date.textContent = item.dueDate.toString();
  const description = document.createElement("div");
  description.textContent = item.description;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", (e) => {
    const selectedProject = document.querySelector(".selected-project");
    const projectIndex = parseInt(selectedProject.classList[0]);

    const itemIndex = Array.from(bodyContent.children).indexOf(
      e.target.parentElement.parentElement
    );
    projects[projectIndex].items.splice(itemIndex, 1);
    localStorage.setItem(
      projects[projectIndex].name,
      JSON.stringify(projects[projectIndex])
    );
    e.target.parentElement.parentElement.remove();
  });

  left.appendChild(name);
  left.appendChild(date);
  left.appendChild(description);
  right.appendChild(deleteButton);
  itemDiv.appendChild(left);
  itemDiv.appendChild(right);
  body.appendChild(itemDiv);
};

document.getElementById("create").addEventListener("click", () => {
  const project = new Project(newProjectName.value);
  projects.push(project);
  const projectDOM = document.createElement("div");
  projectDOM.classList.add(`${projectsList.childElementCount + 1}`);
  projectDOM.textContent = newProjectName.value;
  projectsList.appendChild(projectDOM);
  localStorage.setItem(project.name, JSON.stringify(project));
});

for (let i = 0; i < localStorage.length; i++) {
  projects.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  projects[i].addItem = function (item) {
    this.items.push(item);
  };

  const projectDOM = document.createElement("div");
  projectDOM.classList.add(`${i}`);
  projectDOM.textContent = projects[i].name;
  projectsList.appendChild(projectDOM);
}

const projectsDOM = Array.from(projectsList.children);

projectsDOM.forEach((e) => {
  e.addEventListener("click", () => {
    projectsDOM.forEach((element) => {
      element.classList.remove("selected-project");
    });
    e.classList.add("selected-project");
  });
});

addItem.addEventListener("click", () => {
  const selectedProject = document.querySelector(".selected-project");
  if (selectedProject) {
    const projectIndex = selectedProject.classList[0];
  }
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

modalSubmit.addEventListener("click", () => {
  if (modalPriority.value !== "priority") {
    const selectedProject = document.querySelector(".selected-project");
    const projectIndex = parseInt(selectedProject.classList[0]);
    console.log(modalDate);
    const date = modalDate.value.split("-").map((e) => parseInt(e));
    const time = modalTime.value.split(":").map((e) => parseInt(e));
    const newItem = new Item(
      modalName.value,
      modalDesc.value,
      new Date(date[0], date[1], date[2], time[0], time[1]),
      modalPriority.value
    );
    projects[projectIndex].addItem(newItem);
    modal.style.display = "none";
    localStorage.setItem(
      projects[projectIndex].name,
      JSON.stringify(projects[projectIndex])
    );
    addItemDOM(newItem);
  }
});

Array.from(projectsList.children).forEach((e) => {
  e.addEventListener("click", () => {
    Array.from(bodyContent.children).forEach((e) => e.remove());
    const projectIndex = parseInt(e.classList[0]);
    projects[projectIndex].items.forEach((e) => {
      addItemDOM(e);
    });
  });
});

console.log(localStorage);
