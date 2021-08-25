import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import React, { useState } from "react";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function BusinessCard(props) {
  const [likeCount, setLikeCount] = useState(0);
  const [favo, setFavo] = useState(false);
  const { companyName, image, text } = props;

  const handleClick = () => {
    if (favo === false) {
      setFavo(true);
      setLikeCount(likeCount + 1);
    } else {
      setFavo(false);
      setLikeCount(likeCount - 1);
    }
  };
  return (
    <>
      <Card variant="outlined">
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {companyName}
          </Typography>
          <CardMedia style={{ height: "250px" }} image={image} />
          <br />
          <Typography variant="body2" component="p">
            {text}
          </Typography>
          評価（星評価機能）
        </CardContent>
        <IconButton aria-label="settings" onClick={handleClick}>
          {favo === false ? (
            <FavoriteTwoToneIcon />
          ) : (
            <FavoriteTwoToneIcon color="secondary" />
          )}
          {likeCount}
        </IconButton>
      </Card>
    </>
  );
}
