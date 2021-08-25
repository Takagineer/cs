import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import BusinessCard from "./BusinessCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";

import SwiperCore, { Navigation, Thumbs } from "swiper/core";

SwiperCore.use([Navigation, Thumbs]);

export default function Content() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
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
      <Swiper
        style={{
          "--swiper-navigation-color": "#2ca9e1",
          "--swiper-pagination-color": "#2ca9e1",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        className="mySwiper2"
      >
        <Grid container spacing={2}>
          <SwiperSlide>
            <Grid item xs={11}>
              <BusinessCard
                companyName={cardContents[0].companyName}
                image={"https://picsum.photos/150"}
                text={"詳細説明"}
              />
            </Grid>
          </SwiperSlide>

          <SwiperSlide>
            <Grid item xs={11}>
              <BusinessCard
                companyName={cardContents[1].companyName}
                image={"https://picsum.photos/200"}
                text={"詳細説明"}
              />
            </Grid>
          </SwiperSlide>

          <SwiperSlide>
            <Grid item xs={11}>
              <BusinessCard
                companyName={cardContents[2].companyName}
                image={"https://picsum.photos/300"}
                text={"詳細説明"}
              />
            </Grid>
          </SwiperSlide>
        </Grid>
      </Swiper>

      <br />
      <br />
      <br />
    </>
  );
}
