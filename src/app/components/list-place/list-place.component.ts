import { Component, OnInit } from '@angular/core';
import { Place } from '../../model/place';
import { PlaceService } from '../../services/place.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-place',
  templateUrl: './list-place.component.html',
  styles: []
})
export class ListPlaceComponent implements OnInit {
  places: Place[];

  constructor(private router: Router, private service: PlaceService) {}

  ngOnInit() {
    this.service.getPlaces().subscribe(data => (this.places = data));
  }

  deletePlace(place: Place): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro desea eliminar el sitio ${place.namePlace} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.service.deletePlace(place.idPlace).subscribe(data => {
          this.places = this.places.filter(c => c !== place);
        });

        swal('Eliminado!', 'Se ha eliminado el sitio.', 'success');
      }
    });
  }

  editPlace(place: Place): void {
    localStorage.removeItem('editPlaceId');
    localStorage.setItem('editPlaceId', place.idPlace.toString());
    this.router.navigate(['edit-place']);
  }

  addPlace(): void {
    this.router.navigate(['add-place']);
  }
}
