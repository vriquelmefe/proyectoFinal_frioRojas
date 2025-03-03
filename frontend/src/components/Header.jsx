import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import carusel1 from '../../public/climatizacion.jpg'
import carusel2 from '/r-10.jpeg'
import carusel3 from '/repuesto-2.jpg'

function Header() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className="bg-dark items-center h-50">
      <Carousel.Item className="justify-content-center align-items-center">
        <Image 
          src={carusel1}
          className="d-block mx-auto w-75 rounded-3" 
          alt="Evaporador de Aire"
        />
        <Carousel.Caption className="text-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
          <h3 className="text-white">Evaporador de Aire</h3>
          <p className="text-white">Ideal para sistemas de refrigeración y climatización.</p>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item className="justify-content-center align-items-center">
        <Image 
          src={carusel2}
          className="d-block mx-auto w-75 rounded-3" 
          alt="Termostato Digital"
        />
        <Carousel.Caption className="text-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
          <h3 className="text-white">Termostato Digital</h3>
          <p className="text-white">Control preciso de la temperatura para eficiencia energética.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className="justify-content-center align-items-center">
        <Image 
          src={carusel3}
          className="d-block mx-auto w-75 rounded-3" 
          alt="Ventilador de Enfriamiento"
        />
        <Carousel.Caption className="text-dark" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '5px' }}>
          <h3 className="text-white">Ventilador de Enfriamiento</h3>
          <p className="text-white">Solución efectiva para mejorar la circulación de aire.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Header;
