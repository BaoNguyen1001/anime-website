import styled from "styled-components";
import { Link } from "react-router-dom";
import Overview from "./Overview";
import Rating from "./Rating";
import { useState } from "react";
import { AuthService, MovieService, api } from "../../services";
import { useEffect } from "react";
import { ListAnimeById } from "../../hooks/searchQueryStrings";
import UserProfileSkeleton from "../../components/skeletons/UserProfileSkeleton";

const navBarItem = () => {
  return [
    {
      tabName: "Overview",
      path: "/profile",
    },
    {
      tabName: "Rating",
      path: "/profile/rating",
    },
  ];
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [tabActive, setTabActive] = useState("Overview");
  const [ratingList, setRatingList] = useState([]);
  const [ratingPage, setRatingPage] = useState(1);

  const onTabChange = (event) => {
    const { name } = event.target;
    setTabActive(name);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  useEffect(() => {
    if (user) {
      getRatingList(user.id);
    }
  }, [ratingPage]);

  const getInitialData = async () => {
    const userProfile = await AuthService.profile();
    await getRatingList(userProfile.id);
    setUser(userProfile);
  };

  const getRatingList = async (id) => {
    const animeList = await MovieService.getListRating(id);
    await handleLoadData(animeList);
  };

  const handleLoadData = async (animeList) => {
    const animeIds = getAnimeId(animeList);
    const res = await api({
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: ListAnimeById,
        variables: {
          ids: animeIds,
          perPage: 20,
          page: ratingPage,
        },
      },
    }).catch((err) => {
      console.log(err);
    });
    const ratingList = res.data.data.Page.media
      .map((item) => {
        const newItem = { ...item };
        newItem.rating = animeList.find(
          (item) => item.movieId === newItem.idMal
        ).rating;
        return newItem;
      })
      .sort((a, b) => b.rating - a.rating);
    setRatingList(ratingList);
  };

  const handleUpdateProfile = async () => {
    const updateProfile = await AuthService.updateProfile(user);
    return updateProfile;
  };

  const getAnimeId = (animeList) => {
    const ids = [
      ...animeList.map((item) => {
        return item.movieId;
      }),
    ];
    return ids;
  };

  const onChangePage = (page) => {
    setRatingPage(page);
  };

  const onChangeProfile = (event) => {
    const { name, value, type } = event.target;
    let newValue = value;
    if (type === "radio") {
      newValue = parseInt(newValue);
    }
    setUser({ ...user, [name]: newValue });
  };

  const renderTab = () => {
    let cell = <div></div>;
    switch (tabActive) {
      case "Overview":
        cell = (
          <Overview
            user={user}
            onUpdateProfile={handleUpdateProfile}
            onChangeProfile={onChangeProfile}
          />
        );
        break;

      case "Rating":
        cell = (
          <Rating
            data={ratingList}
            onChangePage={onChangePage}
            page={ratingPage}
          />
        );
        break;

      default:
        break;
    }
    return cell;
  };

  return (
    <ProfileWrapper>
      {/* <UserProfileSkeleton /> */}
      <HeaderProfile>
        <div className="container">
          <div className="avatar-wrapper">
            <img src="./assets/avatar.jpg" id="avatar" alt="avatarImage" />

            <div className="user-name">@{user?.userName}</div>

            <NavWrapper>
              <div className="nav container">
                {navBarItem().map((item) => (
                  <Links to="#" onClick={onTabChange} name={item.tabName}>
                    {item.tabName}
                  </Links>
                ))}
              </div>
            </NavWrapper>
          </div>
        </div>
      </HeaderProfile>
      <ContentProfile>
        <div className="container">
          <div className="content">{renderTab()}</div>
        </div>
      </ContentProfile>
    </ProfileWrapper>
  );
};

const ProfileWrapper = styled.div``;

const HeaderProfile = styled.div`
  .container {
    height: 200px;
    display: flex;
    align-items: flex-end;
    position: relative;
    color: white;

    .avatar-wrapper {
      display: flex;
      align-items: flex-end;

      #avatar {
        height: 150px;
        weight: 150px;
      }

      .user-name {
        padding: 20px 20px;
      }
    }
  }
`;

const NavWrapper = styled.div`
  .nav {
    padding: 20px 20px;
  }
`;

const ContentProfile = styled.div`
  background-color: #edf1f5;
  padding: 30px 0;
  .container {
    .content {
      min-height: 550px;
      border-radius: 5px;
      background-color: white;
      padding: 20px;
      position: relative;
    }
  }
`;

const Links = styled(Link)`
  color: white;
  font-size: 13px;
  text-decoration: none;
  margin: 0rem 1.3rem 0 1.3rem;
`;

export default Profile;
