
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ObjectsService } from '../core/objects.service';

@Component ({
    selector: 'objects-list',
    templateUrl: './objects.component.html',
    styleUrls: ['./objects.component.css']
})

export class ObjectsComponent implements OnInit {
    
    objects:Object[];

    constructor(private router: Router, private objectsService: ObjectsService) {}
    
    ngOnInit() {
        window.dispatchEvent(new CustomEvent('table-manage-combine-ready'));
        
        this.objects = this.objectsService.getStaticObjects(); //change this after integrate with database
    }
    
    loadObjectDetailsPage(param:string)
    {
        this.router.navigate(['objects/' + param]);
    }
    loadObjectNewPage() {
        this.router.navigate(['objects/new']);
    }
    
    loadObjectImportPage() {
        this.router.navigate(['objects/import']);
    }
    
}