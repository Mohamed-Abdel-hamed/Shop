import { Component } from '@angular/core';
import { Sidebar } from '../../admin/sidebar/sidebar';
import { RouterModule } from "@angular/router";
import { Loader } from "../../../shared/components/loader/loader";

@Component({
  selector: 'app-adminlayout',
  imports: [Sidebar, RouterModule, Loader],
  templateUrl: './adminlayout.html',
  styleUrl: './adminlayout.css',
})
export class Adminlayout {

}
