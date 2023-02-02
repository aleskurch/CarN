import { HttpErrorResponse } from "@angular/common/http";

import { LoadingStatusInterface } from "../interfaces/loading-status-interface";

export const LOADING_STATUS_ERROR_MOCK: LoadingStatusInterface = {
  loading: false,
  loaded: false,
  error: {} as HttpErrorResponse,
}
