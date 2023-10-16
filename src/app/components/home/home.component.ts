import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/interfaces/product';
import { CuttextPipe } from 'src/app/core/pipe/cuttext.pipe';
import { Category } from 'src/app/core/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CuttextPipe, CarouselModule, RouterLink, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private _ProductService: ProductService, private _CartService: CartService, private _ToastrService: ToastrService, private _Renderer2: Renderer2) { }

  products: Product[] = [];
  categories: Category[] = [];
  term:string = '';

  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
      },
    })

    this._ProductService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data;
      },
    })
  }

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    autoplay: true,
    autoplayTimeout: 6000,
    autoplaySpeed: 2000,
    autoplayHoverPause: true,
    nav: false
  }

  mainSlideOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navText: ['', ''],
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 2000,
    slideTransition: "linear",
    autoplayHoverPause: true,
    nav: false
  }

  addProduct(id: any, element: HTMLButtonElement): void {

    this._Renderer2.setAttribute(element, 'disabled', 'true')

    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message);
        this._Renderer2.removeAttribute(element, 'disabled');

        this._CartService.cartNumber.next(response.numOfCartItems);
      },
      error: (err) => {
        this._Renderer2.removeAttribute(element, 'disabled');
      },
    })
  }

  

}
