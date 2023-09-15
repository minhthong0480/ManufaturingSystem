export default class ProductDto {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public supplier: string,
    public supplier_id: number,
    public cost: number,
    public price: number,
    public category: string,
    public category_id: number,
  ) {}
}
