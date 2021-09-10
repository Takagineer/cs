import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import NewBusiness from "./NewBusiness";
import RankingFav from "./RankingFav";
import RankingBusinessPopular from "./RankingPopular";
import RankingBusinessReward from "./RankingReward";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function Filter() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="新着順" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="いいね数" href="/trash" {...a11yProps(1)} />
          <LinkTab label="応募順" href="/spam" {...a11yProps(2)} />
          <LinkTab label="報酬順" href="/spam" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <NewBusiness />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <RankingFav />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <RankingBusinessPopular />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <RankingBusinessReward />
      </TabPanel>
    </div>
  );
}
