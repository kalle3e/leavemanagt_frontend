import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Leave } from "./Leave";
import { Jsondata } from "./jsondata";
import { map } from "rxjs";
import { Testdata } from "./Testdata";
import { Leavedb } from "./Leavedb";

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  // testdata: Testdata = {name: 'Kathie', age: 21};

    httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json' })
    };
  constructor(private http: HttpClient) { }

  baseUrl = 'http://leavemngt'

  // getJasondata() {
  //   return this.http.get<Jsondata>(this.url, this.httpOptions).pipe (
  //     map((res: Jsondata) => {
  //       return res;
  //     })
  //   );
  //
  //
  // }

  getLeave() {
    return this.http.get<Leave[]>(this.baseUrl).pipe(
      map((res: Leave[]) => {
        return res;
      })
    );
  }
  addTeLeave(testdata: Testdata) {
    console.log('In Service call - addTeLeave')
    return this.http.post(`${this.baseUrl}/add`, { data: testdata }).pipe (
      map((res) => {
        return res;
      })
    );
  }

  addLeavedb(leavedata: any) {
    console.log('In Service call - addTeLeave')
    return this.http.post(`${this.baseUrl}/add`, { data: leavedata }).pipe (
      map((res: any) => {
        return res['data'];
      })
    );
  }

}
