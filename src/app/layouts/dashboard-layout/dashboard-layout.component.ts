import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive]
})
export class DashboardLayoutComponent {
  currentTheme: string = 'light-theme';
  isSidebarOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.currentTheme = savedTheme;
      document.body.classList.add(this.currentTheme);
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme() {
    document.body.classList.remove(this.currentTheme);
    this.currentTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    document.body.classList.add(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 