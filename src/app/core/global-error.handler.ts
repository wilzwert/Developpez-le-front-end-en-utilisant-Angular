import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorService } from './services/error.service';

@Injectable()
export class GlobalErrorHandler extends ErrorHandler {

    constructor(private errorService: ErrorService) {
        super();
    }


    override handleError(error: Error) {
        // Custom error handling logic
        this.errorService.handleError(error);
        // TODO : should the error be thrown again ?
        // throw error;
    }
}