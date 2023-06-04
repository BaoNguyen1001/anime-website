import axios from "axios";
import api from "../services/Api.service";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showDialog } from "../store";
import styled from "styled-components";
import useWindowDimensions from "../hooks/useWindowDimensions";
import { searchByIdQuery } from "../hooks/searchQueryStrings";
import MovieService from "../services/Movie.service";
import AnimeDetailsSkeleton from "../components/skeletons/AnimeDetailsSkeleton";
import StarRating from "../components/Rating/StarRating";

function MalAnimeDetails() {
  let id = useParams().id;
  const [loading, setLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [anilistResponse, setAnilistResponse] = useState();
  const [malResponse, setMalResponse] = useState({
    subLink: "",
    isDub: false,
    subTotalEpisodes: 0,
    dubTotalEpisodes: 0,
  });
  const [expanded, setExpanded] = useState(false);
  const [dub, setDub] = useState(false);
  const [notAvailable, setNotAvailable] = useState(false);
  const [rating, setRating] = useState(0);
  const [subTask, setSubTask] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getInfo();
  }, [id]);

  function readMoreHandler() {
    setExpanded(!expanded);
  }

  async function getInfo() {
    if (id === "null") {
      setNotAvailable(true);
      return;
    }
    setLoading(true);
    const aniRes = await api({
      baseURL: process.env.REACT_APP_BASE_URL,
      url: "",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      data: {
        query: searchByIdQuery,
        variables: {
          id,
        },
      },
    }).catch((err) => {
      setLoading(false);
      setNotAvailable(true);
      console.log(err);
    });
    setAnilistResponse(aniRes.data.data.Media);

    const malRes = await api
      .get(`${process.env.REACT_APP_BACKEND_URL}api/getidinfo?malId=${id}`)
      .catch((err) => {
        setLoading(false);
        // setNotAvailable(true);
      });

    if (malRes?.data) {
      setMalResponse(malRes.data);
    }

    const {
      data: { data: rating },
    } = await MovieService.getRating(id);
    if (rating) {
      setRating(rating);
    }
    setLoading(false);
  }

  const updateRating = async (newRating) => {
    const {
      data: { data: rating },
    } = await MovieService.updateRating(id, newRating);
    if (rating) {
      setRating(rating);
    }
  };

  const handleWatchValidation = (e) => {
    if (!malResponse.subLink) {
      e.preventDefault();
      dispatch(
        showDialog({
          title: "Error",
          msgs: "This anime is unavailable, sorry for this inconvenience!",
        })
      );
    }
  };

  return (
    <div>
      {notAvailable && (
        <NotAvailable>
          <img src="./assets/404.png" alt="404" />
          <h1>Oops! This Anime Is Not Available</h1>
        </NotAvailable>
      )}
      {loading && !notAvailable && <AnimeDetailsSkeleton />}
      {!loading && !notAvailable && (
        <Content>
          {anilistResponse !== undefined && (
            <div>
              <Banner
                src={
                  anilistResponse.bannerImage !== null
                    ? anilistResponse.bannerImage
                    : "https://cdn.wallpapersafari.com/41/44/6Q9Nwh.jpg"
                }
                alt=""
              />
              <ContentWrapper>
                <div className="col">
                  <div className="row mb-0">
                    <div className="col-2" style={{ position: "relative" }}>
                      <Poster>
                        <img
                          src={anilistResponse.coverImage.extraLarge}
                          alt=""
                        />
                        <Button
                          to={`/play/${malResponse.subLink}/1`}
                          onClick={handleWatchValidation}
                        >
                          Watch Sub
                        </Button>
                        {malResponse.isDub && (
                          <Button
                            className="outline"
                            to={`/play/${malResponse.dubLink}/1`}
                          >
                            Watch Dub
                          </Button>
                        )}
                      </Poster>
                    </div>
                    <div className="col-10">
                      <div className="anime-other-info">
                        <h1>{anilistResponse.title.userPreferred}</h1>
                        {anilistResponse.title.english != null && (
                          <h3>
                            {"English - " + anilistResponse.title.english}
                          </h3>
                        )}
                        {width <= 600 && expanded && (
                          <section>
                            <p
                              dangerouslySetInnerHTML={{
                                __html: `<span>Plot Summery: </span>${anilistResponse.description}`,
                              }}
                            ></p>
                            <button onClick={() => readMoreHandler()}>
                              read less
                            </button>
                          </section>
                        )}

                        {width <= 600 && !expanded && (
                          <p>
                            <span>Plot Summery: </span>
                            {anilistResponse.description.substring(0, 200) +
                              "... "}
                            <button onClick={() => readMoreHandler()}>
                              read more
                            </button>
                          </p>
                        )}
                        {width > 600 && (
                          <p
                            dangerouslySetInnerHTML={{
                              __html:
                                "<span>Plot Summery: </span>" +
                                anilistResponse.description,
                            }}
                          ></p>
                        )}
                      </div>
                    </div>
                    <NavBar>
                      <div className="nav-links">
                        <Links to={""} onClick={() => setSubTask(true)}>
                          Overview
                        </Links>
                        <Links to={""} onClick={() => setSubTask(false)}>
                          Watch
                        </Links>
                      </div>
                    </NavBar>
                  </div>

                  <hr style={{ color: "white" }} />
                  <div className="row">
                    <div className="col-2">
                      <MainInfo>
                        <ul className="anime-main-info">
                          <li className="your-rating">
                            <StarRating
                              rating={rating}
                              updateRating={updateRating}
                              unRating={false}
                            />
                          </li>
                          <li>
                            <span>Type</span>
                            <p>{anilistResponse.type}</p>
                          </li>
                          <li>
                            <span>Genre</span>
                            {anilistResponse.genres.map((item) => (
                              <p>{item}</p>
                            ))}
                          </li>
                          <li>
                            <span>Released</span>
                            <p>{anilistResponse.startDate.year}</p>
                          </li>
                          <li>
                            <span>Status</span>
                            <p>{anilistResponse.status}</p>
                          </li>
                          <li>
                            <span>Sub Episodes</span>
                            <p>{malResponse.subTotalEpisodes}</p>
                          </li>
                          {malResponse.isDub && (
                            <li>
                              <span>Dub Episodes</span>
                              <p>{malResponse.dubTotalEpisodes}</p>
                            </li>
                          )}
                        </ul>
                      </MainInfo>
                    </div>
                    <div className="col-10">
                      {subTask ? (
                        <RelationsCards>
                          <p>Relations</p>
                          <CardWrapper>
                            {anilistResponse.relations.nodes
                              .filter(
                                (item) => item.type === "ANIME" && item.idMal
                              )
                              .map((item) => (
                                <Links
                                  to={"/id/" + item.idMal}
                                  className="relation-items"
                                >
                                  <img src={item.coverImage.large} alt="" />
                                  <p style={{ marginBottom: 0 }}>
                                    {item.title.userPreferred}
                                  </p>
                                </Links>
                              ))}
                          </CardWrapper>
                        </RelationsCards>
                      ) : (
                        <Episode>
                          <DubContainer>
                            <p>Episodes</p>
                            {malResponse.isDub && (
                              <div className="switch">
                                <label for="switch">
                                  <input
                                    type="checkbox"
                                    id="switch"
                                    onChange={(e) => setDub(!dub)}
                                  ></input>
                                  <span className="indicator"></span>
                                  <span className="label">
                                    {dub ? "Dub" : "Sub"}
                                  </span>
                                </label>
                              </div>
                            )}
                          </DubContainer>
                          {width > 600 && (
                            <Episodes>
                              {malResponse.isDub &&
                                dub &&
                                [...Array(malResponse.dubTotalEpisodes)].map(
                                  (x, i) => (
                                    <EpisodeLink
                                      to={`/play/${malResponse.dubLink}/${
                                        parseInt(i) + 1
                                      }`}
                                    >
                                      Episode {i + 1}
                                    </EpisodeLink>
                                  )
                                )}

                              {!dub &&
                                [...Array(malResponse.subTotalEpisodes)].map(
                                  (x, i) => (
                                    <EpisodeLink
                                      to={`/play/${malResponse.subLink}/${
                                        parseInt(i) + 1
                                      }`}
                                    >
                                      Episode {i + 1}
                                    </EpisodeLink>
                                  )
                                )}
                            </Episodes>
                          )}
                          {width <= 600 && (
                            <Episodes>
                              {malResponse.isDub &&
                                dub &&
                                [...Array(malResponse.dubTotalEpisodes)].map(
                                  (x, i) => (
                                    <EpisodeLink
                                      to={`/play/${malResponse.dubLink}/${
                                        parseInt(i) + 1
                                      }`}
                                    >
                                      {i + 1}
                                    </EpisodeLink>
                                  )
                                )}

                              {!dub &&
                                [...Array(malResponse.subTotalEpisodes)].map(
                                  (x, i) => (
                                    <EpisodeLink
                                      to={`/play/${malResponse.subLink}/${
                                        parseInt(i) + 1
                                      }`}
                                    >
                                      {i + 1}
                                    </EpisodeLink>
                                  )
                                )}
                            </Episodes>
                          )}
                        </Episode>
                      )}
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </div>
          )}
        </Content>
      )}
    </div>
  );
}

const NotAvailable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
  img {
    width: 30rem;
  }
  @media screen and (max-width: 600px) {
    img {
      width: 18rem;
    }

    h1 {
      font-size: 1.3rem;
    }
  }
`;

const DubContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: start;

  .switch {
    position: relative;
    label {
      display: flex;
      align-items: center;
      font-family: "Lexend", sans-serif;
      font-weight: 400;
      cursor: pointer;
      margin-bottom: 0.3rem;
    }

    .label {
      font-weight: 500;
    }

    .indicator {
      position: relative;
      width: 60px;
      height: 30px;
      background: #242235;
      border: 2px solid #393653;
      display: block;
      border-radius: 30px;
      margin-right: 10px;
      &:before {
        width: 22px;
        height: 22px;
        content: "";
        display: block;
        background: #7676ff;
        border-radius: 26px;
        transform: translate(2px, 2px);
        position: relative;
        z-index: 2;
        transition: all 0.5s;
      }
    }
    input {
      visibility: hidden;
      position: absolute;

      &:checked {
        & + .indicator {
          &:before {
            transform: translate(32px, 2px);
          }
          &:after {
            width: 54px;
          }
        }
      }
    }
  }
`;

const Episode = styled.div`
  color: white;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    margin: 1rem;
  }
`;

const Episodes = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 160px);
  grid-gap: 5px;
  grid-row-gap: 5px;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, 4rem);
  }
`;

const EpisodeLink = styled(Link)`
  text-align: center;
  color: white;
  text-decoration: none;
  background-color: #242235;
  padding: 1rem 1rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: 1px solid #393653;
  transition: 0.2s;

  :hover {
    background-color: #7676ff;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
    border-radius: 0.3rem;
    font-weight: 500;
  }
`;

const Content = styled.div`
  margin: 2rem 5rem 2rem 5rem;
  position: relative;

  @media screen and (max-width: 600px) {
    margin: 1rem;
  }
`;

const ContentWrapper = styled.div`
  padding: 0 3rem 0 3rem;
  display: flex;

  div > * {
    margin-bottom: 0.6rem;
  }

  .anime-other-info {
    margin: 1rem;
    font-size: 1rem;
    color: #b5c3de;
    span {
      font-weight: 700;
      color: white;
    }
    p {
      font-weight: 300;
      text-align: justify;
    }
    h1 {
      font-weight: 700;
      color: white;
    }
    h3 {
      font-weight: 500;
    }
    // .your-rating {
    //   position: relative;
    // }
    // .your-rating div {
    //   margin: 0;
    // }
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column-reverse;
    padding: 0;
    div {
      margin: 1rem;
      margin-bottom: 0.2rem;
      h1 {
        font-size: 1.6rem;
      }
      p {
        font-size: 1rem;
      }
      button {
        display: inline;
        border: none;
        outline: none;
        background-color: transparent;
        text-decoration: underline;
        font-weight: 700;
        font-size: 1rem;
        color: white;
      }
    }
  }
`;

const Poster = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  img {
    width: 220px;
    height: 300px;
    border-radius: 0.5rem;
    // margin-bottom: 3rem;
    // top: -60px;
    // position: relative;
    filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  }
  @media screen and (max-width: 600px) {
    img {
      display: none;
    }
  }

  .outline {
    background-color: transparent;
    border: 2px solid #9792cf;
  }
`;

const MainInfo = styled.div`

  .anime-main-info {
    
    color: #b5c3de;
    list-style:none;
    margin: 0;
    padding: 0;

    li{
      margin-top: 20px;
      span {
        font-weight: 700;
        color: white;
        font-size: 1rem;
      }
      p {
        font-size: 14px;
        margin-bottom: 5px;
      }
    }

    .your-rating {
      p {
        font-size: 30px;
        margin-bottom: 0;
      }
    }
`;

const Button = styled(Link)`
  font-size: 1.2rem;
  padding: 1rem 3.4rem;
  text-align: center;
  text-decoration: none;
  color: white;
  background-color: #7676ff;
  font-weight: 700;
  border-radius: 0.4rem;
  // position: relative;
  // top: -90px;
  // white-space: nowrap;

  // @media screen and (max-width: 600px) {
  //   display: block;
  //   width: 100%;
  // }
`;

const Banner = styled.img`
  width: 100%;
  height: 20rem;
  object-fit: cover;
  border-radius: 0.7rem;

  @media screen and (max-width: 600px) {
    height: 13rem;
    border-radius: 0.5rem;
  }
`;

const Links = styled(Link)`
  color: white;
  font-weight: 400;
  text-decoration: none;
  margin: 0rem 1.3rem 0 1.3rem;
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 5rem 0 5rem;
  margin-bottom: 0 !important;
`;

const RelationsCards = styled.div`
  color: white;
`;
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 110px);
  grid-gap: 5px;
  grid-row-gap: 1.5rem;
  justify-content: space-between;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, 120px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 400px) {
    grid-template-columns: repeat(auto-fill, 110px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }

  @media screen and (max-width: 380px) {
    grid-template-columns: repeat(auto-fill, 100px);
    grid-gap: 0rem;
    grid-row-gap: 1.5rem;
  }
  .relation-items {
    margin: 0;
    font-size: 10px;
    img {
      width: 100px;
      height: 140px;
    }
  }
`;

export default MalAnimeDetails;
