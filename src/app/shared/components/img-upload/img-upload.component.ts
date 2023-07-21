import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ImgUploadComponent implements OnInit {
  @Input() parentForm: any;
  @Output() emitFileUrl = new EventEmitter<string>();
  imageSrc: string | ArrayBuffer | null = null;
  selectedFile;
  uploadFile;
  constructor(
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.uploadFile = this.parentForm.controls['image'].value
  }

  upload() {
    this.http.post(`https://us-central1-panel-otros-negocios-393215.cloudfunctions.net/uploadImage`, this.selectedFile, this.httpOptions())
      .subscribe((res: any) => {
        this.uploadFile = res.link;
        this.emitFileUrl.emit(this.uploadFile);
      })
  }

  //USAR BUCKET DE PANEL OTROS NEGOCIOS

  protected httpOptions(): { headers: HttpHeaders } {
    const data = {
      'Accept': '*/*',
      'Content-Type': 'image/png',
    };
    return { headers: new HttpHeaders(data) };
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.uploadFile = null;
    this.displayImage(file);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.displayImage(file);
    }
  }

  private displayImage(file: File) {
    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
