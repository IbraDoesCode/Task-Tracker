const { addTask, updateTaskDescription, updateTaskStatus, deleteTask, fetchTasks, fetchTasksByStatus } = require('./taskManager');
const { taskStatus } = require("./taskStatus");

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (args.length < 2 && command !== "list") {
        console.log("Usage: task-cli <cmd>");
        console.log("Commands:");
        console.log("  add <Description>         - Add a task");
        console.log("  update <id> <Description> - Update task description");
        console.log("  delete <id>               - Delete a task");
        console.log("  mark-done <id>            - Mark task as done");
        console.log("  mark-in-progress <id>     - Mark task as in-progress");
        console.log("  list                      - List all tasks");
        console.log("  list <status>             - List tasks by status");
        return;
    }

    switch (command) {
        case "add":
            const description = args.slice(1).join(" ");
            addTask(description);
            break;

        case "update":
            const idToUpdate = args[1];
            const newDescription = args.slice(2).join(" ");
            updateTaskDescription(idToUpdate, newDescription);
            break;

        case "delete":
            const idToDelete = args[1];
            deleteTask(idToDelete);
            break;

        case "mark-done":
            const doneId = args[1];
            updateTaskStatus(doneId, taskStatus.DONE);
            break;

        case "mark-in-progress":
            const inProgressId = args[1];
            updateTaskStatus(inProgressId, taskStatus.IN_PROGRESS);
            break;

        case "list":
            if (args.length > 1) {
                const status = args[1];
                const tasks = await fetchTasksByStatus(status);
                tasks.forEach(task => console.log(task.toString()));
            } else {
                const tasks = await fetchTasks();
                tasks.forEach(task => console.log(task.toString()));
            }
            break;

        default:
            console.log("Unknown command. Please use a valid command.");
            break;
    }
}

main();