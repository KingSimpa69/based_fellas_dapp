import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Index.module.css";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import delay from "@/functions/delay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Breadcrumbs from "@/components/Breadcrumbs";
import OurStory from "@/components/about/OurStory";
import TheTeam from "@/components/about/TheTeam";

const About = ({routeChange,router}) => {

  return (
    <div className="wrapper">
      <Breadcrumbs changeRoute={routeChange} route={router} />
      <OurStory />
      <TheTeam />
    </div>
  )
}

export default About
