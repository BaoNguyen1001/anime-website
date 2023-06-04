import styled from "styled-components";
import "./style.scss";
export function DefaultButton(props) {
  const { name, onChange, label } = props;

  const handleOnChange = (e) => {
    onChange(e);
  };

  return (
    <ButtonItem>
      <button onChange={handleOnChange} name={name} id="recommend-btn">
        {label}
      </button>
    </ButtonItem>
  );
}

const ButtonItem = styled.div`
  button {
    width: 100%;
    outline: none;
    border: none;
    background-color: #7676ff;
    color: white;
    font-size: 1rem;
    padding: 0.5rem 2rem;
    text-decoration: none;
    border-radius: 0.3rem;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
  }
`;
