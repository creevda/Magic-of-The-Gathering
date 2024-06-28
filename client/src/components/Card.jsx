import React, { useState } from "react";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Image,
} from "@chakra-ui/react";
import styles from "./Card.module.css";
import axiosInstance from '../axiosInstance';

export default function Cards({ card, user, addToCart }) {
  const [cardInfo, setCardInfo] = useState({});
  const [fullInfo, setFullInfo] = useState(false);

  const buyButtonHandle = async () => {
    try {
      const newCard = await axiosInstance.post("http://localhost:3000/cards", {
        name: card.name,
        category: card.type,
        price: 1000,
        city_owner: "Moscow",
        description: card.text,
        img: card.imageUrl,
        frazzle: "new",
        sold: false,
        serialId: card.id
      });
      setCardInfo(() => newCard);
      // setAccessToken(res.data.accessToken);
    } catch (error) {
      console.log(error.message);
    }
  };

  const heandlerInfo = () => {
    setFullInfo((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      {fullInfo ? (
        <div className="cart" style={{ animation: "slideInUp 0.2s" }}>
          <Text size="md"> Описание: {card.text} </Text>
          <Text size="md"> Редкость: {card.rarity} </Text>
          <Text size="md"> Автор карточки: {card.artist} </Text>
          <Button
            variant="ghost"
            colorScheme="blue"
            marginBottom="10px"
            onClick={heandlerInfo}
          >
            Назад
          </Button>
        </div>
      ) : (
        <Card maxW="sm" style={{ animation: "fadeIn 1.4s" }}>
          <CardBody>
            <Image
              src={card.imageUrl ? card.imageUrl : "card.jpg"}
              alt={card.name}
              borderRadius="15px"
              marginTop="15px"
            />
            <Stack mt="3" spacing="3" pt="2">
              <Heading size="md">{card.name}</Heading>
              <Text size="md">Тип: {card.type}</Text>
              <Text size="md">Колода: {card.setName}</Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter justify="center">
            <ButtonGroup spacing="2">
              <Button
                onClick={heandlerInfo}
                variant="solid"
                colorScheme="blue"
                marginBottom="10px"
              >
                Подробнее
              </Button>
              <Button
                onClick={() => addToCart(card)}
                variant="ghost"
                colorScheme="blue"
                marginBottom="10px"
                borderRadius={15}
                height={20}
              >
                Добавить в корзину
                
              </Button>
              
            </ButtonGroup>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
