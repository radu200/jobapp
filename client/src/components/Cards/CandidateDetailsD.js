import React from "react";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Months, Days, Years } from "./../../Utils/messages";
import RoomIcon from "@material-ui/icons/Room";
import Button from "@material-ui/core/Button";
import Loading from "../../Utils/Loading";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import NoUser from "../../images/no_user.png";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import withMembership from "../../HOC/membership/withMembership";
import withMembershipModal from "../../HOC/modal/membershipModal";
import ModalPremium from "../payment/ModalPremium";

const useStyles = makeStyles({
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: "cover",
  },

  heading: {
    opacity: 0.7,
  },
  candidateAbout: {
    wordWrap: "break-word",
  },
  companyName: {
    color: "black",
    fontWeight: "bold",
  },
  responsibilities: {
    wordWrap: "break-word",
  },

  card: {
    marginTop: 10,
    maxHeight: "840px",
    overflowY: "auto",
  },

  avatar: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: "auto",
    marginBottom: 0,
    width: 200,
    height: 157,
    borderRadius: 10,
  },
  lang: {
    fontWeight: "bold",
  },
  availability: {
    color: "#43a047",
  },
  RoomIcon: {
    fontSize: 17,
  },
  btnClose: {
    zIndex: 999,
    position: "absolute",
  },
  reportBtn: {
    marginTop: "10px",
    "&:hover": {
      color: "red",
    },
  },
});

const CandidateDetailsCard = ({
  candidate,
  experience,
  loading,
  open,
  handleClose,
  handleChat,
  member,
  handleModalOpen,
  handleModalClose,
  openModalMembership
}) => {
  const classes = useStyles();
  return (
    <>
      {loading && <Loading />}
      {open && (
        <Card className={classes.card}>
          <Grid container item justify="flex-end">
            <Button
              className={classes.btnClose}
              align="right"
              variant="outlined"
              onClick={() => handleClose()}
            >
              {" "}
              <CloseIcon />
            </Button>
          </Grid>
          {candidate.map(candidate => {
            return (
              <div key={candidate.id}>
                <img
                  alt="Candidate Details"
                  src={candidate.avatar ? candidate.avatar : NoUser}
                  className={classes.avatar}
                />
                <CardContent>
                  {member ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      fullWidth
                      onClick={() => handleChat(candidate.id)}
                    >
                      Deschide Chat ...
                    </Button>
                  ) : (
                    <Button variant="contained" color="primary" fullWidth onClick={handleModalOpen}>
                      Deschide Chat <LockOutlinedIcon />
                    </Button>
                  )}
                  <Button
                    className={classes.reportBtn}
                    href={`/api/report/${candidate.id}`}
                    size="small"
                    color="primary"
                  >
                    Raportea-za
                  </Button>
                  <Typography
                    gutterBottom
                    component="p"
                    className={classes.availability}
                  >
                    {candidate.job_seeker_availability}
                  </Typography>
                  <Typography component="p">
                    {candidate.job_seeker_employment_type}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    {candidate.first_name} {candidate.last_name}
                  </Typography>

                  {candidate.job_seeker_about_me ? (
                    <Typography
                      component="p"
                      className={classes.candidateAbout}
                    >
                      <b>Despre: </b> {candidate.job_seeker_about_me}
                    </Typography>
                  ) : null}
                  {candidate.job_seeker_languages ? (
                    <Typography gutterBottom component="p">
                      <b> Limbi: </b>
                      {candidate.job_seeker_languages}
                    </Typography>
                  ) : null}

                  <Typography component="p">
                    <RoomIcon className={classes.RoomIcon} />{" "}
                    {candidate.job_seeker_location}
                  </Typography>
                </CardContent>
              </div>
            );
          })}

          {experience &&
            experience.map((experience, index) => {
              return (
                <CardActionArea key={index}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {experience.position}
                    </Typography>
                    <Typography component="p">{experience.category}</Typography>
                    <Typography component="p" className={classes.companyName}>
                      {experience.company_name}
                    </Typography>
                    <Typography gutterBottom component="p" color="primary">
                      {experience.start_date}- {experience.end_date} -{" "}
                      {experience.years} {Years} {experience.months} {Months}{" "}
                      {experience.days} {Days}
                    </Typography>
                    <Typography
                      gutterBottom
                      component="p"
                      className={classes.responsibilities}
                    >
                      {experience.responsibilities}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              );
            })}
        </Card>
      )}
       <ModalPremium open={openModalMembership} handleClose={handleModalClose} />
    </>
  );
};

CandidateDetailsCard.propTypes = {
  classes: PropTypes.object,
  candidate: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      avatar: PropTypes.string,
      job_seeker_availability: PropTypes.string,
      job_seeker_employment_type: PropTypes.string,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      job_seeker_about_me: PropTypes.string,
      job_seeker_languages: PropTypes.string,
      job_seeker_location: PropTypes.string.isRequired,
    }),
  ),
};

export default compose(
  withMembership,
  withMembershipModal,
)(CandidateDetailsCard);
