import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Home.css";

export default function CardSkeleton({ cards }) {
  return (
    <>
      {Array(8)
        .fill(0)
        .map((x) => (
          <div className="card">
            <div className="img-wrapper">
              <Skeleton
                width={320}
                height={180}
                style={{ borderRadius: "10px" }}
              />
            </div>

            <h4 className="video-title">{<Skeleton />}</h4>
            <div className="details">
              <p>
                <Skeleton width={40} /> <Skeleton width={40} />
              </p>
            </div>
          </div>
        ))}
    </>
  );
}
