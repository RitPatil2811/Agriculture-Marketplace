import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-buyer-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './buyer-sidebar.html',
  styleUrl: './buyer-sidebar.css'
})
export class BuyerSidebar {

}