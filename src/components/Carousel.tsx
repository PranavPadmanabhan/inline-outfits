/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Carouselcomponent({ images }: { images: any[] }) {
  return (
    <div>
      <Carousel 
        showArrows={false}
        showIndicators={false}
        showStatus={false}
        dynamicHeight={false}
        width="320px"
        thumbWidth={60}
        renderThumbs={(children)=>{
          return children.map((item,i)=>{
            return (
              <div key={i} className="h-[55px] w-[55px] flex items-center justify-center"> {item} </div>
              )
          }
          )
        }}
      
      >
        {images.map((item, i) => (
          <div key={i}>
            <img className="rounded-xl pointer-events-none" src={item} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carouselcomponent;
