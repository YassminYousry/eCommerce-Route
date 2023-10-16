import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Brand } from 'src/app/core/interfaces/brand';
import  Swal  from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Branddetails } from 'src/app/core/interfaces/branddetails';


@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule,SweetAlert2Module],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(private _ProductService: ProductService) { }
  brandId: string | null = '';
  brandData: Brand[] = [];
  brandDetail:Branddetails = {} as Branddetails;


  ngOnInit(): void {
    this._ProductService.getBrands().subscribe({
      next: (response) => {
        this.brandData = response.data;
      }
    })
    this._ProductService.getBrandDetails(this.brandId).subscribe({
      next: (response) => {
        this.brandDetail = response.data;
      }
    })
  }

  brandDetails():void{
    Swal.fire({
      title: 'Sweet!',
      text: 'Modal with a custom image.',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
}
