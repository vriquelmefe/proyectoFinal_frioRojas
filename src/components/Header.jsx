import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="justify-center items-center">
      <Carousel.Item className="justify-content-center align-items-center">
        <Image src="/logo.png" className="d-block mx-auto w-50" />
        <Carousel.Caption className="text-dark">
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item className="justify-content-center align-items-center">
        <img src="/logo.png" className="d-block mx-auto w-50 bg-success" />
        <Carousel.Caption className="text-dark">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="justify-content-center align-items-center">
        <img src="/logo.png" className="d-block mx-auto w-50 bg-warning" />
        <Carousel.Caption className="text-dark">
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
