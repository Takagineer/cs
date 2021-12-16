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
import Loading from "../pages/Loading";
import SwiperBusinessInformation from "./SwiperBusinessInformation";

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
      {businessInfo === undefined ? (
        <Loading />
      ) : (
        <SWiper
          style={{
            "--swiper-navigation-color": "#808080",
            "--swiper-navigation-background-color": "#black",
            "--swiper-pagination-color": "#808080",
          }}
          sliderPerView
          loop={true}
          spaceBetween={30}
          slidesPerView={1.3}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          className="mySwiper2"
        >
          {businessInfo.map((business, index) => {
            return (
              <SwiperSlide key={business.businessId}>
                <SwiperBusinessInformation data={businessInfo[index]} />
              </SwiperSlide>
            );
          })}
          <br />
        </SWiper>
      )}
      <br />
    </>
  );
}

const SWiper = styled(Swiper)`
  width: 100%;
  padding-top: 20px;
`;
