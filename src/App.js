import React, { useEffect, useState } from 'react';
import { Accordion } from 'reactstrap';
import axios from "axios";

import Karakter from "./components/Karakter.js";
import { ContainerKarakterler, KarakterBilgileri } from './components/styled.js';


const App = () => {
  // state & variables 
  const [karakterler, setKarakterler] = useState([]);
  const [selectedKarakter, setSelectedKarakter] = useState(false);

  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.

  // Fetch characters from the API in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.

  // methods



  function handleAccordionClick(id) {
    setSelectedKarakter(selectedKarakter === id ? null : id);
  }


  // useEffects


  // life cycle event: component did mount! 
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


  // template

  return (
    <div className="App">
      <h1 className="Header">Star Wars Karakterleri</h1>
      <ContainerKarakterler>

        <KarakterBilgileri>
          <Accordion open={selectedKarakter} toggle={handleAccordionClick}>
            {karakterler ? (
              karakterler.map((karakter) => (
                <Karakter karakter={karakter} />
              ))
            ) : (
              <h3>Yükleniyor...</h3>
            )}
          </Accordion>
        </KarakterBilgileri>
      </ContainerKarakterler>
    </div>
  );
}

export default App;
