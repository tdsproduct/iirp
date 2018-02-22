import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'form-elements',
    templateUrl: './form-elements.html'
})

export class FormElementsPage implements OnInit {
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('form-elements-ready'));
    }
}