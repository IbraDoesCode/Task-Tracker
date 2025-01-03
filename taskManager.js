const { readJson, writeToJson, appendToJson } = require('./jsonUtil');
const Task = require('./task')
const { taskStatus } = require('./taskStatus');

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
    if (!Object.values(taskStatus).includes(status)) {
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

async function createTask(description) {
    const id = await generateTaskId();
    return new Task(
        id,
        description,
        taskStatus.PENDING,
        new Date().toLocaleString(),
        null
    );
}

async function addTask(description) {
    const task = await createTask(description);
    try {
        await appendToJson(task);
        console.log(`Task added successfully (ID: ${task.id})`)
    } catch (error) {
        console.error("Error saving task", error);
    }
}

async function updateTaskStatus(id, newStatus) {
    if (!Object.values(taskStatus).includes(newStatus)) {
        console.error("Invalid status.");
        return;
    }
    
    const tasks = await fetchTasks();
    const task = tasks.find(task => task.id === Number(id));

    if (!task) {
        console.error(`No task found for id ${id}`);
        return;
    } 

    task.setStatus(newStatus);
    task.setUpdatedAt(new Date().toLocaleString());

    try {
        await writeToJson(tasks);
        console.log(`Task Id ${id} updated status to ${newStatus}`);
    } catch (error) {
        console.error("Error updating task status: ", error);
        throw error;
    }
}

async function updateTaskDescription(id, description) {
    const tasks = await fetchTasks();
    const task = tasks.find(task => task.id === Number(id));

    if (!task) {
        console.error(`No task found for id ${id}`);
        return;
    } 

    task.setDescription(description);
    task.setUpdatedAt(new Date().toLocaleString());

    try {
        await writeToJson(tasks);
        console.log(`Task Id ${id} updated description to ${description}`);
    } catch (error) {
        console.error("Error updating task description: ", error);
        throw error;
    }
}

async function deleteTask(id) {
    const tasks = await fetchTasks();
    const taskToRemove = tasks.find(task => task.id === Number(id));

    if (!taskToRemove) {
        console.error(`No task found for id ${id}`);
        return;
    }

    const index = tasks.indexOf(taskToRemove);
    tasks.splice(index, 1);

    try {
        await writeToJson(tasks);
        console.log(`Task Id ${id} deleted.`);
    } catch (error) {
        console.error("Error deleting task: ", error);
        throw error;
    }
}

module.exports = {fetchTasks, fetchTasksByStatus, addTask, updateTaskStatus, updateTaskDescription, deleteTask};