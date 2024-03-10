import { useEffect, useState } from "react";
import AutomationData from "./components/data/automation.json";
import FilterAutomation from "./components/filterAutomation/filterAutomation";
import Card from './components/ui/card/card';
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
          <div className={styles.filters} role="region" aria-label="Filters">
            <FilterAutomation
                data={automationData}
                handleFilterData={setFilterAutomationData}
              />
          </div>
          <section className={styles.container} role="region" aria-label="Automation Content">
            {filterAutomationData.length && filterAutomationData.map((item) => <Card data={item} key={item.id} /> )}
          </section>
        </main>
        )}
    </>
  );
}

export default App;
