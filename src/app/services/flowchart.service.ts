import {Injectable} from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FlowchartService {
  constructor(private http: HttpClient){

  }
  test (): any {
    return this.http.get('/api/test');
  }

  login(data: any): any {
    return this.http.post('/api/session', JSON.stringify(data)).toPromise();
  }
}
