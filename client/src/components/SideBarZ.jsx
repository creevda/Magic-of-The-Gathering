import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

export default function SideBar({ cards, setCards }) {
  const [visible, setVisible] = useState(false);
  const [category, setCategory] = useState()

  const rarityHandle = (categoty) => {
    setCategory(category)
  }

  console.log(cards);
  return (
    <div className="card flex justify-content-center">
      <Sidebar style={{marginTop: "154px", fontSize: "25px"}} visible={visible} onHide={() => setVisible(false)}>
        <div style={{marginLeft: "20px"}}>Редкость</div>
        <Button onClick={() => rarityHandle('Uncommon')} style={{background: "none", fontSize: "17px", border: "none", marginLeft: "100px"}}>
         Uncommon
        </Button>
        <Button style={{background: "none", fontSize: "17px", border: "none", marginLeft: "100px"}}>
         Common
        </Button>
        <Button style={{background: "none", fontSize: "17px", border: "none", marginLeft: "100px"}}>
         Rare
        </Button>
      </Sidebar>
      <button
        onClick={() => setVisible(true)}
        style={{
          backgroundColor: "white",
          borderRadius: "7px",
          border: "none",
          width: "350px",
          height: "30px",
        }}
      >
        Расширенный поиск
      </button>
    </div>
  );
}
