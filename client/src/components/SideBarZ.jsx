import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import "./SearchBar.css";

export default function SideBar({ cards, setCards }) {
  const [visible, setVisible] = useState(false);

  const [category, setCategory] = useState();
  
console.log(category);
  const rarityHandle = (categoty1) => {
    setCategory(categoty1)
    const filteredCategory = cards.filter(card => card.rarity === categoty1)
    setCards(() => ({ data: filteredCategory, loading: false }));
  }

  return (
    <div className="searchAll">
      <Sidebar
        style={{ marginTop: "154px", fontSize: "25px", height: '150px', borderRadius: '15px' }}
        className="sideBar"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <div style={{ marginLeft: "20px" }}>Редкость</div>
        <Button onClick={() => rarityHandle('Uncommon')} style={{ background: "none", fontSize: "17px", border: "none", marginLeft: "100px" }}>
          Uncommon
        </Button>
        <Button style={{ background: "none", fontSize: "17px", border: "none", marginLeft: "100px" }}>
          Common
        </Button>
        <Button style={{ background: "none", fontSize: "17px", border: "none", marginLeft: "100px" }}>
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
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '115px'
        }}
      >
        Расширенный поиск
      </button>
    </div>
  );
}