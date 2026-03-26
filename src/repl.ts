import { Interface } from "node:readline";
import readline from "readline"


export function startREPL(){
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",

    });

    rl.prompt()
    rl.on("line", (input) => {
        const cleaned_input = cleanInput(input);

        if (cleaned_input.length === 0){

            rl.prompt();
            return;
        }

        console.log(`Your command was: ${cleaned_input[0]}`);
        rl.prompt();

    })

}



export function cleanInput(input:string):string[]{
    input = input.toLowerCase();
    input = input.trim();

    const newArray = input.split(/\s+/);
    console.log(newArray);
    return newArray;


}
