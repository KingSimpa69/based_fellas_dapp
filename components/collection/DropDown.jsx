import styles from "@/styles/Collection.module.css";

const Dropdown = ({ attributes, type, setFilter, filter }) => {
    
  const defaultValue = filter === "" ? `${type.toUpperCase()}` : filter;

  const handleChange = (e) => {
    setFilter(e.target.value === `${type.toUpperCase()}` ? "" : e.target.value);
  };

  return (
    <select
      value={defaultValue}
      onChange={handleChange}
      className={styles.dropdown}
      name={type}
      id={type}
    >
      {attributes.map((e) => {
        return (
          <option className={styles.option} key={e} value={e}>
            {e}
          </option>
        );
      })}
    </select>
  );
};

export default Dropdown;
