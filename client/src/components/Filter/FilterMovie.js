import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  DefaultDropDownList,
  DefaultTextInput,
  DefaultRangeInput,
} from "../Base";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import { AppSelector } from "../../store";
import "./filter.scss";

const FilterMovie = (props) => {
  const { data, onFilter: parentCallBack, otherFields } = props;
  const genresCollections = useSelector((state) =>
    AppSelector.getGenresCollections(state)
  );

  const [filter, setFilter] = useState({
    animeName: "",
    genres: {
      selected: "",
      listGenres: genresCollections || [],
    },
    rating: {
      minValue: 0,
      maxValue: 5,
    },
  });

  useEffect(() => {
    const newData = data.filter(filterData);
    parentCallBack(newData);
  }, [filter]);

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
    const titleLanguage = item.title?.english
      ? "english"
      : item.title?.userPreferred
      ? "userPreferred"
      : undefined;
    const filterMethod = [
      (item) =>
        titleLanguage
          ? item.title[titleLanguage]
              .toLowerCase()
              .includes(animeName.toLowerCase())
          : item.title.toLowerCase().includes(animeName.toLowerCase()),
      (item) => (genreSelected ? item.genres.includes(genreSelected) : true),
      (item) =>
        item?.rating
          ? item.rating >= minValue && item.rating <= maxValue
          : true,
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
    <FilterWrapper>
      <ItemWrapper>
        <p className="label-name">Search</p>
        <DefaultTextInput
          icon={<BiSearch />}
          value={filter?.animeName}
          onChange={handleInputChange}
          name="animeName"
          className="filter-text-input"
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
      {otherFields}
    </FilterWrapper>
  );
};

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

export default FilterMovie;
