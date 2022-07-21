import { Component, OnInit } from '@angular/core';
import { TweetService } from '../service/tweet.service';
import { Tweet } from '../interface/tweet';
import { AuthService } from '../service/auth.service';
import { tap } from 'rxjs';
import { data } from 'autoprefixer';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css'],
})
export class TweetComponent implements OnInit {
  content = '';

  tweets: Tweet[] | undefined;

  constructor(private tweetService: TweetService, public auth: AuthService) {}

  ngOnInit(): void {
    this.getTweets();
  }

  getTweets() {
    this.tweetService.getTweets().subscribe((tweets) => {
      this.tweets = tweets;
    });
  }

  submit() {
    const accessToken = this.auth.getAccessToken();

    if (!accessToken) {
      this.auth.logout();
      location.href = '/signup';
      return;
    }

    this.tweetService.post(this.content, accessToken).subscribe(() => {
      this.getTweets();
    });
    this.content = '';
  }
}
