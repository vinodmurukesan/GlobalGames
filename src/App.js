import { useEffect, useState } from "react";
import AutomationData from "./components/data/automation.json";
import FilterAutomation from "./components/filterAutomation/filterAutomation";
import Card from './components/ui/card/card';
import styles from "./App.module.css";

function App() {

  const [automationData, setAutomationData] = useState([]);
  const [filterAutomationData, setFilterAutomationData] = useState([]);
  
  const initData = () => {
    setAutomationData(AutomationData.data.oneClickAutomations.items);
    setFilterAutomationData(AutomationData.data.oneClickAutomations.items);
  };

  useEffect(initData, []);

  return (
    <>
      {automationData.length && (
        <main>
          <div className={styles.filters}>
            <FilterAutomation
                data={automationData}
                handleFilterData={setFilterAutomationData}
              />
          </div>
          <section className={styles.container}>
            {filterAutomationData.length && filterAutomationData.map((item) => <Card data={item} key={item.id} /> )}
          </section>
        </main>
        )}
    </>
  );
}

export default App;
