// Karakter bileşeniniz buraya gelecek

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Filmler from "./Filmler.js";

const ContainerKarakterler = styled.div`
     width: 40vw;
    margin-left: auto;
    font-family = "Londrina Sketch";
    margin-right: auto;
    font-size: medium;
`;

const KarakterBilgileri = styled.div`
  border: 2px solid white;
  background-color: rgb(114 190 218 / 0.5);
  padding: 15px;
  border-radius: 10px;
  box-shadow: rgba(3, 138, 255, 0.4) 5px 5px, rgba(82, 78, 183, 0.3) 10px 10px,
    rgba(44, 130, 201, 0.2) 15px 15px, rgba(0, 0, 0, 0.2) 20px 20px,
    rgba(240, 46, 170, 0.05) 25px 25px;
`;


export default function Karakter(props) {
  const [karakterler, setKarakterler] = useState([]);
  const [selectedKarakter, setSelectedKarakter] = useState(null);

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/")
      .then((response) => {
        console.log(response.data);
        setKarakterler(response.data);
      })
      .catch((error) => {
        console.log("Error!" + error);
      });
  }, []);


  function handleAccordionClick(karakter) {
    setSelectedKarakter(selectedKarakter === karakter ? null : karakter);
  }

  return (
    <ContainerKarakterler>
      {karakterler ? (
        karakterler.map((karakter) => (
          <KarakterBilgileri>
            <button onClick={() => handleAccordionClick(karakter)}>
              {karakter.name}
            </button>
            {selectedKarakter === karakter && (
              <div>
                <p>height : {karakter.height}</p>
                <p>mass : {karakter.mass}</p>
                <p>hair_color : {karakter.hair_color}</p>
                <p>skin_color :{karakter.skin_color}</p>
                <p>eye_color :{karakter.eye_color}</p>
                <p>birth_year :{karakter.birth_year}</p>
                <p>gender :{karakter.gender}</p>
                <p>homeworld :{karakter.homeworld}</p>
                <Filmler filmler={karakter.films} />
              </div>
            )}
          </KarakterBilgileri>
        ))
      ) : (
        <h3>Yükleniyor...</h3>
      )}
    </ContainerKarakterler>
  );
}