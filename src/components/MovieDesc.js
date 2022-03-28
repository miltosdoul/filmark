import React, { useState } from "react";

const MovieDesc = ({ description }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="description">
      {description ? (
        description.length > 150 ? (
          <>
            {expanded ? description : description.substring(0, 150) + "..."}
            <button className="btn-sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? "Show less" : "Show more"}
            </button>
          </>
        ) : (
          description
        )
      ) : (
        "No description"
      )}
    </div>
  );
};

export default MovieDesc;
