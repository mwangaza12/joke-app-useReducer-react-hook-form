
export interface Joke {
    id: number;
    joke: string;
    rate: number;
}

export type JokeAction =
    | { type: 'ADD_JOKE'; newJoke: Joke }
    | { type: 'INCREASE_JOKES_LIKES'; id: number }
    | { type: 'DECREASE_JOKES_LIKES'; id: number }
    | { type: 'UPDATE_JOKE'; updatedJoke: Joke }
    | { type: 'DELETE_JOKE'; id: number };

export type FormValues = {
  newJoke: string;
};
