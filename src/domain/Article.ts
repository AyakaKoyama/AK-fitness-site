export class Article {
  constructor(
    public articleID: string,
    public author: string,
    public contents: string,
    public category: category | null
  ) {}
}
//オブジェクト
export class category {
  constructor(public id: number, public name: string) {}
}
