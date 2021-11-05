import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import BusinessCard from "./BusinessCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/thumbs/thumbs.min.css";
import SwiperCore, { Navigation, Thumbs } from "swiper/core";
import { db } from "../firebase";
import styled from "styled-components";

SwiperCore.use([Navigation, Thumbs]);

export default function Content() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [businessInfo, setBusinessInfo] = useState([]);
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

  const getBusinessInfo = async () => {
    const _businessInfo = [];
    const businessInfo = await db.collection("Businesses").limit(3).get();
    businessInfo.forEach((doc) => {
      _businessInfo.push({
        businessId: doc.id,
        ...doc.data(),
      });
      console.log(_businessInfo);
    });
    setBusinessInfo(_businessInfo);
  };

  useEffect(() => {
    getBusinessInfo();
    console.log({ businessInfoの値: businessInfo });
  }, []);

  return (
    <>
      {
        businessInfo === undefined ? (
          "お待ちください"
        ) : (
          // businessInfo.map((business) => {
          //     return (
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
                    id={businessInfo[0].businessId}
                    image={businessInfo[0].imageURL}
                    companyName={businessInfo[0].companyName}
                    business={businessInfo[0].business}
                    message={businessInfo[0].message}
                    location={businessInfo[0].location}
                    reward={businessInfo[0].reward}
                  />
                </Grid>
              </SwiperSlide>
              <SwiperSlide>
                <Grid item xs={11}>
                  <BusinessCard
                    id={businessInfo[1].businessId}
                    image={businessInfo[1].imageURL}
                    companyName={businessInfo[1].companyName}
                    business={businessInfo[1].business}
                    message={businessInfo[1].message}
                    location={businessInfo[1].location}
                    reward={businessInfo[1].reward}
                  />
                </Grid>
              </SwiperSlide>
              <SwiperSlide>
                <Grid item xs={11}>
                  <BusinessCard
                    id={businessInfo[2].businessId}
                    image={businessInfo[2].imageURL}
                    companyName={businessInfo[2].companyName}
                    business={businessInfo[2].business}
                    message={businessInfo[2].message}
                    location={businessInfo[2].location}
                    reward={businessInfo[2].reward}
                  />
                </Grid>
              </SwiperSlide>
            </Grid>
            <br />
          </Swiper>
        )
        //   );
        // })
      }
      <br />
      <br />
      <br />
    </>
  );
}

const SWiperSlide = styled(SwiperSlide)`
  height: 500px;
`;
