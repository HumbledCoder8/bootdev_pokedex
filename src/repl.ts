
import type { State } from "./state.js";


export function startREPL(state: State){


    state.rl.prompt()
    state.rl.on("line", async (input) => { 
        const cleaned_input = cleanInput(input);

        if (cleaned_input.length === 0){

            state.rl.prompt();
            return;
        }

        //console.log(`Your command was: ${cleaned_input[0]}`);

            const command = state.commands[cleaned_input[0]];
            
            if(!command){
                console.log("Invalid command");
            }

            else{
                try{
                    await command.callback(state);
                }
                catch (e){
                    console.log((e as Error).message);
                }
                

            }
            

    
        state.rl.prompt();

    })

}



export function cleanInput(input:string):string[]{
    input = input.toLowerCase();
    input = input.trim();

    const newArray = input.split(/\s+/);

    return newArray.filter((word)=> word !== "");
    
   


}
