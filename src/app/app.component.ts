import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {CastingCategory} from "./interfaces";
import {tap} from "rxjs/operators";
import {MatFileUploadQueue} from "angular-material-fileupload";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLinear: boolean = false;
  debugger: boolean = false;
  apiUrl: string = environment.apiUrl;

  castingCategoryFormGroup: FormGroup;
  basicDataFormGroup: FormGroup;
  additionalDataFormGroup: FormGroup;
  skillsFormGroup: FormGroup;
  descriptionsFormGroup: FormGroup;
  approvalFormGroup: FormGroup;

  additionalDataStep: number = 0;

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
      castingCategory: [null, Validators.required]
    });

    const urlReg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

    this.basicDataFormGroup = this._formBuilder.group({
      name: [null, Validators.required],
      surname: [null, Validators.required],
      sex: [null, Validators.required],
      phone: [null, [
        Validators.required,
        Validators.minLength(8),
      ]],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, [Validators.required]],
      placeOfResidence: [null, [Validators.required]],
      nationality: [null, [Validators.required]],
      portfolioLink: [null, Validators.pattern(urlReg)]
    });

    // TODO: Do zrobienia w formGroup
    this.additionalDataFormGroup = this._formBuilder.group({
      upSize: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      downSize: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      shoeSize: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      breastSize: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      hipsSize: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      waistSize: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],

      beautyBody: [null],
      figureBody: [null],
      physiqueBody: [null],
      breastChestBody: [null],
      legsBody: [null],
      handsBody: [null],

      earsFace: [null],
      eyesFace: [null],
      noseFace: [null],
      lipsTeethFace: [null],
      eyeColorFace: [null],
      characteristicsFace: [null],

      colorHair: [null],
      lengthHair: [null],
      qualityHair: [null],
      typeHair: [null],
      hueHair: [null],
      otherHair: [null]
    });

    this.skillsFormGroup = this._formBuilder.group({
      skills: this._formBuilder.array([])
    });

    this.descriptionsFormGroup = this._formBuilder.group({
      short: [null, Validators.maxLength(1000)],
      additional: [null, Validators.maxLength(1000)]
    });

    this.approvalFormGroup = this._formBuilder.group({
      clause: [false, [Validators.required]],
      processing: [false, [Validators.required]]
    });

  }

  setStep(index: number): void {
    this.additionalDataStep = index;
  }

  nextStep(): void {
    this.additionalDataStep++;
  }

  prevStep(): void {
    this.additionalDataStep--;
  }

  addNewSkill(): void {
    let control = <FormArray>this.skillsFormGroup.controls.skills;

    control.push(
      this._formBuilder.group({
        skill: ['']
      })
    );
  }

  removeSkill(index): void {
    let control = <FormArray>this.skillsFormGroup.controls.skills;
    control.removeAt(index);
  }

  toggleDebugger(): void {
    this.debugger = !this.debugger;
  }

}
