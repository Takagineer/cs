import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Link from "next/link";

function BusinessInformation(props) {
  const {} = props;
  return (
    <>
      {businessInfo === undefined ? (
        ""
      ) : (
        <>
          <CArd sx={{ maxWidth: 345 }} key={business.businessId}>
            <Link
              href={{
                pathname: "individual-pages/business/[business]",
                query: { business: business.businessId },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="300"
                  image={business.imageURL}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {business.companyName}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {business.business}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {business.message}
                  </Typography>
                  <br />
                  <Typography variant="body2" color="text.secondary">
                    {business.location}
                  </Typography>
                  <br />
                  <Typography variant="body2" color="text.secondary">
                    {`${business.reward}/月`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>

            {business.skill.map((skill) => {
              return <A key={skill.label}>{skill.label}</A>;
            })}
            <br />
            <CardActions>
              <br />
              <IconButton
                aria-label="settings"
                onClick={() => {
                  handleClickFavo(business);
                }}
              >
                {business.isIn === false ? (
                  <>
                    <FavoriteTwoToneIcon />
                    {business.likedNumbers}
                  </>
                ) : (
                  <>
                    <FavoriteTwoToneIcon color="secondary" />
                    {business.likedNumbers}
                  </>
                )}
              </IconButton>
            </CardActions>
          </CArd>
        </>
      )}
    </>
  );
}

export default BusinessInformation;

const CArd = styled(Card)`
  padding: 30px 30px 30px 30px;
`;
