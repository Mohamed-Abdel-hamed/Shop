import { Component } from '@angular/core';
import { Navbar } from '../../navbar/navbar';
import { Footer } from '../../footer/footer';
import {  RouterOutlet } from '@angular/router';
import { Inavitem } from '../../../models/inavitem';
import { Loader } from "../../../shared/components/loader/loader";

@Component({
  selector: 'app-public-layout',
  imports: [Navbar, Footer, RouterOutlet, Loader],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.css',
})
export class PublicLayout {

}
