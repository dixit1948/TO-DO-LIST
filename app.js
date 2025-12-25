const input = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const count = document.getElementById("count");
const clearBtn = document.getElementById("clear");
const filters = document.querySelectorAll(".filter-btn");

let tasks = [];

function render(filter = "all") {
  list.innerHTML = "";

  const filtered = tasks.filter(task => {
    if (filter === "active") return !task.done;
    if (filter === "completed") return task.done;
    return true;
  });

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    if (task.done) li.classList.add("completed");

    li.innerHTML = `
      <span>${task.text}</span>
      <button class="delete-btn">✖</button>
    `;

    li.querySelector("span").onclick = () => {
      tasks[index].done = !tasks[index].done;
      render(getActiveFilter());
    };

    li.querySelector("button").onclick = () => {
      tasks.splice(index, 1);
      render(getActiveFilter());
    };

    list.appendChild(li);
  });

  count.textContent = `${tasks.length} tasks`;
}

function getActiveFilter() {
  return document.querySelector(".filter-btn.active").dataset.filter;
}

addBtn.onclick = () => {
  if (!input.value.trim()) return;
  tasks.push({ text: input.value, done: false });
  input.value = "";
  render(getActiveFilter());
};

input.addEventListener("keypress", e => {
  if (e.key === "Enter") addBtn.click();
});

filters.forEach(btn => {
  btn.onclick = () => {
    filters.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    render(btn.dataset.filter);
  };
});

clearBtn.onclick = () => {
  tasks = tasks.filter(task => !task.done);
  render(getActiveFilter());
};

