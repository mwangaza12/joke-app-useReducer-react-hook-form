import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { Joke } from "../types/type";

interface JokeProps {
  joke: Joke;
  increaseRates: (id: number) => void;
  decreaseRates: (id: number) => void;
  updateJoke: (joke: Joke) => void;
  deleteJoke: (id: number) => void;
}

type FormValues = {
  editedText: string;
};

const schema = yup.object({
  editedText: yup
    .string()
    .required("Joke cannot be empty")
    .min(5, "Joke must be at least 5 characters"),
});

export const JokeComponent = ({
  joke,
  increaseRates,
  decreaseRates,
  updateJoke,
  deleteJoke,
}: JokeProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { editedText: joke.joke },
  });

  const onSubmit = (data: FormValues) => {
    updateJoke({ ...joke, joke: data.editedText.trim() });
    setIsEditing(false);
    reset({ editedText: data.editedText }); // Optional: keep new value
  };

  const handleCancel = () => {
    reset({ editedText: joke.joke });
    setIsEditing(false);
  };

  return (
    <div className="joke-card">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            {...register("editedText")}
            style={{ padding: "12px", marginRight: "10px" }}
          />
          <button type="submit" className="btn btn-sm btn-success">Save</button>
          <button type="button" onClick={handleCancel} className="btn btn-sm btn-secondary">
            Cancel
          </button>
          {errors.editedText && (
            <p style={{ color: "red", marginTop: "5px" }}>{errors.editedText.message}</p>
          )}
        </form>
      ) : (
        <div>
          <p>{joke.joke}</p>
          <p>Rate: {joke.rate}</p>
          <button onClick={() => increaseRates(joke.id)} className="btn btn-sm">👍</button>
          <button onClick={() => decreaseRates(joke.id)} className="btn btn-sm">👎</button>
          <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-warning">Edit</button>
          <button onClick={() => deleteJoke(joke.id)} className="btn btn-sm btn-danger">Delete</button>
        </div>
      )}
    </div>
  );
};
