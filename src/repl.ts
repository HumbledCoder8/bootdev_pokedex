import { Interface } from "node:readline";
import readline from "readline"
import { getCommands } from "./commands.js";
import { State } from "./state.js";


export function startREPL(state: State){


    state.rl.prompt()
    state.rl.on("line", (input) => {
        const cleaned_input = cleanInput(input);

        if (cleaned_input.length === 0){

            state.rl.prompt();
            return;
        }

        //console.log(`Your command was: ${cleaned_input[0]}`);

        try{
            const input_command = getCommands();
            const command = input_command[cleaned_input[0]];
            command.callback(input_command);

        }
        catch(error){
            console.error(`Unknown Error`);
        }
        rl.prompt();

    })

}



export function cleanInput(input:string):string[]{
    input = input.toLowerCase();
    input = input.trim();

    const newArray = input.split(/\s+/);

    return newArray.filter((word)=> word !== "");
    
   


}
