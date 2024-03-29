import "@/styles/globals.css";
import Header from "@/components/Head";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
const { library, config } = require('@fortawesome/fontawesome-svg-core');
import { faTwitter, faGithub, faDiscord, faLinkedin, faXTwitter, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { faCopy, faPaperPlane, faImage, faIdCard, faPaste } from '@fortawesome/free-regular-svg-icons';
import { faChevronDown, faQuestionCircle, faGlobe, faChevronLeft, faChevronRight, faWallet, faXmark,faInfo } from '@fortawesome/free-solid-svg-icons';
import TwinklingStars from "@/components/TwinklingStars";
import MatrixLoadingScreen from "@/components/LoadingScreen";
import 'animate.css';
import { useState } from "react";
import { useRouter } from 'next/router'
import delay from "@/functions/delay";
import { useWindowSize } from "@/hooks/useWindowSize";
import FellaModal from '@/components/collection/FellaModal';
import { Web3Modal } from "@/components/Web3/Web3Modal";
import Alert from "@/components/Alert";
library.add(faWallet,
  faTwitter,
  faGithub,
  faDiscord,
  faLinkedin,
  faCopy,
  faPaperPlane,
  faIdCard,
  faImage,
  faChevronDown,
  faQuestionCircle,
  faPaste,
  faGlobe,
  faXTwitter,
  faTelegram,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faInfo)
config.autoAddCss = false;

export default function App({ Component, pageProps }) {

  const router = useRouter()
  const windowSize = useWindowSize()

  const [wrapperCss,setWrapperCss] = useState("")
  const [wrapperCss1,setWrapperCss1] = useState("")

  const [activeMeta,setActiveMeta] = useState([])
  const [modal,modalOpen] = useState(false)
  const [active,setActive] = useState(0)
  const [spotlight,setSpotlight] = useState(0)

  const [alerts,setAlerts] = useState([])
  const [isLoading,setIsLoading] = useState(false)

  const [web3Shit, setWeb3Shit] = useState({chain: 0, address: undefined, isConnected: false})

  const routeChange = async (route) => {
    console.log(route)
    setWrapperCss("animate__animated animate__zoomOut")
    await delay(420)
    setWrapperCss1("invisible")
    router.push(route)
    await delay(200)
    setWrapperCss1("")
    setWrapperCss("animate__animated animate__zoomIn animate__faster")
  }

  const alert = (type,message,tx) => {
    setAlerts(alerts=>[...alerts,{
      type:type,
      message:message,
      tx:tx
    }])
  }

  return(
  <Web3Modal>
    <Header />
    <MatrixLoadingScreen isLoading={isLoading}/>
    <Alert web3Shit={web3Shit} alerts={alerts} setAlerts={setAlerts} />
    <TwinklingStars />
    <FellaModal activeMeta={activeMeta} id={active} open={modal} setOpen={modalOpen} />
    <Nav routeChange={routeChange}  web3Shit={web3Shit} setWeb3Shit={setWeb3Shit} />
    <div className={`${wrapperCss} ${wrapperCss1}`}>
    <Component 
      setIsLoading={setIsLoading}
      alert={alert}
      web3Shit={web3Shit}
      spotlight={spotlight} 
      setSpotlight={setSpotlight} 
      windowSize={windowSize} 
      routeChange={routeChange} 
      router={router} 
      setActiveMeta={setActiveMeta}
      modalOpen={modalOpen}
      setActive={setActive}
      active={active}
      modal={modal}
      {...pageProps} 
    />
    </div>
    <Footer />
    </Web3Modal>
    )
}
