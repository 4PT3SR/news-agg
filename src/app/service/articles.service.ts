import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { article,response } from '../../utils';
import { environment } from '../../environments/environment.development';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Api-Key': '1063c1d230014a12a5f0689bcde97b65'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {


  newsLimit = 10; //limit for each post
  key1 = environment.apiKey; //apiKey
  newsPage = 1; //page for the api
  
  constructor(private http:HttpClient) { }

  //Get articles
  // this.newsUrl,{headers:httpOptions.headers}
  // getArticles(page:number = 1):void {
  //   this.http.get<response>(`https://newsapi.org/v2/top-headlines?language=en&pageSize=${this.newsLimit}&page=${page}&apiKey=${this.key1}`).subscribe((response)=>{
  //     const newArticles = response.articles;
  //     this.articlesSubject.next([...this.articlesSubject.getValue(),...newArticles]);
  //   })
  // }
  
  getArticles(page:number,articleType:'everything'|'top-headlines'='top-headlines',searchQuery=''):Observable<response> {
    return this.http.get<response>(`https://newsapi.org/v2/${articleType}?language=en&q=${searchQuery}&pageSize=${this.newsLimit}&page=${page}&apiKey=${this.key1}`)
    


  }
}
