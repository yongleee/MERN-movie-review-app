import axios from "axios";
import React from "react";

export default function ReviewCards({ id, content, rating }) {
  const handleClick = async () => {
    const response = await axios.delete(`/api/reviews/${id}`);

    console.log(response);
    // dispatch({type: 'DELETE_WORKOUT', payload: json})
  };

  return (
    <>
      <p>{content}</p>
      <p>{rating}</p>
      <button onClick={handleClick}>delete</button>
    </>
  );
}
