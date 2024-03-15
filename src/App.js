import { useEffect, useState } from "react";
import AutomationData from "./components/data/automation.json";
import FilterAutomation from "./components/filterAutomation/filterAutomation";
import Card from "./components/ui/card/card";
import styles from "./App.module.css";

function App() {
  const [automationData, setAutomationData] = useState([]);
  const [filterAutomationData, setFilterAutomationData] = useState([]);

  useEffect(() => {
    const initData = () => {
      const data = AutomationData.data.oneClickAutomations.items;
      setAutomationData(data);
      setFilterAutomationData(data);
    };

    initData();
  }, []); // Empty dependency array since this effect runs only once

  return (
    <>
      {automationData.length && (
        <main role="main">
          <a className={styles.skipLink} href="#main-content">
            Skip to main content
          </a>
          <a className={styles.skipLink} href="#main-navigation">
            Skip to main navigation
          </a>

          <h1 className={styles.visuallyHidden}>Games Global Automation</h1>
          <div
            id="main-navigation"
            className={styles.filters}
            role="region"
            aria-label="Filters"
          >
            <FilterAutomation
              data={automationData}
              handleFilterData={setFilterAutomationData}
            />
          </div>
          <section
            id="main-content"
            className={styles.container}
            aria-label="Automation Content"
          >
            {filterAutomationData.length &&
              filterAutomationData.map((item) => (
                <Card data={item} key={item.id} />
              ))}
          </section>
        </main>
      )}
    </>
  );
}

export default App;
