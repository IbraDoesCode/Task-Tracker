const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, "tasks.json");

function readJson() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, jsonString) => {
            if (err) {
                return reject(err);
            }

            try {
                const data = JSON.parse(jsonString);
                resolve(data);
            } catch (parseErr) {
                reject(parseErr);
            }
        });
    });
}

function writeToJson(data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, JSON.stringify(data, null, 2), err => {
            if (err) {
                reject(err);
            } else {
                resolve("File successfully written");
            }
        })
    });
}

function appendToJson(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const content = await readJson();
            content.push(data);

            await writeToJson(content);
            resolve("Data saved.")
        } catch (error) {
            reject("Error saving data: " + error);
        }
    });
}

module.exports = {
    readJson, 
    writeToJson, 
    appendToJson
};