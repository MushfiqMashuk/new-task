import styles from "./tabItem.module.scss";

const TabItem = ({ handleOnClick, label }) => {
  return (
    <div className={styles.container} onClick={() => handleOnClick(label)}>
      {label}
    </div>
  );
};

export default TabItem;
