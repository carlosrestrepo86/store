import { Component, inject, signal, Input, SimpleChanges} from '@angular/core';

import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import {Product} from '@shared/models/product.model'
import { HeaderComponent } from '@shared/components/header/header.component'
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]); // Para las categorias
  private cartService = inject(CartService);       // Para signal con señales 
  private productService = inject(ProductService); // Para REST API
  private categoryService = inject(CategoryService); // Para REST API
  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  private getProducts() {
    this.productService.getProducts(this.category_id).subscribe({
      next: (products) => {
        console.log("Datos productos ", products);
        this.products.set(products);
      },
      error: () => {
      }  
    })
  }

  private getCategories() {
    this.categoryService.getAll().subscribe({
      next: (categories) => {
        console.log("Categorias ", categories);
        this.categories.set(categories);

      },
      error: () => {
      }  
    })
  }
}
