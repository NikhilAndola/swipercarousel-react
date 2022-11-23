import React from 'react';
import { SwiperItemProp } from '../interface/types';
import './SwiperItem.css';

const SwiperItem: React.FC<SwiperItemProp> = ({ imageSrc, imageAlt }) => {
  return (
    <li className='swiper-item'>
        <img src={imageSrc} alt={imageAlt} className='swiper-img' draggable={false} />
    </li>
  )
}

export default SwiperItem;