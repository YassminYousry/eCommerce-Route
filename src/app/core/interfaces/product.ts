export interface Product {
    _id? : string;
    title: string;
    category: Category;
    imageCover: string;
    ratingsAverage: number;
    price: number;
}
export interface Category {
    name: string;
}
