import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import FavoriteTwoToneIcon from "@material-ui/icons/FavoriteTwoTone";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/Link";

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
  const { id, companyName, image, business, location } = props;

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
      <CArd sx={{ maxWidth: 345 }}>
        <Link
          href={{
            pathname: "individual-pages/business/[business]",
            query: { business: id },
          }}
        >
          <CardActionArea>
            <CardMedia component="img" height="300" image={image} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {companyName}
              </Typography>
              <Typography gutterBottom variant="h6" component="div">
                {business}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
              <br />
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <br />
          <IconButton
            aria-label="settings"
            onClick={() => {
              handleClickFavo(business);
            }}
          >
            {business.favo === false ? (
              <FavoriteTwoToneIcon />
            ) : (
              <FavoriteTwoToneIcon color="secondary" />
            )}
          </IconButton>
        </CardActions>
      </CArd>
      <br />
    </>
  );
}

const CArd = styled(Card)`
  padding: 30px 30px 30px 30px;
  height: 480px;
`;
