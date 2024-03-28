import styles from '@/styles/Collection.module.css';
import eyes from "./attributes/eyes"
import head from "./attributes/head"
import earrings from "./attributes/earrings"
import mouth from "./attributes/mouth"
import necklace from './attributes/necklace';
import outfit from './attributes/outfit'
import { type } from "./attributes/type"
import Dropdown from './DropDown';

const Filter = (filter) => {

  const numberFilter = (e) => {
    const int = parseInt(e);
    if (!isNaN(int) && int >= 0 && int <= 9999) {
      filter.setId(int);
    } else {
      filter.setId("");
    }
  };

  return (
    <div className={styles.filterbox}>
      <input
        onChange={(e) => { numberFilter(e.target.value) }}
        className={styles.input}
        placeholder='Fella #'
        value={filter.id}
        type="text"
        pattern="[0-9]*"
        inputMode="numeric"
      />
      {[
        { setFilter: filter.setEarrings, filter: filter.filters.earrings, attributes: earrings, type: "earrings" },
        { setFilter: filter.setEyes, filter: filter.filters.eyes, attributes: eyes, type: "eyes" },
        { setFilter: filter.setHead, filter: filter.filters.head, attributes: head, type: "head" },
        { setFilter: filter.setMouth, filter: filter.filters.mouth, attributes: mouth, type: "mouth" },
        { setFilter: filter.setNecklace, filter: filter.filters.necklace, attributes: necklace, type: "necklace" },
        { setFilter: filter.setOutfit, filter: filter.filters.outfit, attributes: outfit, type: "outfit" },
        { setFilter: filter.setType, filter: filter.filters.type, attributes: type, type: "type" },
      ].map((item) => (
        <Dropdown
          key={item.type}
          setFilter={item.setFilter}
          filter={item.filter}
          attributes={item.attributes}
          type={item.type}
        />
      ))}
    </div>
  )
}

export default Filter;
