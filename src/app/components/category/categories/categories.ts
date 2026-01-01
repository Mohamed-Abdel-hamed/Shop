import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { NgClass } from '@angular/common';
import { Icategory } from '../../../models/icategory';

@Component({
  selector: 'app-categories',
  imports: [NgClass],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  categories:Icategory[]=[];
constructor(private categoryService:CategoryService)
{

}
  ngOnInit(): void {
    this.categoryService.getAll().subscribe({
      next:(res)=>{
        this.categories=res
      }
    })
  }


}
