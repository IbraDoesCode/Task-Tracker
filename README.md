# Command Line Task Tracker

A simple and straightforward command-line tool for managing tasks, designed as part of the roadmap.sh [project](https://roadmap.sh/projects/task-tracker). This project demonstrates the basics of JavaScript and file manipulation in Node.js.

## Features
- **Add Task**: Create new tasks with description.
- **Update Task Status**: Mark tasks as completed or pending.
- **Update Task Description**: Modify task details after creation.
- **Delete a Task**: Remove unwanted tasks.
- **List Tasks**: Display all tasks with their statuses.
- **Filter Tasks**: View tasks filtered by their status (e.g., pending or completed).


## Prerequisites
**Node.js**: Ensure you have node.js installed on your system. Download it from [Node.js Official Site](https://nodejs.org/en).

## How to install and Run
1. Clone the repository:
    ```
    git clone https://github.com/your-username/task-tracker.git
    cd task-tracker
    ```
2. Install globally:
    ```
    npm install -g
    ```
3. or link the script:
    ```
    npm link
    ```

## Usage
* Add a task:
    ```
    task-cli add "Complete project documentation"
    ```
* Update a task:
    ```
    task-cli udpate 4 "Create project documentation"
    ```    
* Mark task as done:
    ```
    task-cli mark-done 4
    ```
* Mark task as in progress:
    ```
    task-cli mark-in-progress 4
    ```
* Delete a task:
    ```
    task-cli delete 4
    ```
* List all task:
    ```
    task-cli list
    ```
* List all pending tasks:
    ```
    task-cli list pending
    ```