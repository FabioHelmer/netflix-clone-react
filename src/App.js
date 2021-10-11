import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow/MovieRow";
import FeatureMovie from "./components/FeaturedMovie/FeatureMovie";
import Header from "./components/Header/Header";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [featureData, setFeatureData] = useState(null);
  const [headerBlack, setHeaderBlack] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //pegando lista de filmes
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //pegando o feature
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );

      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeatureData(chosenInfo);
    };
    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setHeaderBlack(true);
      } else {
        setHeaderBlack(false);
      }
    };
    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={headerBlack} />
      {featureData && <FeatureMovie item={featureData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} titulo={item.titulo} items={item.items} />
        ))}
      </section>

      <footer>
        <div> Feito por Fabio Helmer</div>
        <div>Direitos de Imagem para Netflix</div>
        <div>Dados do site themoviedb.org</div>
        <div>conteudo de b7web.com.br</div>
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
};

export default App;
