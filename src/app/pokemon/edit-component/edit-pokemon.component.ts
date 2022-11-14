import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-edit-component",
  template: `
    <h2 class="center">Editer {{ pokemon?.name }}</h2>
    <p class="center" *ngIf="pokemon">
      <img [src]="pokemon.picture" alt="" />
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
  `,
  styles: [],
})
export class EditPokemonComponent implements OnInit {
  pokemon: Pokemon | undefined;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const pokemonId: string | null = this.route.snapshot.paramMap.get("id");
    if (pokemonId) {
      this.pokemon = this.pokemonService.getPokemonById(+pokemonId);
    }
  }
}
