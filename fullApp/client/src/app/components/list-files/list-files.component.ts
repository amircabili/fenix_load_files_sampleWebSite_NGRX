import { Component, OnInit } from '@angular/core';
import {Observable, Observer, Subscription} from 'rxjs';
import { GetFilesService } from '../../services/get-files.service'
import {Store} from "@ngrx/store";
import { baseFile } from '../../models/baseFile.model';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.scss']
})
export class ListFilesComponent implements OnInit {
  public filesData: any;
  public count: Observable<any> | undefined;
  public fileName: Observable<any> | undefined;
  public getFilesServiceObserver : Subscription | undefined
  public  subscription;
  public files : Observable<baseFile[]> | undefined;
  public fileCounter: number | undefined
  private value: any;

  constructor(
    private getFilesService: GetFilesService,
    private store: Store<{files: baseFile[]}>
    ) {
    this.subscription = this.getFilesService.updateFilesEvent().subscribe(messege => {
      this.loadData();
    });
  }

  loadData(){
    // this.fileCounter = this.files.length

    this.getFilesServiceObserver = this.getFilesService.getFilesData()
    .subscribe(
      (res: any)=>
        {
          this.filesData = res.ImageBaseData;
        }
      );
    }

    ngOnInit(): void {
      this.files =  this.store.select(data => data.files);
      this.loadData();
    }

  download(file: String | undefined, text: String | undefined) {
        //creating an invisible element
        var element = document.createElement('a');
        // @ts-ignore
    // @ts-ignore
    element.setAttribute('href',
          'data:text/plain;charset=utf-8, '
      // @ts-ignore
          + encodeURIComponent(text));
    if (typeof file === "string") {
      element.setAttribute('download', file);
    }
        // Above code is equivalent to
        // <a href="path of file" download="file name">
        document.body.appendChild(element);
        //onClick property
        element.click();
        document.body.removeChild(element);
  }

  // Start file download.
  clickOnRow(file: baseFile) {
            // Generate download of hello.txt
            // file with some content
            // @ts-ignore
             var text: String | undefined ="";
             var filename: String | undefined ="";
              text = file.fileName;

             filename = file.fileName;

            this.download(filename, text);
      }

}
