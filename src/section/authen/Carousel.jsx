/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel } from "antd";
import slide_1 from "@/assets/images/slides/slider_fpt_1.webp";
import slide_2 from "@/assets/images/slides/slider_fpt_2.webp";
import slide_3 from "@/assets/images/slides/slider_fpt_3.webp";

const Slider = () => (
  <Carousel autoplay className="box-border">
    <div>
      <h3>
        <img
          src={slide_1}
          alt=""
          className="h-[600px] w-full object-cover object-left"
        />
      </h3>
    </div>
    <div>
      <h3>
        <img src={slide_2} alt="" className="h-[600px] w-full object-cover" />
      </h3>
    </div>
    <div>
      <h3>
        <img src={slide_3} alt="" className="h-[600px] w-full object-cover" />
      </h3>
    </div>
  </Carousel>
);
export default Slider;
