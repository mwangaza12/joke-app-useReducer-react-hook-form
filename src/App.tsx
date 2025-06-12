import './App.css';
import { useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { JokeComponent } from './components/JokeComponent';
import jokesReducer from './reducer/jokeReduces';
import type { Joke, FormValues } from './types/type';


// Yup validation schema
const schema = yup.object({
  newJoke: yup
    .string()
    .required('Please enter a joke')
    .min(5, 'Joke must be at least 5 characters')
}).required();

function App() {
  const InitialJokes: Joke[] = [
    {
      id: 1,
      joke: 'What do you call a very small valentine? A valen-tiny!!!',
      rate: 0
    },
    {
      id: 2,
      joke: 'What did the dog say when he rubbed his tail on the sandpaper? Ruff, Ruff!!!',
      rate: 5
    },
    {
      id: 3,
      joke: "Why don't sharks like to eat clowns? Because they taste funny!!!",
      rate: 10
    }
  ];

  const [jokes, dispatch] = useReducer(jokesReducer, InitialJokes);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FormValues) => {
    dispatch({
      type: 'ADD_JOKE',
      newJoke: {
        id: Date.now(),
        joke: data.newJoke.trim(),
        rate: 0
      }
    });
    reset(); 
  };

  const increaseRates = (id: number) => {
    dispatch({ type: 'INCREASE_JOKES_LIKES', id });
  };

  const decreaseRates = (id: number) => {
    dispatch({ type: 'DECREASE_JOKES_LIKES', id });
  };

  const updateJoke = (joke: Joke) => {
    dispatch({ type: 'UPDATE_JOKE', updatedJoke: joke });
  };

  const deleteJoke = (id: number) => {
    dispatch({ type: 'DELETE_JOKE', id });
  };

  return (
    <>
      <div className='container'>
        <h2>Jokes For You 😂</h2>

        <form onSubmit={handleSubmit(onSubmit)} className='form'>
          <input
            type="text"
            placeholder="Enter your joke"
            style={{ padding: '12px', marginRight: '10px' }}
            {...register('newJoke')}
          />
          <button type="submit" className="btn">Add Joke</button>
        </form>

        {errors.newJoke && (
          <p style={{ color: 'red', marginTop: '5px' }}>{errors.newJoke.message}</p>
        )}
      </div>

      <div className="jokes">
        {jokes &&
          jokes
            .sort((a, b) => b.id - a.id)
            .map((joke: Joke) => (
              <JokeComponent
                key={joke.id}
                joke={joke}
                increaseRates={increaseRates}
                decreaseRates={decreaseRates}
                updateJoke={updateJoke}
                deleteJoke={deleteJoke}
              />
            ))}
      </div>
    </>
  );
}

export default App;
