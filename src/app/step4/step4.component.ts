import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlowService } from '../flow-service.service';
import { FlowModel } from '../model/flowmodel';

@Component({
  selector: 'step4',
  templateUrl: './step4.component.html',
  styleUrls: ['./step4.component.css']
})
export class Step4Component implements OnInit {

  @Input()
  private flowModel:FlowModel;

  @Output()
  toStepEvent = new EventEmitter<number>();

  @Output()
  personGroupChanged = new EventEmitter<any>();


  userForm: FormGroup;
  constructor(private _flowService: FlowService ) {
    this.userForm = new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required]),
      comment: new FormControl(''),
      file: new FormControl(),
      fileContent: new FormControl
    });
   
   }

  ngOnInit(): void {
    this.userForm.valueChanges
    .subscribe(() =>
      this.personGroupChanged.emit(this.userForm.value)
      );
  }

  onPreviousButtonClicked() {
    this.toStepEvent.emit(3);
  }

  onNextButtonClicked() {
    console.log(this.flowModel);
    this._flowService.createReservetionEvent(this.flowModel).subscribe(data => {
      console.log(data);
      this.toStepEvent.emit(5);
    },
    error => {
      console.error(error);
      alert('Erroare trimitere cerere'+ error.error);
    });
  
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
