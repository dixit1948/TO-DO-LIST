document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Add task function
    addTaskBtn.addEventListener("click", function () {
        let taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="deleteBtn">❌</button>
        `;

        taskItem.addEventListener("click", function () {
            taskItem.classList.toggle("completed");
        });

        taskItem.querySelector(".deleteBtn").addEventListener("click", function () {
            taskItem.remove();
        });

        taskList.appendChild(taskItem);
        taskInput.value = "";
    });

    // Enter key to add task
    taskInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTaskBtn.click();
        }
    });
});
