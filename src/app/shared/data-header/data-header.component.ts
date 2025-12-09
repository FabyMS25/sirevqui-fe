import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-data-header',
  templateUrl: './data-header.component.html',
  styleUrls: ['./data-header.component.scss']
})
export class DataHeaderComponent {
  @Output() createEmitter = new EventEmitter();
  @Output() consultEmitter = new EventEmitter();
  @Output() notifyEmitter = new EventEmitter();
  @Output() filterEmitter = new EventEmitter();
  @Output() importEmitter = new EventEmitter();
  @Output() exportEmitter = new EventEmitter();

  @Input() newShow!: boolean;
  @Input() consultShow!: boolean;
  @Input() notifyShow!: boolean;
  @Input() exportShow!:boolean;
  @Input() importShow!: boolean;
  @Input() headersImport:any[]=[]
  @Input() title=''

  public openPopup() {
    this.createEmitter.emit();
  }

  public consult() {
    this.consultEmitter.emit();
  }

  public notify() {
    this.notifyEmitter.emit();
  }

  public filterList(event: any){
    this.filterEmitter.emit(event);
  }

  public import(event: any){
    this.importEmitter.emit(event);
  }
  
  public csvFileExport(event: any){
    this.exportEmitter.emit(event);
  }
  downloadExcelTemplate(): void {
    const worksheet = XLSX.utils.aoa_to_sheet([this.headersImport]);
    const workbook = { Sheets: { 'Plantilla Importación': worksheet }, SheetNames: ['Plantilla Importación'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const fileName = `plantilla_importacion_${this.title}.xlsx`;
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(blob, fileName);
  }

}
