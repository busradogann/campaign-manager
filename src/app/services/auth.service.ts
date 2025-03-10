import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly VALID_USERNAME = 'admin';
  private readonly VALID_PASSWORD = 'admin123';
  private readonly TOKEN_KEY = 'auth_token';

  constructor(private router: Router) {}

  async login(username: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (username === this.VALID_USERNAME && password === this.VALID_PASSWORD) {
          localStorage.setItem(this.TOKEN_KEY, 'dummy_token');
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
} 