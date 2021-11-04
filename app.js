const form = document.getElementById("form");
const listadoTareas = document.getElementById("listado-tareas");
const btn = document.getElementById("id");
const template = document.getElementById("template-listado-tareas").content;
const fragment = document.createDocumentFragment();

tareas = {};

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("LocalTareas")) {
    tareas = JSON.parse(localStorage.getItem("LocalTareas"));
  }
  pintarTareas();
});

form.addEventListener("submit", (e) => {
  setTarea(e);
});

document.addEventListener("click", e => {
  actionBtn(e);
});



const setTarea = e => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return
  }

  tarea = {
    id: Date.now(),
    texto: input.value,
    estado: false
  }

  tareas[tarea.id] = tarea;
  form.reset();
  input.focus();

  pintarTareas();
}

const pintarTareas = e => {

  localStorage.setItem("LocalTareas", JSON.stringify(tareas));


  if (Object.keys(tareas).length === 0) {
    console.log(Object.keys(tareas).length);
    console.log(tareas);
    listadoTareas.innerHTML = `
    <div class="text-center mt-2 alert alert-info">
      <h4>Sin tareas</h4>
    </div>
    `;
    return;
  }

  listadoTareas.innerHTML = "";
  Object.values(tareas).forEach(tarea => {
    // console.log(tarea);
    const clone = template.cloneNode(true);
    clone.querySelector("p").textContent = tarea.texto;

    if (tarea.estado) {
      console.log(tarea.estado);
      clone.querySelector("p").style.textDecoration = "line-through";
      clone.querySelector(".alert").classList.replace("alert-warning", "alert-danger");
      clone.querySelector(".fas").classList.replace("fa-thumbs-up", "fa-recycle");
    }
    clone.querySelectorAll(".fas")[0].dataset.id = tarea.id;
    clone.querySelectorAll(".fas")[1].dataset.id = tarea.id;

    fragment.appendChild(clone);
  });
  listadoTareas.appendChild(fragment);

}

const actionBtn = e => {
  if (e.target.matches(".fa-thumbs-up")) {
    tareas[e.target.dataset.id].estado = true;
    console.log(tareas);
    pintarTareas();
  }
  if (e.target.matches(".fa-trash-alt")) {
    delete tareas[e.target.dataset.id];
    pintarTareas();
  }
  if (e.target.matches(".fa-recycle")) {
    tareas[e.target.dataset.id].estado = false;
    console.log(tareas);
    pintarTareas();
  }
  e.stopPropagation();
}

