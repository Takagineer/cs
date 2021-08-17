import { Grid } from "@material-ui/core";
import React from "react";
import BusinessCard from "./BusinessCard";
import { Swiper, SwiperSlide, Autoplay } from "swiper/react";
import "swiper/swiper-bundle.min.css";

export default function Content() {
  const cardContents = [
    {
      companyName: "東京エネルギー株式会社",
      image: "https://picsum.photos/150",
      text: "業務詳細を記入してください。",
    },
    {
      companyName: "メディア株式会社",
      image: "https://picsum.photos/150",
      text: "業務詳細を記入してください。",
    },
    {
      companyName: "稲作株式会社",
      image: "https://picsum.photos/150",
      text: "業務詳細を記入してください。",
    },
  ];
  return (
    <>
      <Grid container spacing={2}>
        <Swiper slidesPerView={1}>
          <SwiperSlide>
            <Grid item xs={10}>
              <BusinessCard
                companyName={cardContents[0].companyName}
                image={"https://picsum.photos/150"}
                text={"詳細説明"}
              />
            </Grid>
          </SwiperSlide>
          <SwiperSlide>
            <Grid item xs={10}>
              <BusinessCard
                companyName={cardContents[1].companyName}
                image={"https://picsum.photos/200"}
                text={"詳細説明"}
              />
            </Grid>
          </SwiperSlide>
          <SwiperSlide>
            <Grid item xs={10}>
              <BusinessCard
                companyName={cardContents[2].companyName}
                image={"https://picsum.photos/300"}
                text={"詳細説明"}
              />
            </Grid>
          </SwiperSlide>
        </Swiper>
      </Grid>

      <br />
      <br />
      <br />
    </>
  );
}
