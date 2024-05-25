#! /usr/bin/env node 
import chalk from "chalk";
import inquirer from "inquirer";
// Classes
class Player {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    // Decrease Player fuel
    fuelDecrease() {
        this.fuel -= 25;
    }
    // Increase Player fuel
    increaseFuel() {
        this.fuel = 100;
    }
}
class Opponent {
    name;
    fuel = 100;
    constructor(name) {
        this.name = name;
    }
    // Decrease Opponent fuel
    fuelDecrease() {
        this.fuel -= 25;
    }
}
// Player and Opponent Input
let player = await inquirer.prompt([
    {
        name: "name",
        type: 'input',
        message: "Enter Your Name"
    }
]);
let opponent = await inquirer.prompt([
    {
        name: "Opponent_select",
        type: "list",
        message: "Select Your Opponent",
        choices: ["Skeleton", "Assassian", "Zombie", "Exiting..."],
    }
]);
// Handle exit condition
if (opponent.Opponent_select === "Exiting...") {
    process.exit();
}
// Gather Data
let p1 = new Player(player.name);
console.log(p1);
let O1 = new Opponent(opponent.Opponent_select);
console.log(O1);
// Switch Case
switch (opponent.Opponent_select) {
    case "Skeleton":
        O1.name = "Skeleton";
        break;
    case "Assassian":
        O1.name = "Assassian";
        break;
    case "Zombie":
        O1.name = "Zombie";
        break;
}
console.log(`${chalk.bold.green(p1.name)} VS ${chalk.bold.red(O1.name)}`);
while (true) {
    let ask = await inquirer.prompt([
        {
            name: "option",
            type: "list",
            message: "Select what do you want to do?",
            choices: ["Attack", "Drink Portion", "Run For Your Life..."],
        }
    ]);
    switch (ask.option) {
        case "Attack":
            let num = Math.floor(Math.random() * 2);
            if (num > 0) {
                p1.fuelDecrease();
                console.log(`${chalk.bold.red(p1.name)} fuel is ${(chalk.bold.redBright `${p1.fuel}`)}`);
                console.log(`${chalk.bold.green(O1.name)} fuel is ${(chalk.bold.greenBright `${O1.fuel}`)}`);
                if (p1.fuel <= 0) {
                    console.log(`${chalk.bold.italic.red(`Better Luck Next Time ${chalk.bold.blue(`${p1.name}`)}, Unfortunately You Lose!`)}`);
                    process.exit();
                }
            }
            else {
                O1.fuelDecrease();
                console.log(`${chalk.bold.green(p1.name)} fuel is ${(chalk.bold.greenBright `${p1.fuel}`)}`);
                console.log(`${chalk.bold.red(O1.name)} fuel is ${(chalk.bold.redBright `${O1.fuel}`)}`);
                if (O1.fuel <= 0) {
                    console.log(`${chalk.bold.bold.italic.green(`Congratulations! ${chalk.bold.blue(`${p1.name}`)} You Won`)}`);
                    process.exit();
                }
            }
            break;
        case "Drink Portion":
            p1.increaseFuel();
            console.log(`${chalk.bold.bold.italic.blueBright("You Drink Health Potion. Your Fuel is")} ${chalk.italic.green(`${chalk.bgGreen(`[   ${chalk.bold.white(p1.fuel)}   ]`)} ${chalk.white.bold("%")}`)}`);
            break;
        case "Run For Your Life...":
            console.log(`${chalk.bold.italic.red("You Lose, Better Luck Next Time")}`);
            process.exit();
            break;
    }
}
