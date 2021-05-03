#! /usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');

const util = require('util');
const exec = util.promisify(require('child_process').exec);
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let htmlDummy = '<html></html>';

const options = yargs
    .usage("Usage -n <name>")
    .option("l", {
        alias: "language",
        describe: "Your programming language",
        type: "string",
        demandOption: true
    })
    .argv;

switch (options.language) {
    case 'js':
        jsProject();
        break;
    case 'node':
        nodeProject();
        break;
}

async function jsProject() {
    let stylesFolder = './styles';

    fs.writeFile('index.html', htmlDummy, () => {
        exec('git init') 
        console.log('Created index.html')
    });
    fs.writeFile('index.js', '', () => { console.log('Created index.js') });
    fs.mkdir(stylesFolder, () => { console.log('Created styles folder') });
    fs.writeFile(`${stylesFolder}/styles.scss`, '', () => { console.log('Created styles.scss') });
    fs.writeFile(`${stylesFolder}/styles.css`, '', () => { 
        console.log('Created styles.css');
        exec('git add .');

        console.log("You're ready to code!");

        process.exit();
    });
}

async function nodeProject() {
    await makeRepo();

    fs.writeFile('app.js', 'utf-8', () => {console.log('Created app.js')});

    rl.question('Are you using Express.js? (y/n)', (userInput) => {
        if (userInput == "y" || "yes") {
            exec('npm install express');

            let ignore = new Uint8Array(Buffer.from('node_modules/')); 

            fs.writeFile('.gitignore', ignore, () => {console.log("Created gitignore")});
        }
    })
}

function makeRepo() {
    exec('git init');
    console.log('Initialised git repository');
}