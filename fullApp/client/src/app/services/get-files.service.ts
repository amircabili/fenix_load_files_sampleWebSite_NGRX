import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {  Observable , Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetFilesService {

  constructor(private http: HttpClient,) { }
  globalData = new Observable();
  private subject = new Subject<any>();

  getFilesData(){
    this.globalData = new Observable(observer => {
      let obj : any ;
                    this.http.get<any>("http://localhost:4002/api/")
                    .subscribe(resp=>{
                          obj = resp
                          observer.next(obj);
                    })
      });
      return this.globalData;
  }


  /////////////// rxjs Subject //////////////////


  updateFiles(): void {
    this.subject.next({});
  }

  updateFilesEvent(): Observable<any>{
    return this.subject.asObservable();
  }



}
