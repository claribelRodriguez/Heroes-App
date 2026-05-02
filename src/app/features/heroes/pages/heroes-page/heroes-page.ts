import { Component, inject } from '@angular/core';

import { HeroListComponent } from '../../components/hero-list/hero-list';
import { HeroFormComponent } from '../../components/hero-form/hero-form';
import { HeroService } from '../../../../core/services/hero.service';

@Component({
  selector: 'app-heroes-page',
  standalone: true,
  imports: [HeroListComponent, HeroFormComponent],
  templateUrl: './heroes-page.html',
  styleUrls: ['./heroes-page.scss'],
})
export class HeroesPageComponent {
  heroService = inject(HeroService);
}

