import { Component, OnInit} from '@angular/core';
import { DatePipe } from '@angular/common';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { ArticlesService } from '../../service/articles.service';
import { article } from '../../../utils';
import { SearchComponent } from '../search/search.component';
import { LikeButtonComponent } from '../like-button/like-button.component';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [InfiniteScrollModule, DatePipe,SearchComponent,LikeButtonComponent],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.css'
})
export class ArticlesComponent {
  articles:article[] = []
  page:number = 1;
  articleType: 'everything' | 'top-headlines' = 'top-headlines'
  searchQuery:string = ''
  isInfiniteScrollDisabled = false //stops the scrolling when it reaches last req
  errMessage = ''
  isLoading = false
  toggleIsLoading = () => this.isLoading = !this.isLoading

  loadArticles() {
    this.toggleIsLoading();
    this.articlesService.getArticles(this.page,this.articleType,this.searchQuery).subscribe({
      next:response => this.articles =[...this.articles,...response.articles] ,
      error: err => {
        if(err.status == 426)  { //prevents making more request after the maximum request
          this.isInfiniteScrollDisabled = true
          this.toggleIsLoading();
          return
        }
        this.errMessage=err.error.message;
        this.toggleIsLoading();
        console.log(err)
      },
      complete: () => {this.toggleIsLoading(); this.page++}
    })
  }
  

  constructor(private articlesService: ArticlesService) {}


    searchArticle(search:string) {
      this.articleType = 'everything';
      this.searchQuery = search;
      this.articles = [];
      this.loadArticles()
      
    }

    ngOnInit() {
      
          this.loadArticles()
          
      }

    onScroll() {
      this.loadArticles()
    }

}
