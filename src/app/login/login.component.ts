import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;/* 
  submitted = false; */
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      senha: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  get f() { return this.loginForm.controls; }

  set submitted(status: boolean) {
    if (status){
      this.f.email.markAsTouched();
      this.f.senha.markAsTouched();
    }
  }

  onSubmit() {

    this.submitted = true;

    console.log(this.loginForm);

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.email.value, this.f.senha.value)
      .pipe(first()).subscribe(
        res => {
          if (this.authenticationService.currentUserValue) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.loading = false;
            this.snackBar.open('Falha ao efetuar o login', 'ok', { duration: 3000 });
          }
        }
      )


  }

}
