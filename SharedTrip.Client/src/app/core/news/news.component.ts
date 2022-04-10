import { Component, OnInit } from '@angular/core';
import { INews } from 'src/interfaces/INews';
import { NewsService } from 'src/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  public newsData!: Array<INews>
  constructor(private news: NewsService) { }

  ngOnInit(): void {
    this.news.getNews().subscribe(s=>{
      this.newsData = s;
    })
  }

}
