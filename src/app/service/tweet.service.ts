import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tweet } from '../interface/tweet';

@Injectable({
  providedIn: 'root',
})
export class TweetService {
  constructor(private http: HttpClient) {}

  getTweets(): Observable<Tweet[]> {
    return this.http.get<Tweet[]>('http://localhost:3000/tweets');
  }

  post(content: string, accessToken: string): Observable<any> {
    return this.http.post(
      'http://localhost:3000/tweets',
      {
        content,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        }),
      },
    );
  }
}
