import { useParams } from "react-router-dom";
import "./Videos.css";

export default function Video() {
  const { id } = useParams;
  return <div>Video</div>;
}
