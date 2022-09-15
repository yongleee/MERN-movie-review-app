import axios from "axios";
import React from "react";
import { useReviewsContext } from "../hooks/useReviewsContext";

export default function ReviewCards({ id, content, rating }) {
  // TODO: delete todo from context (done)
  const { dispatch } = useReviewsContext();

  const handleClick = async () => {
    const response = await axios.delete(`/api/reviews/${id}`);

    if (response.statusText === "OK") {
      dispatch({ type: "DELETE_REVIEW", payload: response.data });
    }
  };

  // TODO: styling: work on update review after learning modal
  return (
    <li className="border-2 border-black">
      <p>{content}</p>
      <p>{rating}</p>
      <button onClick={handleClick}>delete</button>
    </li>
  );
}
