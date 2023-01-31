const addTask = () => {
    let taskValues = new Object();
    taskValues.taskDetails = document.getElementById("taskDetails").value;
    taskValues.taskDate = document.getElementById("taskDate").value;
    taskValues.taskTime = document.getElementById("taskTime").value;
    prevTasks = [...tasks];
    tasks.push(taskValues);
    createNote();
    document.getElementById("form").reset()
};

const dateReverse = (taskDate) => {
    const newDate = taskDate.split("-");
    return `${newDate[2]}-${newDate[1]}-${newDate[0]}`
}

const createNote = () => {
    let note = "";
    const isTaskAdded = prevTasks.length < tasks.length;
    tasks.forEach((task, index) => {
        const isLastTask = index === tasks.length - 1;
        const needAnimation = isTaskAdded && isLastTask;
        note += `
        <div class="note-background ${needAnimation ? `fadein-animate` : ''}">
            <button onClick="deleteNote(${index})" class="delete-note">❌</button>
            <div class="task-wroten">${task.taskDetails}</div>
            <div class="date-time">
                ${dateReverse(task.taskDate)}</br>
                ${task.taskTime}
            </div>
        </div>`;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    document.getElementById("notesOnBoard").innerHTML = note;
};

const deleteNote = (index) => {
    prevTasks = [...tasks];
    tasks.splice(index, 1);
    createNote();
}

let prevTasks = [];
let tasks = [];
const tasksFromLocalStorage = localStorage.getItem("tasks");
console.log();
if (tasksFromLocalStorage !== null) {
    const parsedTasks = JSON.parse(tasksFromLocalStorage)
    tasks = parsedTasks;
    prevTasks = parsedTasks;
    createNote();
}


