import React from 'react';
import './App.css';
import { Swiper } from './components';

function App() {

  const items = [
    {
      imageSrc: '/personEye.jpeg',
      imageAlt: "A person's eye",
    },
    {
      imageSrc: '/rock.jpeg',
      imageAlt: "A rock piece",
    },
    {
      imageSrc: '/flower2.jpeg',
      imageAlt: "A flower",
    },
    {
      imageSrc: '/egyptianPainting.avif',
      imageAlt: "An egyptian wall painting",
    },
    {
      imageSrc: '/butterfly2.jpeg',
      imageAlt: "A butterfly on leaf",
    }
  ];
  return (
    <div className="container">
     <Swiper items={items} />
    </div>
  );
}

export default App;
