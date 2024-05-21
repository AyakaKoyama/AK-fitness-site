export class Article {
  constructor(
    public articleID: string,
    public author: string,
    public contents: string,
    public category: Category | null
  ) {}
}
//オブジェクト
export class Category {
  constructor(public id: number, public name: string) {}
}
