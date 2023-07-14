import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiUser } from "react-icons/fi";
import { IconContext } from "react-icons";
import AuthService from "../../services/Auth.service";

function User(props) {
  const { setTabActive } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(user);
  }, [AuthService.getCurrentUser()]);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  const handleLogOut = () => {
    setIsOpen(false);
    AuthService.logout();
  };

  return (
    <DropDown
      className="profile-dropdown"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="profile-icon">
        <IconContext.Provider
          value={{
            size: "1rem",
            style: {
              verticalAlign: "middle",
              marginBottom: "0.2rem",
            },
          }}
        >
          <FiUser />
        </IconContext.Provider>
      </div>
      {isOpen && (
        <div className="custom-dropdown-menu">
          {currentUser ? (
            <>
              <div className="custom-dropdown-item your-name">{`@${currentUser.userName}`}</div>
              <Links
                to="/profile/overview"
                className="custom-dropdown-item"
                onClick={() => setTabActive("")}
              >
                Profile
              </Links>
              <Links to="/profile/rating" className="custom-dropdown-item">
                Ratings
              </Links>
              <Links to="#" className="custom-dropdown-item">
                Theme
              </Links>
              <Links
                to="/login"
                className="custom-dropdown-item"
                onClick={handleLogOut}
              >
                Logout
              </Links>
            </>
          ) : (
            <>
              <Links to="#" className="custom-dropdown-item">
                Theme
              </Links>
              <Links to="/login" className="custom-dropdown-item">
                Login
              </Links>
            </>
          )}
        </div>
      )}
    </DropDown>
  );
}

const DropDown = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #7676ff;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 15px;

  :hover {
    background-color: #7660ff;
  }

  .profile-icon {
    font-size: 20px;
  }

  .custom-dropdown-menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 150px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    z-index: 2;
  }
  .custom-dropdown-menu:before {
    content: "";
    height: 1.5em;
    position: absolute;
    left: 0;
    right: 0;
    transform: translateY(-100%);
  }

  .custom-dropdown-item {
    padding: 10px;
    font-size: 14px;
    color: #fff;
    transition: background-color 0.2s;
    background-color: #1a1927;
    border-left: 2px solid #9792cf;
    border-right: 2px solid #9792cf;
  }

  .custom-dropdown-item:hover {
    background-color: #f2f2f2;
    color: black;
  }

  .custom-dropdown-item:first-child {
    border-radius: 5px 5px 0 0;
    border-top: 2px solid #9792cf;
  }

  .custom-dropdown-item:last-child {
    border-radius: 0 0 5px 5px;
    border-bottom: 2px solid #9792cf;
  }

  .your-name {
    color: #fff;
    opacity: 1;
    pointer-events: none;
    border-bottom: 2px solid rgba(151, 146, 207, 1);
  }
`;

const Links = styled(Link)`
  color: white;
  font-weight: 400;
  text-decoration: none;
`;

export default User;
