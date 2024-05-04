

// interface for each article coming from the api
export interface article {
    title: string,
    author?:string,
    description?:string,
    urlToImage?:string,
    publishedAt: Date,
    url?:string

}

//Interface for article http response
export interface response {
    status: 'string',
    totalResults: number,
    articles: article[]
}





