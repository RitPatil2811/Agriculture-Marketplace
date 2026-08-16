import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [Navbar, Footer],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}