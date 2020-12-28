import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import SearchIcon from '@material-ui/icons/Search';
import SettingsInputComponentIcon from '@material-ui/icons/SettingsInputComponent';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: 1000,
  },
});


export default function SimpleBottomNavigation() {
    let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation style={{
        position: 'absolute', left: '50%', top: '5%', transform: 'translate(-50%, -50%)'}} 
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction onClick={() => history.push('/') } label="HOME-PAGE" icon={<HomeIcon color="action" />} />
      <BottomNavigationAction onClick={() => history.push('/Connections')}label="Statistics" icon={<EqualizerIcon />} />
      <BottomNavigationAction onClick={() => history.push('/search')} label="Search page" icon={<SearchIcon />} />
      <BottomNavigationAction onClick={() => history.push('/Statistics')} label="Connection between two people" icon={<SettingsInputComponentIcon />} />
    </BottomNavigation>
  );
}

// <BottomNavigationAction onClick={() => history.push('/') } label="HOME-PAGE" icon={<HomeIcon color="action" />} />
//       <BottomNavigationAction onClick={() => history.push('/Connections')}label="Connection between two people" icon={<SettingsInputComponentIcon />} />
//       <BottomNavigationAction onClick={() => history.push('/search')} label="Search page" icon={<SearchIcon />} />
//       <BottomNavigationAction onClick={() => history.push('/Statistics')} label="Statistics" icon={<EqualizerIcon />} />