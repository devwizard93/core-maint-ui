import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'], // o usa styles inline
})
export class SidebarComponent {

sidebarVisible = false;
isSmallScreen = false;

ngOnInit() {
  this.checkScreen();
  window.addEventListener('resize', () => this.checkScreen());
}

checkScreen() {
  this.isSmallScreen = window.innerWidth < 768;
  if (!this.isSmallScreen) {
    this.sidebarVisible = false;
  }
}

toggleSidebar() {
  this.sidebarVisible = !this.sidebarVisible;
}

closeSidebar() {
  if (this.isSmallScreen) {
    this.sidebarVisible = false;
  }
}




}


