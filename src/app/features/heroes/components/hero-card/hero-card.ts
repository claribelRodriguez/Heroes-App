import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Hero } from '../../../../core/models/heroe.model';

@Component({
  selector: 'app-hero-card',
  standalone: true,
  templateUrl: './hero-card.html',
  styleUrl: './hero-card.scss',
  imports: [MatIconModule, MatButtonModule, MatDialogModule, CommonModule],
})
export class HeroCardComponent {
  hero: Hero;

  getHeroImage(image: string | string[] | undefined): string {
    if (!image) return 'assets/images/default-hero.png';
    return Array.isArray(image) ? image[0] : image;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: { hero: Hero }) {
    this.hero = data.hero;
  }
}
