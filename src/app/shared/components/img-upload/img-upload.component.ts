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
    const formData = new FormData();
    formData.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(`https://upload-images-dot-stunning-base-164402.appspot.com/upload`, formData)
      .subscribe((res: any) => {
        this.uploadFile = res.link;
        this.emitFileUrl.emit(this.uploadFile);
      })
  }

  //USAR BUCKET DE PANEL OTROS NEGOCIOS

  // protected httpOptions(): { headers: HttpHeaders } {
  //   const data = {
  //     'Accept': 'application/json',
  //     'Authorization': `Bearer ya29.a0AbVbY6NuaWH2h1BSoZ_8-rg2fYlkL3H5bNVmFt35O97ZK7ZsGYiBl0QT19Ivd1XzsT4It38e0LeYiZjwf-TDPVnTSP54CCKRoXSWvhTu4f5ITjmRvi48iGIoNM9RVhxoRIQSB58KORkcuQ6DCNvLD5vkslTq-YcaCgYKAUsSARESFQFWKvPlqCZO2avbVocIkmurKdNRxg0166`,
  //     'Content-Type': 'image/png',
  //   };
  //   return { headers: new HttpHeaders(data) };
  // }

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
