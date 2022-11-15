import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subject,
  switchMap,
} from "rxjs";
import { Pokemon } from "../pokemon";
import { PokemonService } from "../pokemon.service";

@Component({
  selector: "app-search-pokemon",
  templateUrl: "./search-pokemon.component.html",
})
export class SearchPokemonComponent implements OnInit {
  searchTerms = new Subject<string>(); //class Subject € librairie Rxjs
  //=> représente un flux dans le temps avec les recherches successives
  //de l'utilisateur (..."a"..."ab"..."abc"...)

  pokemons$: Observable<Pokemon[]>; // $ est une convention pour indique que c'est un Observable

  constructor(private router: Router, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemons$ = this.searchTerms.pipe(
      //{..."a"."ab"..."abz"."ab"...."abc"......}
      debounceTime(300), //permet d'attendre 300ms avant nouveau changement
      //{......"ab"...."ab"...."abc"......}
      distinctUntilChanged(), // permet de distinguer si saisies identiques
      //{......"ab"........."abc"......}
      switchMap((term) => this.pokemonService.searchPokemonList(term))
      //{......pokemonList<"ab">................pokemonList<"abc">...........}
    );
  }
  search(term: string) {
    this.searchTerms.next(term);
  }
  goToDetailPokemon(pokemon: Pokemon) {
    const link = ["/pokemon", pokemon.id];
    this.router.navigate(link);
  }
}
