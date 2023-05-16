
import styled from "styled-components";
import PropTypes from 'prop-types';

export function DefaultTextInput(props) {
  const {
    type,
    icon,
    value,
    name,
    onChange,
  } = props;

  const handleOnChange = (e) => {
    onChange(e);
  }

  return (
    <InputItem>
      {icon}
      <input
        type={type}
        value={value}
        onChange={handleOnChange}
        name={name}
      />
    </InputItem>
  )
};

// DefaultTextInput.propTypes = {
//   type: ReactPropTypes.string.isRequired,
//   icon: ReactPropTypes.object(ReactPropTypes.any).isRequired,
//   value: ReactPropTypes.string.isRequired,
//   onChange: ReactPropTypes.func.isRequired,
//   name: ReactPropTypes.string.isRequired,
// }
// DefaultTextInput.defaultProps = {

// }


const InputItem = styled.div`
  background: rgba(255,255,255,0.07);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 13px auto 13px;
  padding: 10px 10px;
  letter-spacing: .03rem;
  font-weight: 600;
  border-radius: 6px;
  align-items: center;

  input {
    border: none;
    outline: 0;
    background: 0 0;
    margin: 0;
    padding: 0;
    width: 100%;
  }
  
`