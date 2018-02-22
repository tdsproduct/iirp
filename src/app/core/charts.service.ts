import { Injectable } from '@angular/core';


import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChartsService {

  constructor(private _http: HttpClient) { }

  dailyForecast() {
    return this._http.get("https://sheetlabs.com/NUME/IOT")
      .map(result => result);
  }
  certainweek(a){
    //console.log(a);
    return this._http.get("https://sheetlabs.com/NUME/IOTfilter.json?week="+a)
    .map(result => result);
  }

}


