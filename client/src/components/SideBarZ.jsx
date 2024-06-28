import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "./SearchBar.css";
import axios from "axios";

export default function SideBar({ cards, setCards, fetchCards, searchInput }) {
  const [visible, setVisible] = useState(false);

  const [category, setCategory] = useState();

  const fetchCardsRarity = async (rarity) => {
    try {
      const { data } = await axios.get(
        `https://api.magicthegathering.io/v1/cards`
      );
      if (rarity === "All") {
        setCards({ data: data.cards, loading: false });
      } else {
        const filteredCards = data.cards.filter(
          (card) => card.rarity === rarity
        );
        setCards({ data: filteredCards, loading: false });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchCardsRarity(category);
  }, [category]);

  const rarityHandle = async (category) => {
    setCategory(category);
  };

  return (
    <div className="searchAll">
      <Sidebar
        style={{
          marginTop: "154px",
          fontSize: "25px",
          height: "150px",
          borderRadius: "15px",
        }}
        className="sideBar"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div style={{ marginLeft: "20px" }}>Редкость</div>
        <Button
          onClick={() => rarityHandle("All")}
          style={{
            background: "none",
            fontSize: "17px",
            border: "none",
            marginLeft: "100px",
          }}
        >
          All
        </Button>
        <Button
          onClick={() => rarityHandle("Uncommon")}
          style={{
            background: "none",
            fontSize: "17px",
            border: "none",
            marginLeft: "100px",
          }}
        >
          Uncommon
        </Button>
        <Button
          onClick={() => rarityHandle("Common")}
          style={{
            background: "none",
            fontSize: "17px",
            border: "none",
            marginLeft: "100px",
          }}
        >
          Common
        </Button>
        <Button
          onClick={() => rarityHandle("Rare")}
          style={{
            background: "none",
            fontSize: "17px",
            border: "none",
            marginLeft: "100px",
          }}
        >
          Rare
        </Button>
      </Sidebar>
      <button
        className="searchAllBut"
        onClick={() => setVisible(true)}
        style={{
          backgroundColor: "white",
          borderRadius: "7px",
          border: "none",
          width: "310px",
          height: "50px",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "115px",
        }}
      >
        Расширенный поиск
      </button>
    </div>
  );
}
