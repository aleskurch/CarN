import { FormControl } from "@angular/forms";

export interface AddNumberFormGroupInterface {
  number: FormControl<string | null>;
  holder: FormControl<string | null>;
}
