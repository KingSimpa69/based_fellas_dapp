import Image from "next/image";
import styles from "@/styles/Index.module.css";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import delay from "@/functions/delay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 const Home = ({routeChange,spotlight,setSpotlight,alert}) => {

  const MENU_ITEMS = 7

  const options = [
    {text:"About Us",image:"/images/planets/2.gif",route:"about"},
    {text:"FELLA Token",image:"/images/planets/5.gif",route:"fella"},
    {text:"Collection",image:"/images/planets/1.gif",route:"collection"},
    {text:"Homes",image:"/images/planets/3.gif",route:"homes"},
    {text:"Market",image:"/images/planets/4.gif",route:"market"},
    {text:"King's Chests",image:"/images/planets/7.gif",route:"kingschests"},
    {text:"My Wallet",image:"/images/planets/6.gif",route:"wallet"},
  ]

  const [planetCss,setPlanetCss] = useState("")

  const swipeHandler = useSwipeable({
    onSwiped: (eventData) => {
      changePlanet(eventData.dir)
    }
  });
  const changePlanet = async (direction) => {
    console.log(direction)
    if (direction === "Right" && spotlight !== 0 ){
      setPlanetCss("animate__animated animate__slideOutRight animate__faster")
      await delay(200)
      setSpotlight(parseInt(spotlight - 1))
      await delay(250)
      setPlanetCss("animate__animated animate__slideInLeft animate__faster")
    } else if (direction === "Right" && spotlight === 0 ) {
      setPlanetCss("animate__animated animate__slideOutRight animate__faster")
      await delay(200)
      setSpotlight(parseInt(options.length - 1))
      await delay(250)
      setPlanetCss("animate__animated animate__slideInLeft animate__faster")
    }
    if (direction === "Left" && spotlight !== (MENU_ITEMS-1)){
      setPlanetCss("animate__animated animate__slideOutLeft animate__faster")
      await delay(200)
      setSpotlight(parseInt(spotlight + 1))
      await delay(250)
      setPlanetCss("animate__animated animate__slideInRight animate__faster")
    } else if (direction === "Left" && spotlight === (MENU_ITEMS-1)) {
      setPlanetCss("animate__animated animate__slideOutLeft animate__faster")
      await delay(200)
      setSpotlight(parseInt(options.length - MENU_ITEMS))
      await delay(250)
      setPlanetCss("animate__animated animate__slideInRight animate__faster")
    }
  }

  return (
    <div {...swipeHandler} className="wrapper">
      <div className={styles.planetSelection}>
        <div className={planetCss}><Image unoptimized onClick={()=> options[spotlight].route === "market" ? alert("info","Coming soon") : options[spotlight].route === "kingschests" ? window.open('https://kingschests.io', '_blank') : routeChange(options[spotlight].route)} priority alt={"planet"+spotlight} src={options[spotlight].image} width={200} height={200} /></div>
        <div className={styles.arrows}>
          <div onClick={()=>changePlanet("Right")} className={styles.arrow}><FontAwesomeIcon icon="fa-solid fa-chevron-left" /></div>
          <div onClick={()=>changePlanet("Left")} className={styles.arrow}><FontAwesomeIcon icon="fa-solid fa-chevron-right" /></div>
        </div>
        <p>{options[spotlight].text}</p>
      </div>
    </div>
  )
}

export default Home