import { useState } from "react";

const RatingInput = ({ stars, onChange }) => {
  const [activeRating, setActiveRating] = useState(stars)


  return (
    <>
    <div className="rating-input">
      <div className={activeRating >= 1 ? 'filled' : 'empty'} >
        <i className="fa fa-star"
          onMouseEnter={() => {setActiveRating(1);}}
          onMouseLeave={() => {setActiveRating(stars)}}
          onClick={() => {onChange(1)}}
        ></i>
      </div>
      <div className={activeRating >= 2 ? 'filled' : 'empty'} >
        <i className="fa fa-star"
          onMouseEnter={() => {setActiveRating(2);}}
          onMouseLeave={() => {setActiveRating(stars)}}
          onClick={() => {onChange(2)}}
        ></i>
      </div>
      <div className={activeRating >= 3 ? 'filled' : 'empty'} >
        <i className="fa fa-star"
          onMouseEnter={() => {setActiveRating(3);}}
          onMouseLeave={() => {setActiveRating(stars)}}
          onClick={() => {onChange(3)}}
        ></i>
      </div>
      <div className={activeRating >= 4 ? 'filled' : 'empty'} >
        <i className="fa fa-star"
            onMouseEnter={() => {setActiveRating(4);}}
            onMouseLeave={() => {setActiveRating(stars)}}
            onClick={() => {onChange(4)}}
        ></i>
      </div>
      <div className={activeRating === 5 ? 'filled' : 'empty'} >
        <i className="fa fa-star"
          onMouseEnter={() => {setActiveRating(5);}}
          onMouseLeave={() => {setActiveRating(stars)}}
          onClick={() => {onChange(5)}}
        ></i>
      </div>
    </div>
    </>
  );
};

export default RatingInput;
