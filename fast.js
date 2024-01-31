const { setTimeout } = require("timers/promises");
const { writeFile } = require("fs/promises");
const { randomUUID } = require("crypto");

const SLEEP = 5 * 1000;

async function save(element) {
    const fileName = randomUUID();
    const json = JSON.stringify(element, null, 4);
    await writeFile(`./store/${fileName}.txt`, json);
}

async function fetchData(url) {
    await setTimeout(SLEEP);

    const res = await fetch(url);
    const data = await res.json();

    await Promise.all(data.map((dt) => save(dt)));
}

async function posts() {
    await fetchData("https://jsonplaceholder.typicode.com/posts");
}

async function comments() {
    await fetchData("https://jsonplaceholder.typicode.com/comments");
}

async function albums() {
    await fetchData("https://jsonplaceholder.typicode.com/albums");
}

async function photos() {
    await fetchData("https://jsonplaceholder.typicode.com/photos");
}

async function todos() {
    await fetchData("https://jsonplaceholder.typicode.com/todos");
}

async function users() {
    await fetchData("https://jsonplaceholder.typicode.com/users");
}

async function main() {
    const workers = [posts(), comments(), albums(), photos(), todos(), users()];
    await Promise.all(workers);
}

main();
