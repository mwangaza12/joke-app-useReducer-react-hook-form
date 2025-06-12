import type { Joke } from "../types/type";
import type { JokeAction } from "../types/type";

const jokesReducer = (jokes: Joke[], action: JokeAction): Joke[] => {
    switch (action.type) {
        case 'ADD_JOKE':
            return [...jokes, action.newJoke];

        case 'INCREASE_JOKES_LIKES':
            return jokes.map((joke) =>
                joke.id === action.id ? { ...joke, rate: joke.rate + 1 } : joke
            );

        case 'DECREASE_JOKES_LIKES':
            return jokes.map((joke) =>
                joke.id === action.id ? { ...joke, rate: joke.rate - 1 } : joke
            );

        case 'UPDATE_JOKE':
            return jokes.map((joke) =>
                joke.id === action.updatedJoke.id ? { ...action.updatedJoke } : joke
            );

        case 'DELETE_JOKE':
            return jokes.filter(joke => joke.id !== action.id);

        default:
            return jokes;
    }
};

export default jokesReducer;
