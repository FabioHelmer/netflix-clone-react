import React from "react";
import "./FeatureMovie.css";

const FeatureMovie = ({ item }) => {
  let generos = [];
  for (let i in item.genres) {
    generos.push(item.genres[i].name);
  }

  return (
    <section
      className="feature"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`,
      }}
    >
      <div className="feature--vertical">
        <div className="feature--horizontal">
          <div className="feature--name">{item.original_name}</div>
          <div className="feature--info">
            <div className="feature--points">{item.vote_average} pontos</div>
            <div className="feature--year">
              {new Date(item.first_air_date).getFullYear()} 
            </div>
            <div className="feature--temporadas">       
              {item.number_of_seasons} temporada
              {item.number_of_seasons !== 1 ? "s" : ""}
            </div>
          </div>
          <div className="feature--descricao"> 
            <p>{item.overview}</p>
          </div>
          <div className="feature--botoes">
            <a href={`/watch/${item.id}`} className="feature--watchbutton">⏵ Assistir</a>
            <a href={`/list/add/${item.id}`} className="feature--mylistbutton">+ minha lista</a>
          </div>
          <div className="feature--generos">
            <strong>Gêneros:</strong> {generos.join(", ")}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureMovie;
