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
          <CardMedia style={{ height: "300px" }} image={image} />
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
          {/* <Stack spacing={1}>
            <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
            <Rating
              name="half-rating-read"
              defaultValue={2.5}
              precision={0.5}
              readOnly
            />
          </Stack> */}
        </IconButton>
        {/* <CardActions>
          <Button size="small">詳細ページへ</Button>
        </CardActions> */}
      </Card>
    </>
  );
}
