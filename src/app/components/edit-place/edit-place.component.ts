import { Component, OnInit } from '@angular/core';
import { Place } from '../../model/place';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaceService } from '../../services/place.service';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styles: []
})
export class EditPlaceComponent implements OnInit {

  place: Place;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: PlaceService) { }

  ngOnInit() {

    const placeId = localStorage.getItem('editPlaceId');

    if ( !placeId ) {
      alert('Acción invalida');
      this.router.navigate(['list-place']);
      return;
    }

    this.editForm = this.formBuilder.group({
      idPlace: [],
      namePlace: ['', Validators.required],
      imagePlace: ['', Validators.required],
      descPlace: ['', Validators.required],
      locationPace: ['', Validators.required]
    });

    this.service.getPlace(+placeId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.service.updatePlace(this.editForm.value)
      .pipe(first())
      .subscribe( data => {
        this.router.navigate(['list-place']);
        swal({
          position: 'top',
          type: 'success',
          title: `Sitio modificado con éxito`,
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        alert(error);
      });
  }

}
