import { Command } from "commander"
import chalk from "chalk"
import fs from "fs"
const program = new Command

program
.name("Cli todo App.")
.description("Make your own todo with CLI.")
//create a task
program.command("create")
.description("create a task to your todo file.")
.argument("<string>","task to add.")
.option("-f,--file <string>","File name.")
.action((str,option)=>{
    fs.appendFile(option.file,str+"\n",(err)=>{
        if (err) {
            console.log(chalk.red("There is something wrong!"),err);
        }else{
            console.log(chalk.green("Task added successfully."));
        }
    })
})
//read that task.
program.command("read")
.description("read all task of your file.")
.argument("<string>","File name.")
.action((str)=>{
    fs.readFile(str,"utf-8",(err,data)=>{
        if (err) {
            console.log(chalk.red("File read failed!!!"));
            
        } else {
            if (data.length) {
                console.log(chalk.green("Here are your tasks:\n"));
                console.log(chalk.blue(data));
            } else {
                console.log("No task here.");
                
            }
        }
    })
})
//delete the task
program.command("delete")
.description("delete a specific task from your file.")
.argument("<string>", "Task to delete.")
.option("-f,--file <string>", "File name.")
.action((task, option) => {
    fs.readFile(option.file, "utf-8", (err, data) => {
        if (err) {
            console.log(chalk.red("File read failed!!!"), err);
        } else {
            // Convert file content to an array of tasks
            const tasks = data.split('\n').filter(Boolean); // Remove empty lines
            const updatedTasks = tasks.filter(t => t !== task); // Remove the task
            
            if (tasks.length === updatedTasks.length) {
                console.log(chalk.yellow("Task not found!"));
            } else {
                fs.writeFile(option.file, updatedTasks.join('\n') + '\n', (err) => {
                    if (err) {
                        console.log(chalk.red("Failed to write to file!!!"), err);
                    } else {
                        console.log(chalk.green("Task deleted successfully."));
                    }
                });
            }
        }
    });
});
//edit the task
program.command("edit")
.description("Edit a specific task.")
.argument("<string>","oldTask")
.argument("<string>","newTask")
.option("-f,--file <string>","File name.")
.action((oldTask,newTask,option)=>{
    fs.readFile(option.file,"utf-8",(err,data)=>{
        if (err) {
            console.log(chalk.red("File read failed!!!"));
        } else {
            //convert data into an array
            const tasks = data.split("\n").filter(Boolean)
            //find the old task
            const taskIndex = tasks.indexOf(oldTask)

            if(taskIndex === -1){
                console.log(chalk.red("Task not found!!"));
            }else{
                //replace the old task by new task
                tasks[taskIndex] = newTask
            }
            //write the update task back to the file.
            fs.writeFile(option.file,tasks.join("\n") + "\n",(err,data)=>{
                if (err) {
                    console.log(chalk.red("File write failed"));
                    
                } else {
                    console.log(chalk.green("Task edit successfully."));
                    
                }
            })

        }
    })
})
program.command("clean")
.description("Clear the whole file.")
.option("-f,--file <string>","File name")
.action((option)=>{
    fs.writeFile(option.file,"",(err,data)=>{
        if (err) {
            console.log(chalk.red("File wirte failed!!!"));
            
        } else {
            console.log(chalk.blue("File clean successfull."));
            
        }
    })
})

program.parse()