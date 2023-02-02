import { HttpErrorResponse } from '@angular/common/http';

export interface LoadingStatusInterface {
  loading: boolean;
  loaded: boolean;
  error: HttpErrorResponse | null;
}
