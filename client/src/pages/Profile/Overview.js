import { useState } from "react";
import styled from "styled-components";
import Form from "react-validation/build/form";
import { DefaultTextInput } from "../../components/Base";

const Overview = (props) => {
  const { user, onUpdateProfile, onChangeProfile } = props;

  const handleOnChange = (event) => {
    onChangeProfile(event);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await onUpdateProfile();
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="container">
          <div className="row mb-4">
            <Item className="col-3">
              <p>Full Name</p>
              <input
                placeholder="Enter your name"
                type="text"
                onChange={handleOnChange}
                name="fullName"
                value={user?.fullName || ""}
              />
            </Item>
          </div>
          <div className="row mb-4">
            <Item className="col-3">
              <p>Age</p>
              <input
                placeholder="Enter your age"
                type="number"
                name="age"
                min={1}
                onChange={handleOnChange}
                value={user?.age || ""}
              />
            </Item>
          </div>
          <div className="row">
            <Item className="col-3">
              <p>Gender</p>
              <div className="d-flex justify-content-between gender-group">
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value={0}
                    style={{ width: "auto" }}
                    checked={user?.gender === 0}
                    onChange={handleOnChange}
                  />{" "}
                  <span>Male</span>
                </div>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value={1}
                    style={{ width: "auto" }}
                    checked={user?.gender === 1}
                    onChange={handleOnChange}
                  />{" "}
                  <span>Female</span>
                </div>
                <div></div>
              </div>
            </Item>
          </div>
        </div>
        <NavButtons>
          <NavButton type="submit">Save</NavButton>
        </NavButtons>
      </form>
    </div>
  );
};

const Item = styled.div`
  padding: 10px 20px;
  margin-right: 10px;
  letter-spacing: 0.03rem;
  border-radius: 10px;
  background-color: #edf1f5;

  p,
  span {
    font-size: 13px;
    margin-bottom: 5px;
    color: #72736d;
  }

  input {
    outline: 0;
    background: transparent;
    margin: 0;
    padding: 0;
    width: 100%;
    border: 0;
    color: black;
    font-size: 13px;
  }

  .gender-group {
    div {
      input[type="radio"] {
        accent-color: #232323;
      }
    }
  }
`;

const NavButtons = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: start-end;
  justify-content: flex-end;
  gap: 1rem;

  .disabled {
    background-color: lightgray;
    color: darkgray;
  }
`;

const NavButton = styled.button`
  padding: 0.8rem 3rem;
  text-decoration: none;
  color: black;
  background-color: transparent;
  border: 2px solid #53507a;
  border-radius: 0.5rem;
`;

export default Overview;
