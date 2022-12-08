import { useState } from "react";
import TabItem from "../TabItem";
import styles from "./tabs.module.scss";

const Tabs = ({ children, title = "Tab Element" }) => {
  const [activeTab, setActiveTab] = useState();

  const handleActive = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title_container}>
        <h1>{title}</h1>
      </div>
      <div className={styles.tabs_container}>
        {children.map((element, i) => {
          const { label,  } = element.props;

          return (
            <TabItem key={i} handleOnClick={handleActive} label={label}>
              {label}
            </TabItem>
          );
        })}
      </div>
      <div className={styles.tabs_content}>
        {children.map((element) => {
          const { label, children } = element.props;
          return activeTab === label ? children : null;
        })}
      </div>
    </div>
  );
};

export default Tabs;
