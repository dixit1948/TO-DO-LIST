const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filters = document.querySelectorAll(".filter");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");

let tasks = [];

function renderTasks(filter = "all") {
    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span>${task.text}</span>
            <button onclick="deleteTask(${index})">✖</button>
        `;

        li.addEventListener("click", () => toggleTask(index));
        taskList.appendChild(li);
    });

    taskCount.textContent = `${tasks.length} Tasks`;
}

function addTask() {
    if (taskInput.value.trim() === "") return;

    tasks.push({ text: taskInput.value, completed: false });
    taskInput.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks(document.querySelector(".filter.active").dataset.filter);
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addTask();
});

filters.forEach(btn => {
    btn.addEventListener("click", () => {
        filters.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks(btn.dataset.filter);
    });
});

clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    renderTasks();
});

