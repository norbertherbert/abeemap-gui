import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatSnackBar} from '@angular/material/snack-bar';

import { DxLocationApiService } from '../../services/dx-location-api.service';

import { CONFIG } from '../../../environments/environment';

@Component({
  selector: 'app-binder-config',
  templateUrl: './binder-config.component.html',
  styleUrls: ['./binder-config.component.scss']
})
export class BinderConfigComponent implements OnInit {

  formTypeIsCreate = false;

  dismissibleAlert = true;

  binderConfig = {
    ref: '',
    callbackURL: 'https://example.com',
    deviceEUIList: '*',
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private snackBar: MatSnackBar,
    private dxLocationApiService: DxLocationApiService,
  ) { }

  ngOnInit(): void {
    const ref = this.route.snapshot.paramMap.get('ref');
    if (ref === 'create') {
      this.formTypeIsCreate = true;
    } else if (ref) {
      this.formTypeIsCreate = false;
      // TODO: To show loading image!!
      this.get(ref);
    }
  }

  get(ref:string) {
    this.dxLocationApiService.getBinderConfig(ref).subscribe(
      (data) => {
        this.binderConfig = data;
        // this.reportSuccess(data.message.message);
        // this.goBack();
      },
      (error) => {
        this.reportError(error);
      }
    );
  }

  create() {

    this.dxLocationApiService.createBinderConfig(this.binderConfig).subscribe(
      (data) => {
        // this.reportSuccess(data.message.message);
        // this.goBack();
      },
      (error) => {
        this.reportError(error);
      }
    );

  }

  save() {

    this.dxLocationApiService.updateBinderConfig(this.binderConfig.ref, this.binderConfig).subscribe(
      (data) => {
        // this.reportSuccess(data.message.message);
        // this.goBack();
      },
      (error) => {
        this.reportError(error);
      }
    );

  }

  goBack(): void {
    this.location.back();
  }

  reportError(error:any) {
    this.snackBar.open(
      'ERROR: ' + JSON.stringify(error.error),
      'x', {
        panelClass: ['red-snackbar'],
      }
    );       
  }

}
