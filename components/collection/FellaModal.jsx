import styles from "../../styles/Collection.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import delay from "@/functions/delay";

const FellaModal = ({ id, open, setOpen, activeMeta }) => {
  const [css0, setCss0] = useState("hidden");
  const [css1, setCss1] = useState("");

  const toggleModal = async (bool) => {
    if (bool === true) {
      setCss0(`${styles.modalwrapper}`);
      setCss1(`animate__animated animate__zoomIn animate__faster`);
    } else {
      setCss1(`animate__animated animate__zoomOut animate__faster`);
      await delay(200);
      setCss0(`hidden`);
    }
  };

  useEffect(() => {
    open ? toggleModal(true) : toggleModal(false);
  }, [open, id]);

  return (
    <div
      onClick={() => {
        setOpen(false);
      }}
      className={`${css0}`}
    >
        <p onClick={()=>{setOpen(false);}} className={styles.closemsg}>Click outside to close</p>
      <div className={`${styles.modalcont} ${css1}`} onClick={(e)=>e.stopPropagation()}>
      <h1 className={`${styles.h1} ${styles.modalheader}`}>{id}</h1>
        <div className={styles.modalfella}>
          <Image alt={`bigfella${id}`} priority={true} src={`/images/fellas/${id}.png`} width={250} height={250} unoptimized />
        </div>
        <div className={styles.modalstats}>
          {activeMeta.map((e, index) => {
            return (
              <div key={index + "_" + e.trait_type} className={styles.stat}>
                <div className={styles.attribheader}>
                  {e.trait_type}
                  {" "}
                  </div>
                <div className={styles.attribp}>{e.value}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.ipfs}>
            <a className={styles.ipfsimage} target="_blank" href={`https://ipfs.basedfellas.io/ipfs/bafybeihox5skzzewbpyf6crsgxddcxkyrssy4wpbcc4dchpbyd55zaft5m/${id}.png`}>Image</a>
            <a className={styles.ipfsmeta} target="_blank" href={`https://ipfs.basedfellas.io/ipfs/bafybeigr7b3cbyrhyjnmv6nx7itr7v25ghqqhfzb23owwvtmaj7vh5vlr4/${id}`}>Metadata</a>
        </div>
      </div>
    </div>
  );
};

export default FellaModal;
