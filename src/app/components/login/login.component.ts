import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router, UrlTree } from '@angular/router';

// import { AuthService } from '../../auth/auth.service';
import { DxAdminApiService } from '../../services/dx-admin-api.service';
import { MatSnackBar} from '@angular/material/snack-bar';

// import jwtDecode from 'jwt-decode';

import { CONFIG } from '../../../environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  formSubmitAttempt: boolean = false;
  responseType!: string;
  redirectUri!: string;
  clientId!: string;
  scope!: string;
  state!: string;

  userName = '';
  password = '';
  mqttAPIKey: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    // private authService: AuthService,
    private dxAdminApiService: DxAdminApiService,
    private snackBar: MatSnackBar,
  ) {

    this.mqttAPIKey = localStorage.getItem('mqttpwd_' + CONFIG.client_id) || '';
    
    this.form = this.fb.group({
      // prefix: ['community-api', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      mqttAPIKey: [this.mqttAPIKey]
    });
  }

  ngOnInit() {
    const qp = this.route.snapshot.queryParams;
    this.responseType = qp.response_type || '';
    this.redirectUri = qp.redirect_uri || '';
    this.clientId = qp.client_id || '';
    this.scope = qp.scope || '';
    this.state = qp.state || '';
  }

  isFieldInvalid(name: string) {
    const field = this.form.get(name);
    return (
      (!field?.valid && field?.touched) ||
      (field?.untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() { 
    if (this.form.valid) {
      this.userName = this.form.get('userName')?.value;
      this.password = this.form.get('password')?.value;
      this.mqttAPIKey = this.form.get('mqttAPIKey')?.value;
      // const mqttTopic = this.form.get('mqttTopic')?.value;

      this.dxAdminApiService.getToken(
        'client_credentials', `${CONFIG.DXAPI_PROFILE}/${this.userName}`, this.password, false, '12hours'
      ).subscribe(
        data => {
          if (data) {

            const decodedAccessToken = JSON.parse(atob(data.access_token.split('.')[1]));
            // const decodedAccessToken = jwtDecode(data.access_token) as any;
            const subscriberIdShort = decodedAccessToken.scope[0].split(':')[1];
            const subscriberId = (100000000 + parseInt(subscriberIdShort, 10)).toString();
            const mqttTopic = `dev-ope|${subscriberId}/LE_AS/abeemap`;

            sessionStorage.setItem('mqttusr_' + CONFIG.client_id, this.userName);
            localStorage.setItem('mqttpwd_' + CONFIG.client_id, this.mqttAPIKey);
            sessionStorage.setItem('mqtttop_' + CONFIG.client_id, mqttTopic);

            const parsedRedirectUri = new URL(this.redirectUri);
            parsedRedirectUri.searchParams.append('access_token', data.access_token);
            parsedRedirectUri.searchParams.append('state', this.state);
            setTimeout(
              () => { window.location.href = parsedRedirectUri.href; },
              500
            );
          }
        },
        error => {
          this.snackBar.open(
            'ERROR: ' + JSON.stringify(error.error),
            'x', {
              panelClass: ['red-snackbar'],
            }
          );
        }
      );
    }
    this.formSubmitAttempt = true;
  }

  clearMQTTAPIKey() {
    this.form.patchValue({mqttAPIKey: ''});
    localStorage.removeItem('mqttpwd_' + CONFIG.client_id);
  }

}

