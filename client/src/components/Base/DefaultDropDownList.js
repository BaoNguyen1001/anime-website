import Dropdown from 'react-bootstrap/Dropdown';
import styled from 'styled-components';
import './style.css';
import React, { useState, useEffect } from 'react';
function DefaultDropDownList(props) {
  const {
    value,
    list,
    onChange,
  } = props;

  const [listItem, setListItem] = useState();
  useEffect(() => {
    setListItem(list);
  }, []);

  const handleOnClick = (e) => {
    e.preventDefault();
    const { text } = e.target;
    onChange(text);
  }

  const handleInputChange = (e) => {
    const { value } = e.target;
    onChange(value);
  }

  return (
    <DropDownWrapper>
        <Dropdown>
          <Dropdown.Toggle variant='none'  as={CustomToggle}>
            <input placeholder='Any' value={value} onChange={handleInputChange} onClick={() => onChange('')} name='selectedInput'/>
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
  
`

export default DefaultDropDownList;