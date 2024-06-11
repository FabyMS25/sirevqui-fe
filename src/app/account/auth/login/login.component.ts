import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Login Auth
import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import { first } from 'rxjs/operators';
import { ToastService } from './toast-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;

  toast!: false;

  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public toastService: ToastService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }

    //  constructor(
    //   private renderer: Renderer2,private formBuilder: UntypedFormBuilder,
    //   private authService: AuthenticationService,private router: Router,
    //  public toastService: ToastService) {
    //     // redirect to home if already logged in
    //     if (this.authService.isAuthenticated) {
    //       this.router.navigate(['/']);
    //     }
    //    }

  ngOnInit(): void {
    if(sessionStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    //  this.loginForm = this.formBuilder.group({
    //   email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
    //   password: ['123456', [Validators.required]],
    // });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get form() {
    return this.loginForm.controls;
  }

  /**
   * Form submit
   */  async onSubmit() {
    this.submitted = true;  
    try {
      const username = this.form['username'].value;
      const password = this.form['password'].value;  
      if (this.loginForm.valid) {
        const loginSuccessful = await this.authenticationService.login(username, password);
        if (!loginSuccessful) {
          // this.authenticationService.loginContribuyente(username, password)
          // .subscribe((data:any) => { 
          //   if(data.status == 'success'){
          //     sessionStorage.setItem('toast', 'true');
          //     sessionStorage.setItem('currentUser', JSON.stringify(data.data));
          //     sessionStorage.setItem('token', data.token);
          //     this.router.navigate(['/']);
          //   } else {
          //     this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
          //   }
          // });
          this.toastService.show('Login failed', { classname: 'bg-danger text-white', delay: 15000 });
        }
      } else {
        this.loginForm.markAllAsTouched();
        this.toastService.show('Formulario inválido!', { classname: 'bg-warning text-dark', delay: 5000 });
      }
    } catch (error) {
      this.toastService.show("Error en la autenticación", { classname: 'bg-danger text-white', delay: 15000 });
      console.error("Error in logInSubmit:", error);
    }
    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }
  // async logInSubmit() {
  //   this.submitted = true;
  //   try {
  //     const username = this.form['username'].value;
  //     const password = this.form['password'].value;
  //     if (this.loginForm.valid) {
  //       await this.authenticationService.loginByAuth(username,password)          
  //     } else {
  //         this.loginForm.markAllAsTouched();
  //         this.toastService.show('Formulario invalido!');
  //     }
  //   } catch (error) {
  //     this.toastService.show("Error en la autenticación");
  //     console.error("Error in logInSubmit:", error);
  //   }
  // }
  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
