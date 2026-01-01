import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { Icategory } from '../../../../models/icategory';
import { CategoryService } from '../../../../services/category.service';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Modal } from '../../../../shared/components/modal/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  imports: [NgClass, RouterLink, Modal],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  @ViewChild(Modal) modal!:Modal;
  categories:Icategory[]=[];
  selectedItemId!:number;
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
open(id:number)
{
    this.selectedItemId=id;
  this.modal.open();
}
toggleStatus(id:number)
{
  this.categoryService.toggleStatus(id).subscribe({
    next:()=>{
      const category=this.categories.find(c=>c.id===id);
      if(category)
      {
        category.isDeleted=!category.isDeleted;
      }
      Swal.fire('Success','Category status changed successfully','success');
    },
    error:()=>{
      Swal.fire('Error','An error occurred while changing category status','error');
    }
  })
}

}

