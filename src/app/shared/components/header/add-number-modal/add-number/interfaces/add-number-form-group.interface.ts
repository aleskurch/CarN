import { FormControl } from "@angular/forms";

export interface IAddNumberFormGroup {
  number: FormControl<string | null>;
  holder: FormControl<string | null>;
}
