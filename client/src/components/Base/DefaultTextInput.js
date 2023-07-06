import styled from "styled-components";
import PropTypes from "prop-types";

export function DefaultTextInput(props) {
  const { type, icon, value, name, onChange, className, color } = props;

  const handleOnChange = (e) => {
    onChange(e);
  };

  return (
    <InputItem className={className}>
      {icon}
      <input type="text" value={value} onChange={handleOnChange} name={name} />
    </InputItem>
  );
}

const InputItem = styled.div`
  padding: 10px 10px;
  letter-spacing: 0.03rem;
  font-weight: 600;
  border-radius: 6px;
  align-items: center;

  input {
    outline: 0;
    background: 0 0;
    margin: 0;
    padding: 0;
    width: 100%;
  }
`;
