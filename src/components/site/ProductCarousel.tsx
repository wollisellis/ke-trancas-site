'use client';

import { useState } from 'react';

type Props = {
  images: string[];
  name: string;
  discount: number | null;
};

export function ProductCarousel({ images, name, discount }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((i) => (i - 1 + images.length) % images.length);
  const next = () => setCurrent((i) => (i + 1) % images.length);

  if (images.length === 1) {
    return (
      <div className="product-page-media">
        <img src={images[0]} alt={name} className="product-page-image" />
        {discount ? <span className="product-page-discount">-{discount}% OFF</span> : null}
      </div>
    );
  }

  return (
    <div className="product-page-media">
      <div className="carousel-wrap">
        <img src={images[current]} alt={`${name} — foto ${current + 1}`} className="product-page-image carousel-img" />
        {discount ? <span className="product-page-discount">-{discount}% OFF</span> : null}

        <button className="carousel-btn carousel-prev" onClick={prev} aria-label="Foto anterior">&#8249;</button>
        <button className="carousel-btn carousel-next" onClick={next} aria-label="Próxima foto">&#8250;</button>

        <div className="carousel-counter">{current + 1} / {images.length}</div>
      </div>

      <div className="carousel-thumbs">
        {images.map((src, i) => (
          <button
            key={i}
            className={`carousel-thumb${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Ver foto ${i + 1}`}
          >
            <img src={src} alt={`${name} miniatura ${i + 1}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
