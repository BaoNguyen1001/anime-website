import axios from "axios";
import api from "../services/Api.service";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  DefaultDropDownList,
  DefaultTextInput,
  DefaultRangeInput,
} from "../components/Base/index";
import { BiSearch } from "react-icons/bi";
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";
import { TopRecommendByIdQuery } from "../hooks/searchQueryStrings";
import PredictService from "../services/Predict.service";
import { DefaultButton } from "../components/Base/DefaultButton";

function RecommendAnime() {
  let page = useParams().page;
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    animeName: "",
    genres: {
      selected: "",
      listGenres: [],
    },
    rating: {
      minValue: 0,
      maxValue: 5,
    },
  });

  useEffect(() => {
    getInitialAnime();
  }, [page]);

  const getInitialAnime = async () => {
    setLoading(true);
    window.scrollTo(0, 0);
    const animeRecommends = await PredictService.getRecommendIdByUser();
    handleLoadData(animeRecommends);
    setLoading(false);
    document.title = "Recommend Anime - Miyou";
  };

  const getNewRecommendBtn = async () => {
    const newPredicts = await PredictService.getNewRecommend();
    handleLoadData(newPredicts);
  };

  const handleLoadData = async (animeRecommends) => {
    const animeIds = getAnimeId(animeRecommends);
    const res = await api({
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: TopRecommendByIdQuery,
        variables: {
          ids: animeIds,
          perPage: 50,
          page: page,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    const animeList = res.data.data.Page.media
      .map((item) => {
        const newItem = { ...item };
        newItem.rating = animeRecommends.find(
          (item) => item.movieId === newItem.idMal
        ).rating;
        return newItem;
      })
      .sort((a, b) => b.rating - a.rating);

    setAnimeDetails(animeList);
    setFilter({
      ...filter,
      genres: {
        ...filter.genres,
        listGenres: res.data.data.genres,
      },
    });
  };

  const getAnimeId = (animeList) => {
    const ids = [
      ...animeList.map((item) => {
        return item.movieId;
      }),
    ];
    return ids;
  };

  const updateFilterParams = (name, value, filterName = null) => {
    if (filterName) {
      setFilter({
        ...filter,
        [filterName]: {
          ...filter[filterName],
          [name]: value,
        },
      });
    } else {
      setFilter({
        ...filter,
        [name]: value,
      });
    }
  };

  const filterData = (item) => {
    const {
      animeName,
      genres: { selected: genreSelected },
      rating: { minValue, maxValue },
    } = filter;
    const titleLanguage = item.title.english ? "english" : "userPreferred";
    const filterMethod = [
      (item) =>
        item.title[titleLanguage]
          .toLowerCase()
          .includes(animeName.toLowerCase()),
      (item) => (genreSelected ? item.genres.includes(genreSelected) : true),
      (item) => item.rating >= minValue && item.rating <= maxValue,
    ];

    const result = filterMethod.map((method) => {
      if (method(item)) {
        return true;
      }
      return false;
    });

    return !result.includes(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFilterParams(name, value);
  };

  const handleDropDownChange = (e) => {
    const { filterName, name, value } = e.target;
    updateFilterParams(name, value, filterName);
  };

  const handleRangeChange = (e) => {
    const { filterName, name, value } = e.target;
    updateFilterParams(name, value, filterName);
  };

  return (
    <div>
      {loading && <SearchResultsSkeleton name="Recommend Anime" />}
      {!loading && (
        <Parent>
          <div>
            <Heading>
              <span>Filter search</span>
            </Heading>
            <FilterWrapper>
              <ItemWrapper>
                <p className="label-name">Search</p>
                <DefaultTextInput
                  icon={<BiSearch />}
                  value={filter?.animeName}
                  onChange={handleInputChange}
                  name="animeName"
                />
              </ItemWrapper>
              <ItemWrapper>
                <p className="label-name">Genres</p>
                <DefaultDropDownList
                  value={filter?.genres?.selected}
                  list={filter?.genres?.listGenres}
                  onChange={handleDropDownChange}
                  filterName="genres"
                />
              </ItemWrapper>
              <ItemWrapper>
                <DefaultRangeInput
                  filterName="rating"
                  label="Rating"
                  min={0}
                  max={5}
                  value={filter?.rating}
                  onChange={handleRangeChange}
                />
              </ItemWrapper>
              <ItemWrapper>
                <DefaultButton
                  label="Recommend"
                  name="recommendBtn"
                  onClick={getNewRecommendBtn}
                />
              </ItemWrapper>
            </FilterWrapper>
          </div>
          <Heading>
            <span>Recommend Anime</span> Results
          </Heading>
          <CardWrapper>
            {animeDetails.filter(filterData).map((item, i) => (
              <Links to={"/id/" + item.idMal}>
                <img src={item.coverImage.large} alt="" />
                <p style={{ marginBottom: 0 }}>
                  {item.title?.english || item.title?.userPreferred}
                </p>
                <p>Rating: {item.rating}</p>
              </Links>
            ))}
          </CardWrapper>
          <NavButtons>
            {page > 1 && (
              <NavButton to={"/recommend/" + (parseInt(page) - 1)}>
                Previous
              </NavButton>
            )}
            <NavButton to={"/recommend/" + (parseInt(page) + 1)}>
              Next
            </NavButton>
          </NavButtons>
        </Parent>
      )}
    </div>
  );
}
const Parent = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 1rem;
  grid-row-gap: 1rem;
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
`;

const Links = styled(Link)`
  text-decoration: none;
  img {
    width: 160px;
    height: 235px;
    border-radius: 0.5rem;
    object-fit: cover;
    @media screen and (max-width: 600px) {
      width: 120px;
      height: 180px;
      border-radius: 0.3rem;
    }
    @media screen and (max-width: 400px) {
      width: 110px;
      height: 170px;
    }
    @media screen and (max-width: 380px) {
      width: 100px;
      height: 160px;
    }
  }

  p {
    color: white;
    font-size: 13px;
    padding-top: 5px;
    font-weight: 400;
    text-decoration: none;
    max-width: 160px;
    @media screen and (max-width: 380px) {
      width: 100px;
      font-size: 0.9rem;
    }
  }
`;

const Heading = styled.p`
  font-size: 1.8rem;
  color: white;
  font-weight: 200;
  margin-bottom: 2rem;
  span {
    font-weight: 600;
  }

  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }
`;

const FilterWrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 200px 200px 424px 200px;
  align-items: end;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  color: white;
  margin-right: 25px;
  font-size: 13px;
`;

const NavButtons = styled.div`
  margin-top: 2.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const NavButton = styled(Link)`
  padding: 0.8rem 2rem;
  text-decoration: none;
  color: white;
  background-color: none;
  border: 2px solid #53507a;
  border-radius: 0.5rem;
`;

export default RecommendAnime;
