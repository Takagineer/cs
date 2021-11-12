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

  const getBusinessInfo = async () => {
    const _businessInfo = [];
    const businessInfo = await db.collection("Businesses").limit(3).get();
    businessInfo.forEach((doc) => {
      _businessInfo.push({
        businessId: doc.id,
        ...doc.data(),
      });
    });
    setBusinessInfo(_businessInfo);
  };

  useEffect(() => {
    getBusinessInfo();
  }, []);

  return (
    <>
      {businessInfo[0] === undefined &&
      businessInfo[1] === undefined &&
      businessInfo[2] === undefined ? (
        "お待ちください"
      ) : (
        <Swiper
          style={{
            "--swiper-navigation-color": "#808080",
            "--swiper-navigation-background-color": "#black",
            "--swiper-pagination-color": "#808080",
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
        >
          <Grid container spacing={2}>
            <SwiperSlide>
              <Grid item xs={12}>
                <BusinessCard
                  id={businessInfo[0].businessId}
                  image={businessInfo[0].imageURL}
                  companyName={businessInfo[0].companyName}
                  business={businessInfo[0].business}
                  message={businessInfo[0].message}
                  location={businessInfo[0].location}
                  reward={businessInfo[0].reward}
                  skills={businessInfo[0].skill}
                />
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item xs={12}>
                <BusinessCard
                  id={businessInfo[1].businessId}
                  image={businessInfo[1].imageURL}
                  companyName={businessInfo[1].companyName}
                  business={businessInfo[1].business}
                  message={businessInfo[1].message}
                  location={businessInfo[1].location}
                  reward={businessInfo[1].reward}
                  skills={businessInfo[1].skill}
                />
              </Grid>
            </SwiperSlide>
            <SwiperSlide>
              <Grid item xs={12}>
                <BusinessCard
                  id={businessInfo[2].businessId}
                  image={businessInfo[2].imageURL}
                  companyName={businessInfo[2].companyName}
                  business={businessInfo[2].business}
                  message={businessInfo[2].message}
                  location={businessInfo[2].location}
                  reward={businessInfo[2].reward}
                  skills={businessInfo[2].skill}
                />
              </Grid>
            </SwiperSlide>
          </Grid>
          <br />
        </Swiper>
      )}
      <br />
    </>
  );
}
