import { Component, inject, Signal, input, linkedSignal, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HeroService } from '../../../../core/services/hero.service';
import { Hero } from '../../../../core/models/heroe.model';
import { UppercaseDirective } from '../../../../shared/directives/uppercase.directive';


@Component({
  selector: 'app-hero-form',
  standalone: true,
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UppercaseDirective,
  ],
})
export class HeroFormComponent {
  private fb = inject(FormBuilder);
  private heroService = inject(HeroService);

  
  // Signal Input (Angular 21)
  hero = input<Hero | null>(null);

  heroForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    intelligence: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    strength: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    speed: ['', [Validators.required, Validators.min(1), Validators.max(100)]],
    gender: ['', Validators.required],
    eyeColor: ['', Validators.required],
    placeOfBirth: [''],
    publisher: [''],
  });

  // linkedSignal: Se reinicia automáticamente cuando el input 'hero' cambia
  private formInitializer = linkedSignal({
    source: this.hero,
    computation: (hero) => {
      if (hero) {
        this.heroForm.patchValue({
          name: hero.name || '',
          intelligence: hero.powerstats?.intelligence || '',
          strength: hero.powerstats?.strength || '',
          speed: hero.powerstats?.speed || '',
          gender: hero.appearance?.gender || '',
          eyeColor: hero.appearance?.eyeColor || '',
          placeOfBirth: hero.biography?.placeOfBirth || '',
          publisher: hero.biography?.publisher || '',
        });
      } else {
        this.heroForm.reset();
      }
      return hero;
    }
  });

  constructor() {
    // Registramos el linkedSignal para que esté activo
    effect(() => { this.formInitializer(); });
  }
  
  

  saveHero() {
    if (this.heroForm.invalid) return;

    const heroData: Hero = {
      id: this.hero()?.id ?? crypto.randomUUID(),
      name: this.heroForm.value.name,
      powerstats: {
        intelligence: this.heroForm.value.intelligence,
        strength: this.heroForm.value.strength,
        speed: this.heroForm.value.speed,
      },
      appearance: {
        gender: this.heroForm.value.gender,
        eyeColor: this.heroForm.value.eyeColor,
        height: ['Unknown', 'Unknown'],
        weight: ['Unknown', 'Unknown'],
      },
      biography: {
        fullName: this.heroForm.value.name,
        placeOfBirth: this.heroForm.value.placeOfBirth || 'Desconocido',
        publisher: this.heroForm.value.publisher || 'Desconocido',
        aliases: [],
      },
      work: {
        occupation: 'Desconocida',
        base: 'Desconocida',
      },
      connections: {
        groupAffiliation: 'Desconocida',
        relatives: 'Desconocida',
      },
      images: {
        sm: this.hero()?.images?.sm || ['assets/images/default-hero.png'],
        md: this.hero()?.images?.md || ['assets/images/default-hero.png'],
        lg: this.hero()?.images?.lg || ['assets/images/default-hero.png'],
      },
      slug: this.heroForm.value.name.toLowerCase().replace(/ /g, '-'),
    };

    if (this.hero()) {
      this.heroService.updateHero(heroData);
    } else {
      this.heroService.addHero(heroData);
    }

    this.heroService.stopEditing();
  }

  cancel() {
    this.heroService.stopEditing();
  }
}

