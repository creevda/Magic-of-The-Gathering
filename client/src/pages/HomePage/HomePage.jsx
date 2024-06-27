import React, { useEffect, useState } from "react";
import "../../components/SearchBar.css";
import { MDBContainer } from "mdb-react-ui-kit";
import styles from "./HomePage.module.css";
import axios from "axios";
import Cards from "../../components/Card";
import Select from "react-dropdown-select";

export default function HomePage({ user }) {
  const [searchInput, setSearchInput] = useState("");
  const [cards, setCards] = useState({
    loading: true,
    data: [],
  });
  const options = [
    {
      value: 1,
      label: 'Leanne Graham'
    },
    {
      value: 2,
      label: 'Ervin Howell'
    }
  ];

  const fetchCards = async (query = "") => {
    try {
      const { data } = await axios.get(
        `https://api.magicthegathering.io/v1/cards`
      );
      const filteredCards = data.cards.filter(card =>
        card.name.toLowerCase().includes(query.toLowerCase()) ||
        card.type.toLowerCase().includes(query.toLowerCase()) ||
        card.artist.toLowerCase().includes(query.toLowerCase()) ||
        card.setName.toLowerCase().includes(query.toLowerCase()) ||
        card.rarity.toLowerCase().includes(query.toLowerCase())
      );
      setCards({ data: filteredCards, loading: false });
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCards(searchInput);
  }, [searchInput]);

  return (
    <>
      <div className={styles.wrapperHome}>
        <MDBContainer className="py-5">
          <input
            type="text"
            className="search-hover"
            placeholder="Поиск..."
            style={{ color: "black" }}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
        </MDBContainer>
        <MDBContainer className="py-5">
        <Select options={options} onChange={(values) => this.setValues(values)} />
        </MDBContainer>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "50px",
            justifyContent: "center",
            gap: "50px",
          }}
        >
          {!cards.loading &&
            cards.data.map(
              (card, i) => i % 2 === 0 && <Cards key={card.id} card={card} user={user}/>
            )}
        </div>
      </div>
    </>
  );
}
