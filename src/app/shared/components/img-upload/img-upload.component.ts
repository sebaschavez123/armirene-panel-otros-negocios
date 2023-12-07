import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img-upload',
  templateUrl: './img-upload.component.html',
  styleUrls: ['./img-upload.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ImgUploadComponent implements OnInit, OnChanges {
  @Input() parentForm: any;
  @Output() emitFileUrl = new EventEmitter<string>();
  imageSrc: string | ArrayBuffer | null = null;
  selectedFile;
  uploadFile;
  loading: boolean = false;
  constructor(
    private http: HttpClient
  ) { }


  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    let imageUrl = changes['parentForm'].currentValue.imageUrl ?
      changes['parentForm'].currentValue.imageUrl : changes['parentForm'].currentValue.image
    if (imageUrl) {
      this.uploadFile = imageUrl;
    }
  }

  upload() {
    const formData = new FormData();
    this.loading = true;
    formData.append('file', this.selectedFile);
    this.http.post('https://us-central1-armirene-369418.cloudfunctions.net/upload-img', formData)
      .subscribe((res: any) => {
        this.loading = false;
        this.uploadFile = `https://storage.googleapis.com/images-pon/${res.file?.name}`
        this.emitFileUrl.emit(this.uploadFile);
      });
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
