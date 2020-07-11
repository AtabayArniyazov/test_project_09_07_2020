import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VideoItemModel } from './video-item.model';

@Injectable({
  providedIn: 'root'
})
export class VideoItemService {
  private readonly headers = new HttpHeaders({
    'cache-key': 'video-item',
    'content-type': 'application/json'
  });

  constructor(private http: HttpClient) {
  }

  public getData(): any {
    const url1 = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk&maxResults=50&type=video&part=snippet&q=john';
    const url2 = 'assets/linkData.json'; //use this url2 if you got 403 from url1

    return this.http.get(url1, {headers: this.headers})
      .toPromise()
      .then((json: any) => {
        return (json.items || []).map((item) => {
          return VideoItemModel.fromJSON(item);
        });
      })
      .catch((error) => {
        throw Error(error);
      });
  }
}
