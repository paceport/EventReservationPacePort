import { useState } from "react";
import Banner from "./dashboardComponents/Banner";
import TabView from "./dashboardComponents/TabView";
import EntryPassView from "./dashboardComponents/EntryPass";
import "bootstrap/dist/css/bootstrap.min.css";

function MyDashboard() {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ zIndex: -1 }}>
        <Banner />
        <div>
          <TabView />
        </div>
        <EntryPassView />
      </div>
    </div>
  );
}

export default MyDashboard;


