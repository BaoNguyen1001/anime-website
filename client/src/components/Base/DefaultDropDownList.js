import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import './style.css';
import React, { useState, useEffect, useRef } from 'react';
export function DefaultDropDownList(props) {
  const {
    value,
    list,
    onChange,
    filterName,
  } = props;

  const [listItem, setListItem] = useState();
  const inputRef = useRef();

  useEffect(() => {
    setListItem(list);
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    const { text } = e.target;
    const { name } = inputRef.current;
    onChange({
      target: {
        filterName,
        name,
        value: text,
      }
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange({
      target: {
        filterName,
        name,
        value
      }
    });
  }

  const handleClearInput = (e) => {
    const { name } = e.target;
    onChange({
      target: {
        filterName,
        name,
        value: '',
      }
    })
  }

  return (
    <DropDownWrapper>
        <Dropdown>
          <Dropdown.Toggle variant='none'  as={CustomToggle}>
            <input placeholder='Any' value={value} onChange={handleInputChange} onClick={handleClearInput} name='selected' ref={inputRef}/>
          </Dropdown.Toggle>

          <Dropdown.Menu id="dropdown-menu-custom-components">
            {listItem && listItem.filter((item) => item.toLowerCase().includes(value.toLowerCase())).map((item, index) => (
               <Dropdown.Item key={index} onClick={handleOnClick}>{item}</Dropdown.Item>
            ))}
            
          </Dropdown.Menu>
        </Dropdown>
    </DropDownWrapper>

  );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <div
    id="dropdown-custom-components"
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </div>
));

const DropDownWrapper = styled.div`
  background: rgba(255,255,255,0.07);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 13px;
  padding: 10px 10px;
  letter-spacing: .03rem;
  font-weight: 600;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
  position: relative;
  
`
