class Task {
    constructor(id, description, status, createdAt, updatedAt) {
        this.id = id;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    setDescription(description) {
        this.description = description
    }

    setStatus(status) {
        this.status = status;
    }

    setUpdatedAt(date) {
        this.updatedAt = date;
    }

    toString() {
        return `Task ID: ${this.id}\n` +
               `Description: ${this.description}\n` +
               `Status: ${this.status}\n` +
               `Created at: ${this.createdAt.toLocaleString()}\n` +
               `Updated at: ${this.updatedAt ? this.updatedAt.toLocaleString() : 'N/A'}\n`;
    }

}

module.exports = Task;