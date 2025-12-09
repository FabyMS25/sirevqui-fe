// user-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveDataService {
  private temporaryUserData: any = null;
  private temporaryData: any = null;
  private temporaryList: any[] = [];

  setTemporaryData(data: any) {
    this.temporaryData = data;
  }

  getTemporaryData() {
    const data = this.temporaryData;
    this.temporaryData = null;
    return data;
  }
  
  setTemporaryUserData(data: any) {
    this.temporaryUserData = data;
  }

  getTemporaryUserData() {
    const data = this.temporaryUserData;
    this.temporaryUserData = null; 
    return data;
  }
  
  setTemporaryListData(data: any[]) {
    this.temporaryList = data;
  }

  getTemporaryListData() {
    const data = this.temporaryList;
    this.temporaryList = []; 
    return data;
  }
}