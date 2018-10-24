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
}
