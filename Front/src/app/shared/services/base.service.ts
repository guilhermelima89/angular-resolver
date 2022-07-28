import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'environments/environment';
import { throwError } from 'rxjs';

export abstract class BaseService {
  protected apiUrl: string = environment.apiUrl;

  protected extractAllData(response: any): any {
    return response || {};
  }

  protected extractData(response: any): any {
    return response.data || {};
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  protected serviceError(response: Response | any) {
    const customError: string[] = [];
    const customResponse = { error: { errors: [] } };

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }

    if (response.status === 500 || response.status === 405) {
      customError.push('Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.');

      customResponse.error.errors = customError;
      return throwError(customResponse);
    }

    if (!environment.production) {
      console.error(response);
    }

    return throwError(response);
  }
}
