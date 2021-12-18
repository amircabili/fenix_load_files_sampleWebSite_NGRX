import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, ReplaySubject } from 'rxjs';
import {GetFilesService} from "../../services/get-files.service";
import {Store} from "@ngrx/store";
import { baseFile } from '../../models/baseFile.model';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  title = 'FileUploadProject';
  ImageBaseData: string | ArrayBuffer | null   = "";
  fileName: string | undefined
  private fileByTextButton: any;

  constructor(
    private http:HttpClient,
    public getFilesService: GetFilesService,
    private store : Store<{files : baseFile[]}>
    ) {
  }

  ngOnInit(): void {
  }
  base64Output : string | undefined  = "";

  onTextValueClick(){
    // @ts-ignore
    this.fileByTextButton = document.getElementById('fileByText').value;
    let clickedValue;
    clickedValue = this.fileByTextButton

    this.fileName = clickedValue;
    let encodedString = btoa(clickedValue);
      this.base64Output = "";
      this.base64Output = encodedString;
    this.btnUpload();

  }

  onFileSelected(event: { target: any }) {
    this.convertFile(event.target.files[0]).subscribe((base64: string | undefined) => {
      this.base64Output = "";
      this.base64Output = base64;
    });

  }

  convertFile(file : File) : Observable<string> {
    const result = new ReplaySubject<string>(1);
    const reader = new FileReader();
    reader.readAsBinaryString(file);
    this.fileName = file.name;
    reader.onload = (event) => result.next(btoa(event.loaded.toString()));
    return result;
  }

  btnUpload(){
    if(this.base64Output==null){
      alert("Please select file");
    }else{this.getFilesService.updateFiles();
      var fileUplodVM: FileUplodVM={
        fileName:this.fileName,
        ImageBaseData:this.base64Output.toString()
      }
      this.CreateItem(fileUplodVM).subscribe((res: any) =>{
        if(res){

        }else{

        }
      } );
      this.getFilesService.updateFiles();
      this.addStateData(fileUplodVM.ImageBaseData);
      alert("Successfully uploded file");
    }
  }

  addStateData(ImageBaseDataValue: String | undefined)
  {
    let newFile = new baseFile();
    newFile.fileName = this.fileName;
    newFile.ImageBaseData = ImageBaseDataValue;
    this.store.dispatch({type : 'ADD', payload : newFile});
  }

  public CreateItem(data: FileUplodVM) {
    return this.http.post(`http://localhost:4002/api/addFile`,  JSON.parse(JSON.stringify(data)))
    .pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }));
  }
}


export class FileUplodVM{
  fileName: String | undefined;
  ImageBaseData: String | undefined;
}
