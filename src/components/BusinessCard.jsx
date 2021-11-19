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
import Link from "next/link";

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
  // const [favo, setFavo] = useState(false);
  const { id, companyName, image, business, location, skills, reward } = props;

  // const handleClick = () => {
  //   if (favo === false) {
  //     setFavo(true);
  //     setLikeCount(likeCount + 1);
  //   } else {
  //     setFavo(false);
  //     setLikeCount(likeCount - 1);
  //   }
  // };

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
              <br />
              <Typography variant="body2" color="text.secondary">
                {location}
              </Typography>
              <br />
              <Typography variant="body2" color="text.secondary">
                {`${reward}/月`}
              </Typography>
              <br />
            </CardContent>
          </CardActionArea>
        </Link>
        {skills === undefined
          ? "...Loading"
          : skills.map((skill) => {
              return <A>{skill.label}</A>;
            })}
        {/* <CardActions>
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
        </CardActions> */}
      </CArd>
    </>
  );
}

const CArd = styled(Card)`
  padding: 30px;
  height: 530px;
  margin-top: 60px;
`;

const A = styled.a`
  display: inline-block;
  margin: 3px 9px 8px 0;
  padding: 9px;
  line-height: 1;
  text-decoration: none;
  color: #0000ee;
  background-color: #fff;
  border: 1px solid #0000ee;
  border-radius: 32px;
`;
