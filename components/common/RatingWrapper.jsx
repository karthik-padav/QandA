import React, { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { handleReview } from "dataService/Services";
import _get from "lodash/get";
import { isLoggedIn } from "Function/Common";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  reviewSubTitle: {
    fontSize: 10,
    lineHeight: 1,
    textAlign: "right",
  },
}));

function RatingWrapper(props) {
  const { postId, review, toggleLoginModal } = props;
  const classes = useStyles();
  const myReview = _get(review, "myReview", 0);
  const [value, setValue] = useState(myReview);
  const avgReview = _get(review, "avgReview");
  const totalReview = _get(review, "totalReview", 0);
  const handleRate = (newValue) => {
    setValue(newValue);
    handleReview({ postId, points: newValue })
      .then((resp) => {
        if (_get(resp, "status")) {
        } else {
          updateToastMsg({
            msg: "Something went wrong.",
            type: "error",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const isLogged = isLoggedIn();
  return (
    <Box>
      <Rating
        name={`${postId}-simple-controlled`}
        precision={0.5}
        readOnly={isLogged ? false : true}
        value={isLogged ? value || myReview : avgReview}
        onChange={(event, newValue) => {
          if (isLogged) {
            handleRate(newValue);
          } else toggleLoginModal(true);
        }}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
      />
      <Typography
        variant="caption"
        className={classes.reviewSubTitle}
        component="p"
      >
        {avgReview && <>{avgReview} out of 5 |</>} {totalReview}{" "}
        {totalReview === 0 ? "Review" : "Reviews"}
      </Typography>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleLoginModal: (flag) => {
      dispatch({
        type: "SHOW_LOGIN_MODAL",
        payload: flag,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(RatingWrapper);
