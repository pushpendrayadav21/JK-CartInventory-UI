import { FormControl, ValidationErrors } from "@angular/forms";

export class ITValleyValidators {
    static notOnlyWhiteSpace(control:FormControl):ValidationErrors{
        //check if String contains only white space
        if(control.value != null &&(control.value.trim().length == 0)){
            // invalid, return error object
            return {'notOnlyWhiteSpace':true}
        }
        else{
            return null;
        }
        
    }
}
