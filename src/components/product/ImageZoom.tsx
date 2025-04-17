import { useState, useCallback } from 'react';
import Image from 'next/image';
import { ProductImage } from '@/types/product';

export default function ImageZoom({
  image,
  isZoomed,
  onToggleZoom,
}: {
  image: ProductImage;
  isZoomed: boolean;
  onToggleZoom: () => void;
}) {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const handleImageHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isZoomed) return;
      
      const target = e.currentTarget;
      const { left, top, width, height } = target.getBoundingClientRect();
      
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      
      setZoomPosition({ 
        x: Math.max(0, Math.min(100, x)), 
        y: Math.max(0, Math.min(100, y)) 
      });
    },
    [isZoomed]
  );

  return (
    <div className="w-full aspect-w-1 aspect-h-1 relative overflow-hidden">
      <div
        className={`relative rounded-lg overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
        onClick={onToggleZoom}
        onMouseMove={handleImageHover}
        onMouseLeave={() => isZoomed && onToggleZoom()}
        role="button"
        tabIndex={0}
        aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={800}
          height={800}
          className="w-full h-full object-center object-cover"
          priority
        />
        {isZoomed && (
          <div
            className="absolute inset-0 bg-no-repeat pointer-events-none"
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
              backgroundSize: '200%',
              transform: 'scale(1.5)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              transition: 'transform 0.1s ease',
            }}
          />
        )}
      </div>
    </div>
  );
}