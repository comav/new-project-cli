#! /usr/bin/env node

const yargs = require('yargs');
const fs = require('fs');

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
        let stylesFolder = './styles';
        fs.writeFile('index.html', 'utf-8', () => {console.log('Created index.html')});
        fs.writeFile('index.js', 'utf-8', () => {console.log('Created index.js')});
        fs.mkdir(stylesFolder, () => {console.log('Created styles folder')});
        fs.writeFile(`${stylesFolder}/styles.scss,`, 'utf-8', () => {console.log('Created styles.scss')});
        fs.writeFile(`${stylesFolder}/styles.css,`, 'utf-8', () => {console.log('Created styles.css')});
        console.log("You're ready to code!");
        break;
}