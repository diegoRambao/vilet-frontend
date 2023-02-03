import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StorageKeys } from 'src/app/core/const/storage-keys';
import { StorageService } from 'src/app/core/domain/storage.service';
import { UserType } from 'src/app/shared/types/user-type.enum';
import { UserRegisterUseCase } from '../../../domain/usecases/user.register.usecase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  public form!: FormGroup;
  public loading = false;

  constructor(
    private avtivatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userRegisterUseCase: UserRegisterUseCase,
    private router: Router,
    private storage: StorageService,
  ) {
    this.initializeForm();
    const state = this.router.getCurrentNavigation()?.extras.state
    console.log(state);
    this.form.patchValue({ ...state });
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      type: [UserType.client,],
      phone: ['', Validators.required],
      category: [''],
      country: [''],
      latitude: [''],
      longitude: [''],
      place: [''],
      placeName: [''],
      region: [''],
    });
  }

  public submit(): void {
    this.loading = true
    this.form.markAllAsTouched();
    if (!this.form.valid) return;

    this.userRegisterUseCase.execute(this.form.value).subscribe(
      (data) => {
        this.form.reset();
        this.storage.set(StorageKeys.currenUser, data.user);
        this.storage.set(StorageKeys.token, data.token);
        this.router.navigate(['home']);
      },
      (error) => console.error(error),
      () => this.loading = false
    );
  }
}
