import axios from "axios";
import { useReviewsContext } from "../hooks/useReviewsContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

export default function ReviewCards({ id, content, rating, timeAdded }) {
  const { dispatch } = useReviewsContext();

  const handleClick = async () => {
    const response = await axios.delete(`/api/reviews/${id}`);

    if (response.statusText === "OK") {
      dispatch({ type: "DELETE_REVIEW", payload: response.data });
    }
  };

  // TODO: styling: work on edit review after learning modal
  // TODO: styling: work on double confirm delete for user using modal
  return (
    <li className="border-2 border-black">
      <p>{content}</p>
      <p>{rating}</p>
      <p>{formatDistanceToNow(new Date(timeAdded), { addSuffix: true })}</p>
      <button onClick={handleClick}>delete</button>
    </li>
  );
}
