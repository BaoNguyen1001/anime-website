import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Button } from "react-bootstrap";
import "./starRating.css";

const StarRating = (props) => {
  const { rating, unRating, size, isHover } = props;
  //const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [previousRating, setPreviousRating] = useState(0);

  useEffect(() => {
    //setRating(value);
    setHover(rating);
    setPreviousRating(rating);
  }, [rating]);

  const updateRating = async (value) => {
    if (value !== previousRating) {
      await props.updateRating(value);
    }
  };

  const removeRating = async (e) => {
    e.preventDefault();
    if (previousRating !== 0) {
      await props.updateRating(0);
    }
  };

  return (
    <div className="star-rating" onContextMenu={removeRating}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <CustomButton
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => updateRating(index)}
            onMouseEnter={() => {
              if (isHover) {
                setHover(index);
              }
            }}
            onMouseLeave={() => setHover(rating)}
            style={{ fontSize: size || "36px" }}
          >
            <p className="star">&#9733;</p>
          </CustomButton>
        );
      })}
      {unRating && (
        <Button className="un-rating" onClick={() => updateRating(0)} size="sm">
          <span>Unrating</span>
        </Button>
      )}
    </div>
  );
};

const CustomButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  margin: 0;
`;

export default StarRating;
