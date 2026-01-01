import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

   loader=new BehaviorSubject<boolean>(false);
  show()
  {
    this.loader.next(true);
  }
  hide()
  {
    this.loader.next(false);
  }
}
