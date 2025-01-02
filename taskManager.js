const { readJson, writeToJson, appendToJson } = require('./jsonUtil');
const Task = require('./task')
const ts = require('./taskStatus');

async function fetchTasks() {
    try {
        const tasks = await readJson();
        return tasks.map(data => new Task(
            data.id,
            data.description,
            data.status,
            data.createdAt,
            data.updatedAt
        ));
    } catch (error) {
        console.log("Error fetching tasks:", error)
        return [];
    }
}

async function fetchTasksByStatus(status) {
    if (!Object.values(status).includes(status)) {
        console.error("Invalid status.");
        return [];
    }

    try {
        const tasks = await fetchTasks();
        return tasks.filter(task => task.status === status);
    } catch (error) {
        console.log("Error fetching tasks", error);
        return [];
    }
}

async function generateTaskId() {
    try {
        const tasks = await fetchTasks();
        return Math.max(...tasks.map(task => task.id)) + 1;
    } catch (error) {
        console.error("Error generating new task id:", error);
    }
}

async function addTask(task) {
    try {
        await appendToJson(task);
        console.log("Task saved!")
    } catch (error) {
        console.error("Error saving task", error);
    }
}

generateTaskId()
    .then(id => console.log(id))
    .catch(err => console.error(err));

module.exports = {fetchTasks, fetchTasksByStatus, addTask};