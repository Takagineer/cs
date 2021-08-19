import { Grid } from "@material-ui/core";
import React from "react";
import BusinessCard from "./BusinessCard";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/core";

SwiperCore.use([EffectFade, Navigation, Pagination, Autoplay]);

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
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
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
