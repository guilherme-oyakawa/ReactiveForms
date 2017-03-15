import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { User } from './user';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit {
    public myForm: FormGroup; // our model driven form
    public submitted: boolean; // keep track on whether form is submitted
    public events: any[] = []; // use later to display form changes

    

    constructor(private _fb: FormBuilder) { } // form builder simplify form initialization

    ngOnInit() {

    // the long way
    // this.myForm = new FormGroup({
    //     name: new FormControl('', [<any>Validators.required, <any>Validators.minLength(5)]),
    //     address: new FormGroup({
    //         street: new FormControl('', <any>Validators.required),
    //         postcode: new FormControl('8000')
    //     })
    // });

    // the short way
        this.myForm = this._fb.group({
            name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            address: this._fb.group({
                street: ['', <any>Validators.required],
                postcode: ['8000']
            })
        })

    this.subcribeToFormChanges();

    (<FormControl>this.myForm.controls['name'])
      .setValue('John', { onlySelf: true });


}

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.myForm.statusChanges;
        const myFormValueChanges$ = this.myForm.valueChanges;
        
        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    save(model: User, isValid: boolean) {
        this.submitted = true; // set form submit to true

        // check if model is valid
        // if valid, call API to save customer
        console.log(model, isValid);
    }
}