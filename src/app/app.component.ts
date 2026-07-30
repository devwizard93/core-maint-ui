import { Component } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {

  constructor(public router: Router) {}


}
