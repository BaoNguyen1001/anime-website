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
  const { data, onFilter: parentCallBack, otherFields, listFilterItem } = props;
  const genresCollections = useSelector((state) =>
    AppSelector.getGenresCollections(state)
  );
  const seasonCollections = useSelector((state) =>
    AppSelector.getSeasonCollections(state)
  );

  const [filter, setFilter] = useState({
    animeName: "",
    genres: {
      selected: "",
      listGenres: genresCollections || [],
    },
    rating: {
      minValue: 0,
      maxValue: 10,
    },
    years: {
      selected: "",
      listYears: seasonCollections.years || [],
    },
    seasons: {
      selected: "",
      listSeasons: seasonCollections.seasons || [],
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
      years: { selected: yearSelected },
      seasons: { selected: seasonSelected },
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
          : item?.title.toLowerCase().includes(animeName.toLowerCase()),
      (item) => (genreSelected ? item.genres.includes(genreSelected) : true),
      (item) =>
        item?.rating
          ? item.rating >= minValue && item.rating <= maxValue
          : true,
      (item) =>
        yearSelected ? item.seasonYear.toString() === yearSelected : true,
      (item) =>
        seasonSelected ? item.season.toString() === seasonSelected : true,
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

  const renderItem = (item) => {
    let cell;
    switch (item) {
      case "Search":
        cell = (
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
        );
        break;
      case "Genres":
        cell = (
          <ItemWrapper>
            <p className="label-name">Genres</p>
            <DefaultDropDownList
              value={filter?.genres?.selected}
              list={filter?.genres?.listGenres}
              onChange={handleDropDownChange}
              filterName="genres"
            />
          </ItemWrapper>
        );
        break;
      case "Rating":
        cell = (
          <ItemWrapper>
            <DefaultRangeInput
              filterName="rating"
              label="Rating"
              min={0}
              max={10}
              value={filter?.rating}
              onChange={handleRangeChange}
            />
          </ItemWrapper>
        );
        break;
      case "Year":
        cell = (
          <ItemWrapper>
            <p className="label-name">Year</p>
            <DefaultDropDownList
              value={filter?.years?.selected}
              list={filter?.years?.listYears}
              onChange={handleDropDownChange}
              filterName="years"
            />
          </ItemWrapper>
        );
        break;

      case "Season":
        cell = (
          <ItemWrapper>
            <p className="label-name">Season</p>
            <DefaultDropDownList
              value={filter?.seasons?.selected}
              list={filter?.seasons?.listSeasons}
              onChange={handleDropDownChange}
              filterName="seasons"
            />
          </ItemWrapper>
        );
        break;
      default:
        break;
    }
    return cell;
  };

  return (
    <FilterWrapper>
      {listFilterItem.map((item) => renderItem(item))}
      {otherFields}
    </FilterWrapper>
  );
};

const FilterWrapper = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: 200px 200px 200px 200px 424px 200px;
  align-items: end;
  margin-bottom: 50px;
`;

const ItemWrapper = styled.div`
  color: white;
  margin-right: 25px;
  font-size: 13px;
`;

export default FilterMovie;
