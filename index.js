#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 10001;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    //Method to enroll student in a course
    enrollCourse(course) {
        this.courses.push(course);
    }
    //Method to view student's balance
    viewBalance() {
        console.log((chalk.bold.magenta `\n\t Balance for ${this.name} is $${this.balance}...\n`));
    }
    //Method to pay student's fees
    payFees(amount) {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log((chalk.bold.blue `\n\t$${amount} has been paid successfully for ${this.name}...`));
            console.log((chalk.bold.cyan `\n\tRemaining balance: $${this.balance}...\n`));
        }
        else {
            console.log((chalk.bold.red `\n\tInsufficient Balance...\n`));
        }
    }
    //Method to view student's status
    showStatus() {
        console.log((chalk.bold.magentaBright `-`.repeat(30)));
        console.log((chalk.bold.yellow `\tID: ${this.id}`));
        console.log((chalk.bold.yellow `\tName: ${this.name}`));
        console.log((chalk.bold.yellow `\tCourses: ${this.courses}`));
        console.log((chalk.bold.yellow `\tBalance: $${this.balance}`));
        console.log((chalk.bold.magentaBright `-`.repeat(30)));
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new student
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log((chalk.bold.magenta `\n\tStudent: ${name} added successfully... Student's ID: ${student.id}...\n`));
    }
    //Method to enroll a student in a course
    enrollStudent(student_id, course) {
        let student = this.findStudent(student_id);
        if (student) {
            student.enrollCourse(course);
            console.log((chalk.bold.magentaBright `\n\t${student.name} enrolled in ${course} successfully...\n`));
        }
        else {
            console.log((chalk.bold.red `\n\t Invalid student's ID. Insert the correct ID.\n`));
        }
    }
    //Method to view a student balance
    viewStudentBalance(student_id) {
        let student = this.findStudent(student_id);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log((chalk.bold.red `\n\t Invalid student's ID... Please enter a correct student ID...\n`));
        }
    }
    //Method to pay student fees
    payStudentFees(student_id, amount) {
        let student = this.findStudent(student_id);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log((chalk.bold.red `\n\tInvalid student's ID...  Please enter a correct student ID...\n`));
        }
    }
    //Method to display student status
    showStudentStatus(student_id) {
        let student = this.findStudent(student_id);
        if (student) {
            student.showStatus();
        }
        else {
            console.log((chalk.bold.red `\n\t Invalid student's ID... Please enter a correct student ID...\n`));
        }
    }
    //Method to find a student by student's id
    findStudent(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
//Main function to run program
async function main() {
    console.log((chalk.bold.magentaBright `-`.repeat(70)));
    console.log((chalk.bold.greenBright `\n\tWelcome to code with Sehar-Student Management System\n`));
    console.log((chalk.bold.magentaBright `-`.repeat(70)));
    let student_manager = new Student_manager();
    //Using while loop to keep progrm running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ]
            }
        ]);
        //Using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: (chalk.bold.yellow `\n\tEnter a student name:\n`),
                    }
                ]);
                student_manager.addStudent(nameInput.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.bold.yellow `\n\tEnter a student's ID:\n`),
                    },
                    {
                        name: "course",
                        type: "input",
                        message: (chalk.bold.yellow `\n\tEnter a course name:\n`),
                    }
                ]);
                student_manager.enrollStudent(courseInput.student_id, courseInput.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.bold.yellow `\n\tEnter a student's ID:\n`),
                    }
                ]);
                student_manager.viewStudentBalance(balanceInput.student_id);
                break;
            case "Pay Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.bold.yellow `\n\tEnter a student ID:\n`),
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: (chalk.bold.yellow `\n\tEnter the amount to pay:\n`),
                    }
                ]);
                student_manager.payStudentFees(feesInput.student_id, feesInput.amount);
                break;
            case "Show Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: (chalk.bold.yellow `\n\tEnter a student ID:\n`),
                    }
                ]);
                student_manager.showStudentStatus(statusInput.student_id);
                break;
            case "Exit":
                console.log((chalk.bold.magentaBright `-`.repeat(30)));
                console.log((chalk.bold.greenBright `\n\tExitting...\n`));
                console.log((chalk.bold.magentaBright `-`.repeat(30)));
                process.exit();
        }
    }
}
;
//Calling a main function 
main();
