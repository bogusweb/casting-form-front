import {Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {CastingCategory} from "./interfaces";
import {tap} from "rxjs/operators";
import {MatFileUploadQueue} from "angular-material-fileupload";
import { environment } from '../environments/environment';
import {MatSnackBar, MatVerticalStepper} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLinear: boolean = false;
  debugger: boolean = environment.debugger;
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
  @ViewChild('stepper') stepper: MatVerticalStepper;

  constructor(
    private _formBuilder: FormBuilder,
    private service: AppService,
    public snackBar: MatSnackBar
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

    this.additionalDataFormGroup = this._formBuilder.group({

      size: this._formBuilder.group({
        up: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        down: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        shoe: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        breast: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        hips: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
        waist: [null, Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      }),

      body: this._formBuilder.group({
        beauty: [null],
        figure: [null],
        physique: [null],
        breastChest: [null],
        legs: [null],
        hands: [null],
      }),

      face: this._formBuilder.group({
        ears: [null],
        eyes: [null],
        nose: [null],
        lipsTeeth: [null],
        eyeColor: [null],
        characteristics: [null],
      }),

      hair: this._formBuilder.group({
        color: [null],
        length: [null],
        quality: [null],
        type: [null],
        hue: [null],
        other: [null]
      })

    });

    this.skillsFormGroup = this._formBuilder.group({
      skills: this._formBuilder.array([])
    });

    this.descriptionsFormGroup = this._formBuilder.group({
      short: [null, Validators.maxLength(1000)],
      additional: [null, Validators.maxLength(1000)]
    });

    this.approvalFormGroup = this._formBuilder.group({
      clause: [false, [Validators.requiredTrue]],
      processing: [false, [Validators.requiredTrue]]
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

  toggleLinearStepper(): void {
    this.isLinear = !this.isLinear;
  }

  setTestValues(): void {
    this.castingCategoryFormGroup.get('castingCategory').setValue(1);

    this.basicDataFormGroup.get('name').setValue('John');
    this.basicDataFormGroup.get('surname').setValue('Doe');
    this.basicDataFormGroup.get('sex').setValue('Men');
    this.basicDataFormGroup.get('phone').setValue('+48 123 456 789');
    this.basicDataFormGroup.get('email').setValue('john.doe@gmail.com');
    this.basicDataFormGroup.get('birthDate').setValue('2018-10-08T22:00:00.000Z');
    this.basicDataFormGroup.get('placeOfResidence').setValue('Warsaw');
    this.basicDataFormGroup.get('nationality').setValue('Poland');
    this.basicDataFormGroup.get('portfolioLink').setValue('http://wp.pl');

    this.additionalDataFormGroup.get('size').get('up').setValue('12');
    this.additionalDataFormGroup.get('size').get('down').setValue('23');
    this.additionalDataFormGroup.get('size').get('shoe').setValue('34');
    this.additionalDataFormGroup.get('size').get('breast').setValue('45');
    this.additionalDataFormGroup.get('size').get('hips').setValue('56');
    this.additionalDataFormGroup.get('size').get('waist').setValue('67');

    this.additionalDataFormGroup.get('body').get('beauty').setValue('Autumn');
    this.additionalDataFormGroup.get('body').get('figure').setValue('Pear');
    this.additionalDataFormGroup.get('body').get('physique').setValue('Skinny');
    this.additionalDataFormGroup.get('body').get('breastChest').setValue('Asymmetric');
    this.additionalDataFormGroup.get('body').get('legs').setValue('Muscular');
    this.additionalDataFormGroup.get('body').get('hands').setValue('Well cared for');

    this.additionalDataFormGroup.get('face').get('ears').setValue('Average');
    this.additionalDataFormGroup.get('face').get('eyes').setValue('Dished');
    this.additionalDataFormGroup.get('face').get('nose').setValue('Upturned');
    this.additionalDataFormGroup.get('face').get('lipsTeeth').setValue('Horseshoe-shaped');
    this.additionalDataFormGroup.get('face').get('eyeColor').setValue('Grey');
    this.additionalDataFormGroup.get('face').get('characteristics').setValue('Lorem ipsum solor dolor');

    this.additionalDataFormGroup.get('hair').get('color').setValue('Blond');
    this.additionalDataFormGroup.get('hair').get('length').setValue('Long');
    this.additionalDataFormGroup.get('hair').get('quality').setValue('Rare');
    this.additionalDataFormGroup.get('hair').get('type').setValue('Destroyed');
    this.additionalDataFormGroup.get('hair').get('hue').setValue('Bright');
    this.additionalDataFormGroup.get('hair').get('other').setValue('Lorem ipsum solor dolor');

    this.addNewSkill();
    this.addNewSkill();

    this.descriptionsFormGroup.get('short').setValue(
      'When their enemies were at the gates the Romans would suspend democracy and appoint one man to protect the city. It wasn\'t considered an honor, it was a public service.\n'
    );

    this.descriptionsFormGroup.get('additional').setValue(
      'When their enemies were at the gates the Romans would suspend democracy and appoint one man to protect the city. It wasn\'t considered an honor, it was a public service.\n'
    );

    this.snackBar.open('Form filled', 'Close', {
      duration: 2500
    });

  }

  sendFormData(): void {
    const basicData = this.basicDataFormGroup.value;
    const descData = this.descriptionsFormGroup.value;

    const data = {
      "Name": basicData.name,
      "Surname": basicData.surname,
      "sex": basicData.sex,
      "phone": basicData.phone,
      "email": basicData.email,
      "birthDate": basicData.birthDate,
      "placeOfResidence": basicData.placeOfResidence,
      "nationality": basicData.nationality,
      "portfolioLink": basicData.portfolioLink,
      "shortDescription": descData.short,
      "approvalClause": this.approvalFormGroup.value.clause,
      "approvalProcessing":  this.approvalFormGroup.value.processing,
      "images": [
        "string"
      ],
      "dimensions": this.additionalDataFormGroup.value.size,
      "body":  this.additionalDataFormGroup.value.body,
      "face":  this.additionalDataFormGroup.value.face,
      "hair":  this.additionalDataFormGroup.value.hair,
      "skills": this.skillsFormGroup.value.skills,
      "additionalInformation":  descData.additional,
      "castingCategory": this.castingCategoryFormGroup.value.castingCategory
    };

    this.service.postCastingForm(data).subscribe( res => {
      console.log(res)
    }, (error1) => {
      console.log(error1)
    }, () => {
      this.snackBar.open('Application saved!', 'Close', {
        duration: 5000
      });

      this.resetForm();
    });
  }

  resetForm(): void {
    this.stepper.reset();

    this.approvalFormGroup.reset();
    this.basicDataFormGroup.reset();
    this.descriptionsFormGroup.reset();
    this.additionalDataFormGroup.reset();
    this.castingCategoryFormGroup.reset();
    this.skillsFormGroup.reset();
  }

}
