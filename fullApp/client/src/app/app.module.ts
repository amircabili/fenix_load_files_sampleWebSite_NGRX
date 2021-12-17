import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { RouterModule ,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListFilesComponent } from './components/list-files/list-files.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import {StoreModule} from "@ngrx/store";
// import {FileReducer} from './fileReducer';
import {FilesReducer} from './appReducer';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListFilesComponent,
    UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    [RouterModule.forRoot(routes)],
    FormsModule,
    HttpClientModule,
    // @ts-ignore
    StoreModule.forRoot({files : FilesReducer})
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
