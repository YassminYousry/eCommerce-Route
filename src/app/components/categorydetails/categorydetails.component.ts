import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Category } from 'src/app/core/interfaces/category';
import { Subcategory } from 'src/app/core/interfaces/subcategory';

@Component({
  selector: 'app-categorydetails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorydetails.component.html',
  styleUrls: ['./categorydetails.component.scss']
})
export class CategorydetailsComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute, private _ProductService:ProductService) { }

  categoryId: string | null = '';
  categoryDetails:Category = {} as Category
  subCategoryDetails:Subcategory[] = []

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.categoryId = params.get('id');
      }
    })

    this._ProductService.getCategoryDetails(this.categoryId).subscribe({
      next: (response) => {
        this.categoryDetails = response.data
      }
    })

    this._ProductService.getSubCategoryDetails(this.categoryId).subscribe({
      next: (response) => {
        console.log(response);
        this.subCategoryDetails = response.data
      }
    })
  }

}
