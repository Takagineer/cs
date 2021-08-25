import { Tab } from "@material-ui/core";
import { Paper, Tabs } from "@material-ui/core";
import React, { useState } from "react";

export default function Filetr() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="新着順" />
        <Tab label="いいね" />
        <Tab label="星評価" />
        <Tab label="応募者" />
      </Tabs>
    </Paper>
  );
}
