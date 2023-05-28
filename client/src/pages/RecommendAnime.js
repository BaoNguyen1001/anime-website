import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  DefaultDropDownList,
  DefaultTextInput,
  DefaultRangeInput,
} from '../components/Base/index';
import { BiSearch } from 'react-icons/bi'
import SearchResultsSkeleton from "../components/skeletons/SearchResultsSkeleton";
import { TopRecommendByIdQuery } from "../hooks/searchQueryStrings";

function RecommendAnime() {
  const [animeDetails, setAnimeDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    animeName: '',
    genres: {
      selected: '',
      listGenres: [],
    },
    rating: {
      minValue: 0,
      maxValue: 5,
    }
  });

  useEffect(() => {
    getAnime();
  }, []);

  async function getAnime() {
    setLoading(true);
    window.scrollTo(0, 0);
    const res = await axios({
      url: process.env.REACT_APP_BASE_URL,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: TopRecommendByIdQuery,
        variables: {
          ids: [32281, 5114, 9969]
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    setAnimeDetails(res.data.data.Page.media);
    setFilter({
      ...filter,
      genres: {
        ...filter.genres,
        listGenres: res.data.data.genres
      }
    })
    setLoading(false);
    document.title = "Recommend Anime - Miyou";
  }

  async function getRecommendId() {
  
  }


  const updateFilterParams = (name, value, filterName = null) => {
    if (filterName) {
      setFilter({
        ...filter,
        [filterName]: {
          ...filter[filterName],
          [name]: value,
        }
      })
    } else {
      setFilter({
        ...filter,
        [name]: value,
      })
    }
  };

  const filterData = (item) => {
    const {animeName, genres: {selected: genreSelected}} = filter;

    const filterMethod = [
      (item => item.title.english.toLowerCase().includes(animeName.toLowerCase())),
      (item => genreSelected ? item.genres.includes(genreSelected) : true)
    ]

    const result =  filterMethod.map((method) => {
      if (method(item)) {
        return true;
      }
      return false;
    })

    return !result.includes(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFilterParams(name, value);

  }

  const handleDropDownChange = (e) => {
    const { filterName, name, value } = e.target;
    updateFilterParams(name, value, filterName);
  }

  const handleRangeChange = (e) => {
    const { filterName, name, value } = e.target;
    updateFilterParams(name, value, filterName);
  }

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
                  type="text"
                  icon={<BiSearch/>}
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
            </FilterWrapper>
          </div>
          <Heading>
            <span>Recommend Anime</span> Results
          </Heading>
          <CardWrapper>
            {animeDetails.filter(filterData).map((item, i) => (
              <Links to={"/id/" + item.idMal}>
                <img src={item.coverImage.large} alt="" />
                <p>{item.title.english}</p>
              </Links>
            ))}
          </CardWrapper>
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
    font-size: 1rem;
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
`

const FilterWrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 200px 200px 424px;
  align-items: center;
  margin-bottom: 50px;
`

const ItemWrapper = styled.div`
  color: white;
  margin-right: 25px;
  font-size: 13px;
`

export default RecommendAnime;
