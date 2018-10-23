import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  data = {nodes: [], connections: []};
  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  setData(data: any) {
    this.data = data;
  }
  getData() {
    return this.data;
  }
}
