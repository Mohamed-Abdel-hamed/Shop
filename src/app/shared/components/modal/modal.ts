import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-modal',
  imports: [SwalComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal implements OnChanges {

@ViewChild('mySwal') mySwal!: SwalComponent;
@Input()title:string='';
@Input()text:string='';
@Input()icon:string='';
@Input()showCancelButton:boolean=false;
@Input()confirmButtonText:string='';
@Input()cancelButtonText:string='';
@Input()confirmButtonColor:string='';
@Input()cancelButtonColor:string='';
@Input()itemId!:number;
@Output()Confirmed=new EventEmitter<number>();
  swalOptions: any = {};
  ngOnChanges(changes: SimpleChanges): void {
    this.swalOptions = {
      title: this.title,
      text: this.text,
      icon: this.icon as SweetAlertIcon,
      showCancelButton: this.showCancelButton,
      confirmButtonText: this.confirmButtonText,
      cancelButtonText: this.cancelButtonText,
      confirmButtonColor: this.confirmButtonColor,
      cancelButtonColor: this.cancelButtonColor,
      allowOutsideClick: false,
      allowEscapeKey: false
    };
  }
  open() {
    this.mySwal.fire().then((result) => {
  if (result.isConfirmed &&this.itemId) {
    this.Confirmed.emit(this.itemId);
  };
  })
}

}
