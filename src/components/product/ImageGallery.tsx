import { useState } from 'react';
import ImageZoom from './ImageZoom';
import ThumbnailGrid from './ThumbnailGrid';
import { ProductImage } from '@/types/product';

export default function ImageGallery({ images }: { images: ProductImage[] }) {
  const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="flex flex-col-reverse">
      <ThumbnailGrid 
        images={images} 
        selectedImage={selectedImage} 
        onSelectImage={(image) => {
          setSelectedImage(image);
          setIsZoomed(false);
        }} 
      />
      <ImageZoom 
        image={selectedImage} 
        isZoomed={isZoomed} 
        onToggleZoom={() => setIsZoomed(!isZoomed)} 
      />
    </div>
  );
}