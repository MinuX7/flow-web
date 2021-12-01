import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  @Output()
  toStepEvent = new EventEmitter<number>();

  @Output()
  personGroupChanged = new EventEmitter<any>();


  userForm: FormGroup;
  constructor(route: ActivatedRoute ) {
    this.userForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl(''),
      email: new FormControl(''),
      comment: new FormControl(''),
      file: new FormControl(),
      fileContent: new FormControl
    });
    const routeParams = route.snapshot.paramMap;
    console.log(routeParams.get('company'));
   }

  ngOnInit(): void {
    this.userForm.valueChanges
    .subscribe(() =>
      this.personGroupChanged.emit(this.userForm.value)
      );
  }

  toStep(number) {
    this.toStepEvent.emit(number);
  }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.userForm.patchValue({
          fileContent: reader.result
        });
        
        // need to run CD since file load runs outside of zone
        // this.cd.markForCheck();
      };
    }
  }

}
