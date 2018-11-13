import { Component, OnInit } from '@angular/core';
import { Rating } from '../../model/rating';
import { RatingService } from '../../services/rating.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Place } from '../../model/place';
import { PlaceService } from '../../services/place.service';

@Component({
  selector: 'app-home-app',
  templateUrl: 'home-app.component.html',
  styleUrls: ['main-styles-css.component.css',
    'stable-styles-css.component.css',
    'slideouts-css.component.css'

    /**
     'homepage-css.component.css',
     'item-page-slideouts-slideouts-cinderella-css.component.css',

    'favorites-component-css.component.css',
    'melody-header-css.component.css',
    'pricesearch-css.component.css',
     */]
  /** */
})

export class HomeAppComponent implements OnInit {
  ratings: Rating[];
  places: Place[];

  constructor(private router: Router, private service: RatingService, private servicep: PlaceService) {}

  ngOnInit() {
    this.service.getRatings().subscribe(data => (this.ratings = data));
    this.servicep.getPlaces().subscribe(data => (this.places = data));
  }

  deleteRating(rating: Rating): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro desea eliminar la evaluacion de ${rating.idRat}
      }?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.service.deleteRating(rating.idRat).subscribe(data => {
          this.ratings = this.ratings.filter(c => c !== rating);
        });

        swal('Eliminado!', 'Se ha eliminado la evaluacion.', 'success');
      }
    });
  }

  editRating(rating: Rating): void {
    localStorage.removeItem('editRatingId');
    localStorage.setItem('editRatingId', rating.idRat.toString());
    this.router.navigate(['edit-rating']);
  }

  addRating(): void {
    this.router.navigate(['add-rating']);
  }

  admiRatings(): void {
    this.router.navigate(['list-rating']);
  }
}
