import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Products } from "../Product/products/products";

@Component({
  selector: 'app-home',
  imports: [RouterLink, Products],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
