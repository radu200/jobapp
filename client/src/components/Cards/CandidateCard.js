import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Years } from "./../../Utils/messages";
import RoomIcon from "@material-ui/icons/Room";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Loading from "../../Utils/Loading";
import Button from "@material-ui/core/Button";
import NoUser from '../../images/no_user.png'

const useStyles = makeStyles({
  bigAvatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  root: {
    width: "100%",
  },

  breakWord: {
    wordWrap: "break-word",
    fontWeight: "bold",
  },

  RoomIcon: {
    fontSize: 17,
  },
  cardContainerM: {
    height: "250px",
    overflowY: "auto",
  },
  cardContainerD: {
    height: "550px",
    overflowY: "auto",
  },
});

const CandidateCard = ({
  candidates,
  handleCandidateDetails,
  handleOpen,
  loading,
  getMoreCandidates,
  disable,
  shortList,
  reject
}) => {
  const matches600 = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  return (
    <>
      {loading && <Loading />}
      <div className={matches600 ? classes.cardContainerM : classes.cardContainerD} >
        {candidates &&
          candidates.map(candidate => {
            return (
              <div key={candidate.userID}>
                <List >
                  <Card>
                    <CardActionArea
                      className={classes.root}
                      onClick={handleOpen}
                    >
                      <ListItem
                        onClick={() => handleCandidateDetails(candidate.userID)}
                      >
                        <Avatar
                          className={classes.bigAvatar}
                          alt={candidate.first_name}
                          src={candidate.avatar ? candidate.avatar : NoUser}
                        />
                        <ListItemText
                          primary={
                            <div>
                              <Typography>
                                {candidate.first_name} {candidate.last_name}
                              </Typography>

                              {candidate.total_ex_years && (
                                <Typography
                                  className={classes.textBold}
                                  color="textPrimary"
                                >
                                  {candidate.category} -{" "}
                                  {candidate.total_ex_years} {Years}
                                </Typography>
                              )}
                              <Typography color="textSecondary">
                                {candidate.position}
                              </Typography>
                              <Typography
                                className={classes.breakWord}
                                color="textSecondary"
                              >
                                {candidate.job_seeker_about_me}
                              </Typography>
                              <Typography color="textSecondary">
                                <RoomIcon className={classes.RoomIcon} />{" "}
                                {candidate.job_seeker_location}
                              </Typography>
                              <Typography
                                className={classes.breakWord}
                                color="textSecondary"
                              ></Typography>
                            </div>
                          }
                        />
                      </ListItem>

                    </CardActionArea>
                    {candidate.status && candidate.status === 'active' &&
                    <CardActions>
                      <Button size="small" color="primary"
                        onClick={() => shortList(candidate.userID)}
                      >
                        List Scurta
                      </Button>
                      <Button size="small" color="secondary"
                       onClick={() => reject(candidate.userID)} >
                        Respinge
                      </Button>
                    </CardActions>} 
                  </Card>
                </List>
              </div>
            );
          })}
        {candidates.length > 0 && (
          <Button
            onClick={getMoreCandidates}
            variant="contained"
            color={"primary"}
            type="submit"
            fullWidth
            disabled={disable}
          >
            Mai Mult
          </Button>
        )}
      </div>
    </>
  );
};

CandidateCard.propTypes = {
  classes: PropTypes.object,
  Years: PropTypes.string,
  candidate: PropTypes.arrayOf(
    PropTypes.shape({
      userID: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      category: PropTypes.string,
      total_ex_years: PropTypes.number,
      job_seeker_about_me: PropTypes.string,
      job_seeker_location: PropTypes.string,
    }),
  ),
};
export default CandidateCard;
