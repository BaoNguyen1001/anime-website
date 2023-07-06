import styled from "styled-components";
import { Link } from "react-router-dom";
import StarRating from "../../components/Rating/StarRating";
const Rating = (props) => {
  const { data, onChangePage, page } = props;

  const handleOnChangePage = (page) => {
    onChangePage(page);
  };

  return (
    <RatingCards>
      <CardWrapper>
        {data
          .filter((item) => item.type === "ANIME" && item.idMal)
          .map((item) => (
            <Links to={"/id/" + item.idMal} className="relation-items">
              <img src={item.coverImage.large} alt="" />
              <p style={{ marginBottom: 0 }}>{item.title.userPreferred}</p>
              <StarRating rating={item.rating} size="20px" />
            </Links>
          ))}
      </CardWrapper>
      <NavButtons>
        <NavButton
          to="#"
          onClick={() => handleOnChangePage(page - 1)}
          disabled={page === 1}
          className={`${page === 1 ? "disabled" : ""}`}
        >
          Previous
        </NavButton>
        <NavButton to="#" onClick={() => handleOnChangePage(page + 1)}>
          Next
        </NavButton>
      </NavButtons>
    </RatingCards>
  );
};

const RatingCards = styled.div`
  color: black;
  height: 100%;
`;
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 110px);
  grid-gap: 5px;
  grid-row-gap: 1.5rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 110px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }
  .relation-items {
    margin: 0;
    font-size: 10px;
    img {
      width: 100px;
      height: 140px;
    }
  }
`;

const Links = styled(Link)`
  color: black;
  font-weight: 400;
  text-decoration: none;
  margin: 0rem 1.3rem 0 1.3rem;
`;

const NavButtons = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: start-end;
  justify-content: flex-end;
  gap: 1rem;

  .disabled {
    background-color: lightgray;
    color: darkgray;
  }
`;

const NavButton = styled.button`
  padding: 0.8rem 2rem;
  text-decoration: none;
  color: black;
  background-color: transparent;
  border: 2px solid #53507a;
  border-radius: 0.5rem;
`;

export default Rating;
