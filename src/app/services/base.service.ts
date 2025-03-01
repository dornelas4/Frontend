import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs/internal/Observable';

export class BaseService {
    private authService: AuthService;
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    public getDefaultHttpOptions() {
        let token = '';

        if (this.authService.isAuthenticated()) {
            token = this.authService.authorizationHeaderValue;
        }

        return {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            authorization: token
          })
        };
    }
    protected returnFakeObserver(): Observable<never> {
      return new Observable(observer => {
        setTimeout(() => {
          observer.next();
        }, 200);
      });
    }
}
