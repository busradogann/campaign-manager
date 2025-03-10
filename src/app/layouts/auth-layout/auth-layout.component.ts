import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterOutlet]
})
export class AuthLayoutComponent implements OnInit {
  currentTheme: string = 'light-theme';

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.currentTheme = savedTheme;
    }

    document.body.classList.add(this.currentTheme);
  }

  toggleTheme() {
    document.body.classList.remove(this.currentTheme);
    this.currentTheme = this.currentTheme === 'light-theme' ? 'dark-theme' : 'light-theme';
    document.body.classList.add(this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
  }
}
