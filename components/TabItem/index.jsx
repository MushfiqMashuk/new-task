import styles from "./tabItem.module.scss";

const TabItem = ({ handleOnClick, label, activeTab }) => {
  return (
    <div
      className={`${styles.container} ${activeTab === label && "active_tab"}`}
      onClick={() => handleOnClick(label)}
    >
      {label}
    </div>
  );
};

export default TabItem;
