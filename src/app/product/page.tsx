'use client';
import productFront from "@/assets/images/product-front.png";
import productSide from "@/assets/images/product-side.png";
import productDetail from "@/assets/images/product-detail.png";
import productBack from "@/assets/images/product-back.png";
import { useState, useCallback, useEffect } from 'react';
import Image, { StaticImageData } from 'next/image';

// TypeScript interfaces
interface ColorOption {
  name: string;
  class: string;
  selectedClass: string;
}

interface SizeOption {
  name: string;
  inStock: boolean;
}

interface ProductImage {
  id: number;
  name: string;
  src: StaticImageData;
  alt: string;
}

interface Product {
  name: string;
  price: number;
  description: string;
  rating: number;
  reviewCount: number;
  colors: ColorOption[];
  sizes: SizeOption[];
  details: string[];
  images: ProductImage[];
}

type ExpandableSection = 'description' | 'shipping' | 'reviews' | null;

const Home = () => {
  // Product data
  const product: Product = {
    name: 'Premium Comfort Sneakers',
    price: 129.99,
    description: 'Experience ultimate comfort with our premium sneakers featuring advanced cushioning technology and breathable materials for all-day wear.',
    rating: 4.8,
    reviewCount: 124,
    colors: [
      { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      { name: 'White', class: 'bg-white border border-gray-300', selectedClass: 'ring-gray-400' },
      { name: 'Blue', class: 'bg-blue-500', selectedClass: 'ring-blue-500' },
    ],
    sizes: [
      { name: 'US 7', inStock: true },
      { name: 'US 8', inStock: true },
      { name: 'US 9', inStock: true },
      { name: 'US 10', inStock: false },
      { name: 'US 11', inStock: true },
    ],
    details: [
      'Advanced cushioning technology',
      'Breathable mesh upper',
      'Rubber outsole for durability',
      'Lightweight design',
      'Orthotic-friendly removable insole',
    ],
    images: [
      {
        id: 1,
        name: 'Front view',
        src: productFront,
        alt: 'Front view of sneakers',
      },
      {
        id: 2,
        name: 'Side view',
        src: productSide,
        alt: 'Side view of sneakers',
      },
      {
        id: 3,
        name: 'Detail view',
        src: productDetail,
        alt: 'Detail of sneaker sole',
      },
      {
        id: 4,
        name: 'Back view',
        src: productBack,
        alt: 'Back view of sneakers',
      },
    ],
  };

  // State management
  const [selectedColor, setSelectedColor] = useState<ColorOption>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<SizeOption>(product.sizes[1]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<ProductImage>(product.images[0]);
  const [zoomPosition, setZoomPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [expandedSection, setExpandedSection] = useState<ExpandableSection>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [cartSuccess, setCartSuccess] = useState<boolean>(false);

  // Handlers
  const handleImageHover = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    
    const target = e.currentTarget;
    const { left, top, width, height } = target.getBoundingClientRect();
    
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  }, [isZoomed]);

  const toggleSection = useCallback((section: ExpandableSection) => {
    setExpandedSection(prev => prev === section ? null : section);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  }, []);

  const addToCart = useCallback(() => {
    if (!selectedSize.inStock) return;
    
    setIsAddingToCart(true);
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 3000);
    }, 1000);
  }, [selectedSize]);

  // Reset cart success message when changing variants
  useEffect(() => {
    setCartSuccess(false);
  }, [selectedColor, selectedSize, quantity]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Product overview */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image gallery */}
          <div className="flex flex-col-reverse">
            {/* Thumbnail selector */}
            <div className="mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {product.images.map((image) => (
                  <div
                    key={image.id}
                    onClick={() => {
                      setSelectedImage(image);
                      setIsZoomed(false);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, () => {
                      setSelectedImage(image);
                      setIsZoomed(false);
                    })}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${image.name}`}
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

            {/* Main image with zoom */}
            <div className="w-full aspect-w-1 aspect-h-1 relative overflow-hidden">
              <div
                className={`relative rounded-lg overflow-hidden ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setIsZoomed(!isZoomed)}
                onKeyDown={(e) => handleKeyDown(e, () => setIsZoomed(!isZoomed))}
                onMouseMove={handleImageHover}
                onMouseLeave={() => setIsZoomed(false)}
                role="button"
                tabIndex={0}
                aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={800}
                  height={800}
                  className="w-full h-full object-center object-cover"
                  priority
                />
                {isZoomed && (
                  <div
                    className="absolute inset-0 bg-no-repeat pointer-events-none"
                    style={{
                      backgroundImage: `url(${selectedImage.src.src})`,
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
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {product.name}
              </h1>
              {cartSuccess && (
                <div className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full flex items-center">
                  <svg className="h-4 w-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Added to cart
                </div>
              )}
            </div>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <div className="flex items-center">
                <div className="flex items-center" aria-label={`Rated ${product.rating} out of 5 stars`}>
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <svg
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        rating < product.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <button 
                  onClick={() => toggleSection('reviews')}
                  onKeyDown={(e) => handleKeyDown(e, () => toggleSection('reviews'))}
                  className="ml-2 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  aria-expanded={expandedSection === 'reviews'}
                >
                  {product.reviewCount} reviews
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{product.description}</p>
              </div>
            </div>

            {/* Color selector */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-600">Color</h3>
              <fieldset className="mt-2">
                <legend className="sr-only">Choose a color</legend>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <label
                      key={color.name}
                      className={`relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-2 ${
                        selectedColor.name === color.name
                          ? color.selectedClass
                          : 'ring-transparent'
                      }`}
                    >
                      <input
                        type="radio"
                        name="color-choice"
                        value={color.name}
                        checked={selectedColor.name === color.name}
                        onChange={() => setSelectedColor(color)}
                        className="sr-only"
                        aria-labelledby={`color-${color.name}-label`}
                      />
                      <span
                        id={`color-${color.name}-label`}
                        aria-hidden="true"
                        className={`h-8 w-8 rounded-full border border-black border-opacity-10 ${color.class}`}
                      />
                      <span className="sr-only">{color.name}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Size selector */}
            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm text-gray-600">Size</h3>
                <a
                  href="#"
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Size guide
                </a>
              </div>
              <fieldset className="mt-2">
                <legend className="sr-only">Choose a size</legend>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {product.sizes.map((size) => (
                    <label
                      key={size.name}
                      className={`relative flex items-center justify-center rounded-md ring py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none ${
                        size.inStock
                          ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                          : 'cursor-not-allowed bg-gray-50 text-gray-200'
                      } ${
                        selectedSize.name === size.name
                          ? 'ring-2 ring-indigo-500'
                          : ''
                      }`}
                    >
                      <input
                        type="radio"
                        name="size-choice"
                        value={size.name}
                        checked={selectedSize.name === size.name}
                        onChange={() => setSelectedSize(size)}
                        disabled={!size.inStock}
                        className="sr-only"
                        aria-labelledby={`size-${size.name}-label`}
                      />
                      <span id={`size-${size.name}-label`}>
                        {size.name}
                        {!size.inStock && (
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 rounded-md border-2 border-gray-200 pointer-events-none"
                          >
                            <svg
                              className="absolute inset-0 h-full w-full text-gray-200"
                              viewBox="0 0 100 100"
                              preserveAspectRatio="none"
                              stroke="currentColor"
                            >
                              <line
                                x1="0"
                                y1="100"
                                x2="100"
                                y2="0"
                                vectorEffect="non-scaling-stroke"
                              />
                            </svg>
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Quantity selector */}
            <div className="mt-6">
              <h3 className="text-sm text-gray-600">Quantity</h3>
              <div className="mt-2 flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  onKeyDown={(e) => handleKeyDown(e, () => setQuantity(Math.max(1, quantity - 1)))}
                  className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 12H4"
                    />
                  </svg>
                </button>
                <span className="mx-2 text-gray-700 w-8 text-center" aria-live="polite">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  onKeyDown={(e) => handleKeyDown(e, () => setQuantity(quantity + 1))}
                  className="p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                  disabled={quantity >= 10}
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-6">
              <button
                onClick={addToCart}
                className={`w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 ${
                  !selectedSize.inStock || isAddingToCart ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!selectedSize.inStock || isAddingToCart}
                aria-disabled={!selectedSize.inStock || isAddingToCart}
              >
                {isAddingToCart ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding...
                  </>
                ) : selectedSize.inStock ? 'Add to cart' : 'Out of stock'}
              </button>
            </div>

            {/* Product details */}
            <div className="mt-8 border-t border-gray-200 pt-8">
              <h2 className="text-sm font-medium text-gray-900">Highlights</h2>
              <div className="mt-4 space-y-6">
                <ul className="list-disc pl-4 text-sm text-gray-600 space-y-2">
                  {product.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Expandable sections */}
            <div className="mt-8 divide-y divide-gray-200">
              <div className="py-4">
                <button
                  onClick={() => toggleSection('description')}
                  onKeyDown={(e) => handleKeyDown(e, () => toggleSection('description'))}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                  aria-expanded={expandedSection === 'description'}
                  aria-controls="description-content"
                >
                  <h3 className="text-sm font-medium text-gray-900">
                    Description
                  </h3>
                  <svg
                    className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                      expandedSection === 'description' ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {expandedSection === 'description' && (
                  <div
                    id="description-content"
                    className="mt-2 text-sm text-gray-600 transition-all duration-200"
                  >
                    <p className="mb-4">
                      Our premium comfort sneakers are designed with your feet in
                      mind. The advanced cushioning system absorbs impact while the
                      breathable mesh upper keeps your feet cool and comfortable
                      all day long. The durable rubber outsole provides excellent
                      traction on any surface.
                    </p>
                    <p>
                      The ergonomic design supports natural foot movement, reducing
                      fatigue during extended wear. Perfect for both casual outings
                      and active lifestyles.
                    </p>
                  </div>
                )}
              </div>

              <div className="py-4">
                <button
                  onClick={() => toggleSection('shipping')}
                  onKeyDown={(e) => handleKeyDown(e, () => toggleSection('shipping'))}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                  aria-expanded={expandedSection === 'shipping'}
                  aria-controls="shipping-content"
                >
                  <h3 className="text-sm font-medium text-gray-900">
                    Shipping & Returns
                  </h3>
                  <svg
                    className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                      expandedSection === 'shipping' ? 'rotate-180' : ''
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {expandedSection === 'shipping' && (
                  <div
                    id="shipping-content"
                    className="mt-2 text-sm text-gray-600 transition-all duration-200"
                  >
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium">Shipping Options</h4>
                        <ul className="mt-2 space-y-2">
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Free standard shipping: 3-5 business days</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Express shipping: 2-3 business days ($9.99)</span>
                          </li>
                          <li className="flex items-start">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Overnight shipping: 1 business day ($19.99)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Returns Policy</h4>
                        <p className="mt-2">
                          Easy 30-day returns for unused items in original condition with tags attached.
                          Return shipping is free for domestic orders.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {expandedSection === 'reviews' && (
                <div className="py-4">
                  <div id="reviews-content" className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                    <div className="mt-4 space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b border-gray-200 pb-6">
                          <div className="flex items-center">
                            <div className="flex items-center">
                              {[0, 1, 2, 3, 4].map((rating) => (
                                <svg
                                  key={rating}
                                  className={`h-5 w-5 flex-shrink-0 ${
                                    rating < 5 ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                            <span className="ml-3 text-sm text-gray-700">5 stars</span>
                          </div>
                          <h4 className="mt-2 text-sm font-medium text-gray-900">Most comfortable shoes ever!</h4>
                          <p className="mt-2 text-sm text-gray-600">
                            I've worn these shoes every day for a month and they're still as comfortable as the first day.
                            The cushioning is amazing and they look great with everything.
                          </p>
                          <p className="mt-2 text-sm text-gray-500">Posted by Sarah J. on August 12, 2023</p>
                        </div>
                      ))}
                      <button className="mt-4 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                        See all {product.reviewCount} reviews
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
