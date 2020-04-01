import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  getItem(key: string, encode: boolean = false) {

    let data = localStorage.getItem(key);
    if (encode) {
      data = btoa(data);
    }
    return data;
  }


  setItem(key: string, value: string, encode: boolean = false) {

    let data = value;
    if (encode) {
      data = btoa(data);
    }
    localStorage.setItem(key, data);
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

}
