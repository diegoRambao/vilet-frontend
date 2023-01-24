import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserType } from 'src/app/shared/types/user-type.enum';

@Component({
  selector: 'app-what-are-you',
  templateUrl: './what-are-you.page.html',
  styleUrls: ['./what-are-you.page.scss'],
})
export class WhatAreYouPage {
  public userType: UserType | null = null;

  public UserType = UserType;

  constructor(private router: Router) { }

  public changeUserType(userType: UserType): void {
    this.userType = userType;
  }

  public goToSignUp(): void {
    if (!this.userType) return;

    this.router.navigate(['auth/sign-up'], { queryParams: { userType: this.userType } });
  }

}
