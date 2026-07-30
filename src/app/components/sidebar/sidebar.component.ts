import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';



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

  // Inyectamos servicios usando standalone
  private authService = inject(AuthService);
  private router = inject(Router);

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

  logout() {
    this.authService.logout();        // rompe el token
    this.router.navigate(['/login']);  // redirige al login
  }


}


