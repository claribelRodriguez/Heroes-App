import { Injectable, Signal, signal, computed, effect, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { Hero } from '../models/heroe.model';
import { SwalService } from './swal.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private http = inject(HttpClient);
  private swalService = inject(SwalService);
  private BASE_URL = 'http://localhost:3000/heroes';
  
  // rxResource carga los 100 héroes iniciales una sola vez
  private heroesResource = rxResource({
    stream: () => this.http.get<Hero[]>(this.BASE_URL)
  });
  
  public heroes = signal<Hero[]>([]);
  public searchTerm = signal<string>('');

  // Señal debounced: espera 300ms antes de emitir el nuevo valor
  private debouncedSearchTerm = toSignal(
    toObservable(this.searchTerm).pipe(debounceTime(300)),
    { initialValue: '' }
  );
  
  // El filtrado ahora reacciona a la señal con debounce
  public filteredHeroes = computed(() => {
    const term = this.debouncedSearchTerm().toLowerCase();
    const allHeroes = this.heroes();
    if (!term) return allHeroes;
    return allHeroes.filter(h => h.name.toLowerCase().includes(term));
  });

  private editingHero = signal<Hero | null>(null);
  private isEditing = signal<boolean>(false);
  
  getIsEditing = this.isEditing.asReadonly();
  getEditingHero = this.editingHero.asReadonly();

  // Exponemos estados del recurso para la UI
  public isLoading = this.heroesResource.isLoading;
  public error = this.heroesResource.error;

  constructor() {
    effect(() => {
      const data = this.heroesResource.value();
      if (data && Array.isArray(data)) {
        this.heroes.set(data);
      }
    });
  }

  getHeroes(): Signal<Hero[]> {
    return this.filteredHeroes;
  }

  getHeroById(id: string | number): Signal<Hero | undefined> {
    return computed(() => this.heroes().find(hero => hero.id.toString() === id.toString()));
  }

  searchHeroes(name: string): Signal<Hero[]> {
    return computed(() => this.heroes().filter(hero =>
      hero.name.toLowerCase().includes(name.toLowerCase())
    ));
  }

  addHero(hero: Hero) {
    // Validación de duplicados
    const isDuplicate = this.heroes().some(h => h.name.toLowerCase() === hero.name.toLowerCase());
    
    if (isDuplicate) {
      this.swalService.error(`El héroe "${hero.name}" ya existe en la base de datos.`);
      return;
    }

    const newHero = {
      ...hero,
      id: hero.id ?? crypto.randomUUID(),
    };

    this.http.post<Hero>(this.BASE_URL, newHero).subscribe({
      next: () => {
        this.heroesResource.reload();
        this.swalService.success('Nuevo héroe creado');
      },
      error: (err) => {
        console.error('Error al crear héroe:', err);
        this.swalService.error('No se pudo guardar el héroe en el servidor.');
      }
    });
  }
  
  updateHero(updatedHero: Hero) {
    this.http.put<Hero>(`${this.BASE_URL}/${updatedHero.id}`, updatedHero).subscribe({
      next: () => {
        this.heroesResource.reload();
        this.swalService.success('Héroe actualizado correctamente');
      },
      error: (err) => {
        console.error('Error al actualizar héroe:', err);
        this.swalService.error('Error al intentar actualizar el héroe en el servidor.');
      }
    });
  }

  deleteHero(id: string | number) {
    this.http.delete(`${this.BASE_URL}/${id}`).subscribe({
      next: () => {
        this.heroesResource.reload();
        this.swalService.success('Héroe eliminado definitivamente');
      },
      error: (err) => {
        console.error('Error al eliminar héroe:', err);
        this.swalService.error('Hubo un problema al intentar borrar el héroe del servidor.');
      }
    });
  }

  startEditing(hero: Hero | null) {
    this.isEditing.set(true);
    this.editingHero.set(hero);
  }
  
  stopEditing() {
    this.isEditing.set(false);
    this.editingHero.set(null);
  }
  
}
