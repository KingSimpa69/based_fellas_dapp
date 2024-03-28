import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Index.module.css";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import delay from "@/functions/delay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 const Home = ({routeChange,spotlight,setSpotlight}) => {

  const MENU_ITEMS = 4

  const options = [
    {text:"About Us",image:"/images/planets/2.gif",route:"about"},
    {text:"Collection",image:"/images/planets/1.gif",route:"collection"},
    {text:"Homes",image:"/images/planets/3.gif",route:"homes"},
    {text:"Market",image:"/images/planets/4.gif",route:"market"}
  ]

  const [planetCss,setPlanetCss] = useState("")

  const swipeHandler = useSwipeable({
    onSwiped: (eventData) => {
      changePlanet(eventData.dir)
    }
  });
  const changePlanet = async (direction) => {
    if (direction === "Right" && spotlight !== 0 ){
      setPlanetCss("animate__animated animate__slideOutRight animate__faster")
      await delay(200)
      setSpotlight(spotlight - 1)
      setPlanetCss("animate__animated animate__slideInLeft animate__faster")
    }
    if (direction === "Left" && spotlight !== (MENU_ITEMS-1)){
      setPlanetCss("animate__animated animate__slideOutLeft animate__faster")
      await delay(200)
      setSpotlight(spotlight + 1)
      setPlanetCss("animate__animated animate__slideInRight animate__faster")
    } 
  }

  return (
    <div {...swipeHandler} className="wrapper">
      <div className={styles.planetSelection}>
        <div className={planetCss}><Image onClick={()=>options[spotlight].route !== "market" ? routeChange(options[spotlight].route):null} priority alt={"planet"+spotlight} src={options[spotlight].image} width={200} height={200} /></div>
        <div className={styles.arrows}>
          <div onClick={()=>changePlanet("Right")} className={spotlight !== 0 ? styles.arrow : `${styles.arrow} invisible`}><FontAwesomeIcon icon="fa-solid fa-chevron-left" /></div>
          <div onClick={()=>changePlanet("Left")} className={spotlight !== (MENU_ITEMS-1) ? styles.arrow : `${styles.arrow} invisible`}><FontAwesomeIcon icon="fa-solid fa-chevron-right" /></div>
        </div>
        <p>{options[spotlight].text}</p>
      </div>
    </div>
  )
}

export default Home