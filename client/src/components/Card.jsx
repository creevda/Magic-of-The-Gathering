import { useState, useEffect } from "react";
import react from "react";
import axios from "axios";
import styles from "./Card.module.css";
import "animate.css";
import {
  Avatar,
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  ButtonGroup,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Input,
  Image,
} from "@chakra-ui/react";

export default function Cards({ card }) {
  const [fullInfo, setFullInfo] = useState(false);
  const heandlerInfo = () => {
    setFullInfo((prev) => !prev);
  };
  //   animate__flipInX
  //animate__flipInX

  return (
    <>
      <div className={styles.wrapper}>
        {fullInfo ? (
          <>
            {" "}
            <div className="cart" style={{ animation: "slideInUp 0.2s" }}>
              <Text size="md"> Описание: {card.text} </Text>{" "}
              <Text size="md"> Редкость: {card.rarity} </Text>
              <Text size="md"> Автор карточки: {card.artist} </Text>
              <Button
                variant="ghost"
                colorScheme="blue"
                className="btn2"
                marginBottom="10px"
                onClick={heandlerInfo}
              >
                Назад
              </Button>
            </div>
          </>
        ) : (
          <Card maxW="sm" style={{ animation: "fadeIn 1.4s" }}>
            <CardBody className="cardd">
              <Image
                className="image-radius"
                src={card.imageUrl ? card.imageUrl : 'card.jpg'}
                alt="Green double couch with wooden legs"
                borderRadius="15px"
                marginTop="15px"
              />
              <Stack mt="3" spacing="3" pt="2">
                <Heading size="md">
                  {card ? card.name : "Название карточки"}
                </Heading>

                <div className="container">
                  {" "}
                  <Text size="md">Тип: {card.type} </Text>
                  <Text size="md"> Колода: {card.setName} </Text>
                </div>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter justify="center">
              <ButtonGroup spacing="2">
                <Button
                  onClick={heandlerInfo}
                  variant="solid"
                  colorScheme="blue"
                  className="btn1"
                  marginBottom="10px"
                >
                  Подробнее
                </Button>
                <Button
                  variant="ghost"
                  colorScheme="blue"
                  className="btn2"
                  marginBottom="10px"
                >
                  Купить(цена)
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
