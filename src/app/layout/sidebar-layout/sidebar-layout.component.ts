import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-sidebar-layout',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './sidebar-layout.component.html'
})
export class SidebarLayoutComponent {}
