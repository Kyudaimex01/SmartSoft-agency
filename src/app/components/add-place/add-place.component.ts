import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlaceService } from '../../services/place.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styles: []
})
export class AddPlaceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PlaceService) { }

  addForm: FormGroup;

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      idPlace: [],
      namePlace: ['', Validators.required],
      imagePlace: ['', Validators.required],
      descPlace: ['', Validators.required],
      locationPace: ['', Validators.required]
    });
  }

  onSubmit() {
    this.service.createPlace( this.addForm.value )
      .subscribe(data => {
        this.router.navigate(['list-place']);
        swal({
          position: 'top',
          type: 'success',
          title: `Sitio creado con éxito`,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

}
