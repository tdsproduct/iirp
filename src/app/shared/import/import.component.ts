import { NgModule} from '@angular/core';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ImportService } from '../../core/import.service';

@Component({
    selector: 'import-component',
    templateUrl: './import.component.html'
})


export class ImportComponent implements OnChanges {  

@Input('importObjectType') importObjectType: string;

jsonBody = {};
results:any;
errorMessage:'';
params:string[];

//-- Reactive Form
importForm = new FormGroup({});
//-- Lookups

constructor(private importService:ImportService, private fb:FormBuilder) {
    
}

ngOnInit(){
    this.createForm();
}

ngOnChanges() { 

}


createForm() {
    //-- Reactive Form
    this.importForm = this.fb.group({
        importOption: '',
        textImport:'',
        serviceImport:'',
        
    });
}

cancelFileUpload() {}

uploadFile(){}
cancelTextUpload(){}
uploadText() {
    
    const newImport = this.importForm.value;

    let jsonText = JSON.parse(newImport.textImport);
    this.params = [this.importObjectType,jsonText];
    this.importService.import(this.params)
        .subscribe(data => {
            //this.results = data['results'];
            console.log(data);
        },
        error => this.errorMessage = <any>error);

    };
}

