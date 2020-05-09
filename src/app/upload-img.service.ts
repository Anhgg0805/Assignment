import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadImgService {
  private images: object[] = [];
  private url: string = "https://api.imgur.com/3/image";
  private clientId: string = "8d09acade249b1c";
  private accessToken: string = "66b84afb952e7ed3fc7dc6dc9f3aa783a2aa9e67";
  imageLink: any;
  constructor(private http: HttpClient) { }


  uploadImage(imageFile: File) {
    let formData = new FormData();
    formData.append("image", imageFile, imageFile.name);

    let header = new HttpHeaders({
      authorization: "Bearer " + this.accessToken
    });

    const imageData = this.http
      .post(this.url, formData, { headers: header }).toPromise();
      // console.log(imageData);
    return imageData;
    

  }

  getImages() {
    return this.imageLink;
  }
}
