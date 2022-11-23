import React, { useRef, useState } from "react";
import { SwiperProp } from "../interface/types";
import { getTouchEventData } from "../lib/dom";
import { getRefValue, useStateRef } from "../lib/hooks";
import "./Swiper.css";
import SwiperItem from "./SwiperItem";

const Swiper: React.FC<SwiperProp> = ({ items }) => {

    const containerRef = useRef<HTMLUListElement>(null);
    const containerWidthRef = useRef(0);
    const minOffsetXRef = useRef(0)
    const currentOffsetXRef = useRef(0);
    const startXRef = useRef(0);

    const [isSwiping, setIsSwiping] = useState(false);
    const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef)

    if(newOffsetX > maxOffsetX) {
        newOffsetX = 0;
    }

    if(newOffsetX < minOffsetX) {
        newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  }

  const onTouchEnd = () => {
    const containerWidth = getRefValue(containerWidthRef);
    let newOffsetX = getRefValue(offsetXRef);
    newOffsetX = Math.round(offsetX / containerWidth) * containerWidth;
    
    setIsSwiping(false);
    setOffsetX(newOffsetX);

    window.removeEventListener('touchmove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('mouseup', onTouchEnd);
  }

//   Math.round(offsetX / containerWidth) * containerWidth;

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement> ) => {

    setIsSwiping(true);

    currentOffsetXRef.current = getRefValue(offsetXRef);
    startXRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    containerWidthRef.current = containerWidth;
    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);
}

  return (
    <div className="swiper-container" onTouchStart={onTouchStart} onMouseDown={onTouchStart}>
      <ul
        ref={containerRef}
        className={`swiper-list ${isSwiping ? 'swiping' : ''}`}
        style={{ transform: `translate3d(${offsetX}px, 0, 0)` }}
      >
        {items?.map((item, i) => (
          <SwiperItem {...item} key={i} />
        ))}
      </ul>
    </div>
  );
};

export default Swiper;
