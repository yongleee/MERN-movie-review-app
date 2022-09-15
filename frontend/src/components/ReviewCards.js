import axios from "axios";
import React from "react";

export default function ReviewCards({ id, content, rating }) {
  // TODO: delete todo from context
  const handleClick = async () => {
    const response = await axios.delete(`/api/reviews/${id}`);

    console.log(response);
    // dispatch({type: 'DELETE_WORKOUT', payload: json})
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
