import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/core/const/storage-keys';
import { StorageService } from 'src/app/core/domain/storage.service';
import { TokenService } from 'src/app/core/services/token.service';
import { UserModel } from '../../../domain/models/user.module';
import { UserLoginUseCase } from '../../../domain/usecases/user-login.usecase';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.page.html',
  styleUrls: ['./sign.page.scss'],
})
export class SignPage {
  public form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userLoginUseCase: UserLoginUseCase,
    private router: Router,
    private storage: StorageService,
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  submit() {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    this.userLoginUseCase.execute(this.form.value).subscribe((data: { user: UserModel, token: string }) => {
      this.form.reset();
      this.storage.set(StorageKeys.currenUser, data.user);
      this.storage.set(StorageKeys.token, data.token);
      this.router.navigate(['/home']);
    });
  }

}
