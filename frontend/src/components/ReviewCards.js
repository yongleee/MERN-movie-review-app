import React from "react";

export default function ReviewCards({ content, rating }) {
  return (
    <>
      <p>{content}</p>
      <p>{rating}</p>
    </>
  );
}
