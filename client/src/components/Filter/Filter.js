import styled from "styled-components";
import { BiSearch } from 'react-icons/bi'
import DefaultTextInput from "../Base/DefaultTextInput";
import DefaultDropDownList from "../Base/DefaultDropDownList";
import DefaultRangeInput from "../Base/DefaultRangeInput";
import { useState } from "react";

const Filter = (props) => {
  const [searchParam, setSearchParam] = useState({
    name: '',
    genres: {
      selected: '',
      listGenres: ['Action', 'Romatic', 'ABC', 'XYZ'],
    },
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParam({
      ...searchParam,
      [name]: value,
    })
  }

  const handleDropDownChange = (value) => {
    setSearchParam({
      ...searchParam,
      genres: {
        ...searchParam.genres,
        selected: value,
      }
    })
  }

  return (
    <FilterWrapper>
      <ItemWrapper>
        <p className="name">Search</p>
        <DefaultTextInput
          type="text"
          icon={<BiSearch/>}
          value={searchParam.name}
          onChange={handleInputChange}
          name="name"
        />
      </ItemWrapper>

      <ItemWrapper>
        <p className="name">Genres</p>
        <DefaultDropDownList
          value={searchParam.genres.selected}
          list={searchParam.genres.listGenres}
          onChange={handleDropDownChange}
        />
      </ItemWrapper>
      
      <ItemWrapper>
        <DefaultRangeInput
          
        />
      </ItemWrapper>
    </FilterWrapper>
  )
};

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

export default Filter;