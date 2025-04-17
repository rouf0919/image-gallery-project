import Image from 'next/image';
import { ProductImage } from '@/types/product';

export default function ThumbnailGrid({
  images,
  selectedImage,
  onSelectImage,
}: {
  images: ProductImage[];
  selectedImage: ProductImage;
  onSelectImage: (image: ProductImage) => void;
}) {
  return (
    <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => onSelectImage(image)}
            className={`relative rounded-md overflow-hidden bg-gray-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              selectedImage.id === image.id ? 'ring-2 ring-indigo-500' : ''
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={200}
              className="w-full h-full object-center object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}