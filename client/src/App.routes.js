import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";
import Nav from "./components/Navigation/Nav";
import AnimeDetails from "./pages/AnimeDetails";
import FavouriteAnime from "./pages/FavouriteAnime";
import Home from "./pages/Home";
import MalAnimeDetails from "./pages/MalAnimeDetails";
import PopularAnime from "./pages/PopularAnime";
import PopularMovies from "./pages/PopularMovies";
import SearchResults from "./pages/SearchResults";
import Top100Anime from "./pages/Top100Anime";
import TrendingAnime from "./pages/TrendingAnime";
import WatchAnime from "./pages/WatchAnime";
import WatchAnimeV2 from "./pages/WatchAnimeV2";
import GlobalStyle from "./styles/globalStyles";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RecommendAnime from "./pages/RecommendAnime";
import DefaultLoading from "./components/Base/DefaultLoading";

function AppRoutes() {
  return (
    <Suspense fallback={<DefaultLoading />}>
      <Router>
        <GlobalStyle />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/popular/:page" element={<PopularAnime />} />
          <Route path="/trending/:page" element={<TrendingAnime />} />
          <Route path="/favourites/:page" element={<FavouriteAnime />} />
          <Route path="/top100/:page" element={<Top100Anime />} />
          <Route path="/movies" element={<PopularMovies />} />
          <Route path="/recommend/:page" element={<RecommendAnime />} />
          <Route path="/search/:name" element={<SearchResults />} />
          <Route path="/category/:slug" element={<AnimeDetails />} />
          <Route path="/watch/:episode" element={<WatchAnime />} />
          <Route path="/id/:id" element={<MalAnimeDetails />} />
          <Route path="/play/:slug/:episode" element={<WatchAnimeV2 />} />
        </Routes>
        <Toaster
          toastOptions={{
            style: {
              borderRadius: "10px",
              background: "#242235",
              border: "1px solid #393653",
              color: "#fff",
            },
          }}
        />
      </Router>
    </Suspense>
  );
}

export default AppRoutes;
