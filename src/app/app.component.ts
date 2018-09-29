import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {CastingCategory} from "./interfaces";
import {tap} from "rxjs/operators";
import {MatFileUploadQueue} from "angular-material-fileupload";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLinear: boolean = false;
  castingCategoryFormGroup: FormGroup;
  basicDataFormGroup: FormGroup;

  castingCategorie$: Observable<CastingCategory[]>;

  @ViewChild('fileUploadQueue') fileUploadQueue: MatFileUploadQueue;

  constructor(
    private _formBuilder: FormBuilder,
    private service: AppService
  ) {
    this.castingCategorie$ = this.service.getCastingCategories();
  }

  ngOnInit() {
    this.castingCategoryFormGroup = this._formBuilder.group({
      castingCategory: ['', Validators.required]
    });

    this.basicDataFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      sex: ['', Validators.required],
      phone: ['', [
        Validators.required,
        Validators.minLength(8),
      ]],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', [Validators.required]],
      placeOfResidence: ['', [Validators.required]],
      nationality: ['', [Validators.required]]
    })
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });

  }
}
