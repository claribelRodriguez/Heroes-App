import { Component, inject, Signal, computed, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Hero } from '../../../../core/models/heroe.model';
import { HeroService } from '../../../../core/services/hero.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { HeroCardComponent } from '../hero-card/hero-card';
import { SwalService } from '../../../../core/services/swal.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../../../core/services/loading.service';


@Component({
  selector: 'app-hero-list',
  standalone: true,
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
})
export class HeroListComponent {
  private swalService = inject(SwalService);
  private dialog = inject(MatDialog);
  public heroService = inject(HeroService);
  public router = inject(Router);
  public loading = inject(LoadingService).loading;

  heroes: Signal<Hero[]> = this.heroService.getHeroes();
  pageSize = signal<number>(20);
  currentPage = signal<number>(0);

  totalHeroes = computed(() => this.heroes().length);

  filteredHeroes = computed(() => this.heroes());
  
  paginatedHeroes = computed(() => {
    const start = this.currentPage() * this.pageSize();
    return this.filteredHeroes().slice(start, start + this.pageSize());
  });
  



  filterHeroes(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.heroService.searchTerm.set(inputValue);
    this.currentPage.set(0);
  }

  onPageChange(event: PageEvent) {
    this.currentPage.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }  
  
  editHero(hero: Hero) {
    this.heroService.startEditing(hero);
  }

  async deleteHero(id: string | number) {
    const confirm = await this.swalService.confirmDelete();
    if (confirm) {
      this.heroService.deleteHero(id);
    }
  }

  createHero() {
    this.heroService.startEditing(null);
  }

  openHeroCard(hero: Hero) {
    this.dialog.open(HeroCardComponent, {
      data: { hero },
      width: '700px',
      maxWidth: '95vw',
      panelClass: 'hero-detail-dialog'
    });
  }
  
  
}

