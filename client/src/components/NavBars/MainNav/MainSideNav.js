import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Logo from '../../logo/Logo'

import {
  Jobs,
  SignUpUrlEmployer,
  SignUpUrlJobSeeker,
  LoginUrl,
  Profile,
  MyJobs,
  Help,
} from "./../../../Utils/Paths/UrlPaths";

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  btnPremium: {
    backgroundColor: "#ffd54f",
    color: "blue",
    borderRadius: "15px",
    marginLeft: "10px",
    width: "90%",
    "&:hover": {
      backgroundColor: "#ffd54f",
    },
  },

};

class MainSideNav extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes, role, handleModalOpen } = this.props;

    const sideList = (
      <div className={classes.list}>
        <ListItem button component="span" variant="title">
         <Logo />
        </ListItem>
        <Divider />

        {role && role === "employer" ? (
          <>
            <List>
              <Button
                className={classes.btnPremium}
                onClick={handleModalOpen}
                variant="contained"
                color="primary"
              >
                Descopera Premium
              </Button>
              <ListItem button component="a" href={Profile}>
                <ListItemText primary="Profil" />
              </ListItem>
              <ListItem button component="a" href={MyJobs}>
                <ListItemText primary="Locuri de muncă" />
              </ListItem>
              <ListItem button component={Link} to="/search-candidate">
                <ListItemText primary="Cautarea lucratori" />
              </ListItem>
              <ListItem button component={Link} to="/chat">
                <ListItemText primary="Chat" />
              </ListItem>
              <Divider />
              <Divider />
              <ListItem button component="a" href={Help}>
                <ListItemText primary="Ajutor!" />
              </ListItem>
            </List>
          </>
        ) : role && role === "jobseeker" ? (
          <>
            <List>
              <ListItem button component="a" href={Profile}>
                <ListItemText primary="Profil" />
              </ListItem>
              <ListItem button component="a" href={Jobs}>
                <ListItemText primary="Exploreaza Joburi" />
              </ListItem>
              <Divider />
              <ListItem button component="a" href={Help}>
                <ListItemText primary="Ajutor!" />
              </ListItem>
            </List>
          </>
        ) : (
          <>
            <List>
              <ListItem button component="a" href={SignUpUrlEmployer}>
                <ListItemText primary="Angajeaza" />
              </ListItem>
              <ListItem button component="a" href={SignUpUrlJobSeeker}>
                <ListItemText primary="Inregistrare" />
              </ListItem>
              <ListItem button component="a" href={LoginUrl}>
                <ListItemText primary="Logare" />
              </ListItem>
            </List>
          </>
        )}
      </div>
    );

    return (
      <div>
        <IconButton
          onClick={this.toggleDrawer("left", true)}
          className={classes.menuButton}
          color="inherit"
          aria-label="Open drawer"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

MainSideNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MainSideNav);
