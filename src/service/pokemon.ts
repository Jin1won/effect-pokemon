import { Effect, pipe } from 'effect';
import { useQuery } from "@tanstack/react-query";

export type Pokemon = {
  name: string;
  imageUrl: string;
};


const parsePokemonObject = (data: any) => {
  const pokemon: Pokemon = {
    name: data.name,
    imageUrl: data.sprites.front_default,
  };
  return Effect.succeed(pokemon);
}

const getPokemon = (id: string) => {
  return pipe(
    Effect.tryPromise({
      try: () => 
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
          .then((res) => res.json()),
      catch: (unknown) => new Error(`something went wrong ${unknown}`)
    }),
    Effect.flatMap((data) => parsePokemonObject(data))
  )
}

export const usePokemonQurey = (id: string) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => {
      return Effect.runPromise(getPokemon(id));
    },
  })
} 