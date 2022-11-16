import { useParams } from "react-router-dom";
import "./Video.css";

export default function Video() {
  const { id } = useParams;
  return <div>Video</div>;
}
