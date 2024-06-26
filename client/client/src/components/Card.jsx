import { useState, useEffect } from "react";
import react from "react";
import axios from 'axios';
import styles from './Card.module.css';
import 'animate.css';
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
  Image
} from "@chakra-ui/react";

export default function Cards() {
    const [card, setCards] = useState({
        loading: true
    });
    const [fullInfo, setFullInfo] = useState(false)
    const heandlerInfo=()=>{
       setFullInfo(prev=>!prev)
    }
//   animate__flipInX
    
useEffect(() => {
    const fetchData = async () => {
        try {
            const { data }= await axios.get('https://api.magicthegathering.io/v1/cards/15');
            
             setCards(()=>({data:data.card, loading:false}));
            
        } catch (error) {
            console.error('&&&&&&&&&&&&', error);
        }
    };
    fetchData();
}, []);
//animate__flipInX
console.log(card, '+++++++++++++++')
  return (
    <>{card.loading ? (<h1>загрузка</h1>) : (
        
        
     <div className={styles.wrapper}>
         {fullInfo ?  (<> <div className="cart" style={{animation: "slideInUp 0.2s"}}><Text size='md'> Описание: {card.data.text} </Text> <Text size='md'> Редкость: {card.data.rarity} </Text> 
            <Text size='md'> Автор карточки: {card.data.artist} </Text>
                <Button variant='ghost' colorScheme='blue' className="btn2" marginBottom = '10px' onClick={heandlerInfo}> 
               Назад 
            </Button></div></>
         ) : (
      <Card maxW='sm' style={{animation: "fadeIn 1.4s"}}>
        <CardBody className='cardd' >
          <Image  
            className="image-radius"
            src={card.data.imageUrl}
            alt='Green double couch with wooden legs'
            borderRadius='15px'
            marginTop='15px'
            
          />
          <Stack mt='3' spacing='3' pt='2'>
            <Heading size='md'>{card.data ? card.data.name : 'Название карточки'}</Heading>
            
           <div className="container"> <Text size='md' >Тип:{card.data.type }  </Text>                   
            <Text size='md'> Колода: {card.data.setName } </Text></div>
           
            
            
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter justify='center'>
          <ButtonGroup spacing='2'>
            <Button onClick={heandlerInfo} variant='solid' colorScheme='blue' className="btn1" marginBottom = '10px'>
              Подробнее
            </Button>
            <Button variant='ghost' colorScheme='blue' className="btn2" marginBottom = '10px'> 
              Купить(цена)
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
         )}
    </div>
    
    )}
    </>
  );
}
