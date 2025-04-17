'use client';
import { useState, useCallback, useEffect } from 'react';
import { Product, ExpandableSection, ColorOption, SizeOption } from '@/types/product';
import ImageGallery from '@/components/product/ImageGallery';
import PriceDisplay from '@/components/product/PriceDisplay';
import RatingStars from '@/components/product/RatingStars';
import ColorSelector from '@/components/product/ColorSelector';
import SizeSelector from '@/components/product/SizeSelector';
import QuantitySelector from '@/components/product/QuantitySelector';
import AddToCartButton from '@/components/ui/AddToCartButton';
import ProductDetails from '@/components/product/ProductDetails';
import ExpandableSection from '@/components/product/ExpandableSection';
import { CheckIcon } from '@/components/ui/icons';
import SuccessMessage from '@/components/ui/SuccessMessage';
import ReviewsSection from '@/components/product/ReviewsSection';

// Mock product data - replace with your actual data source
const productData: Product = {
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
      src: '/images/product-front.png',
      alt: 'Front view of sneakers',
    },
    {
      id: 2,
      name: 'Side view',
      src: '/images/product-side.png',
      alt: 'Side view of sneakers',
    },
    // Add other images
  ],
  reviews: [
    {
      rating: 5,
      title: "Most comfortable shoes ever!",
      content: "I've worn these shoes every day for a month and they're still as comfortable as the first day.",
      author: "Sarah J.",
      date: "August 12, 2023"
    }
  ]
};

export default function ProductPage() {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState<SizeOption>(productData.sizes[1]);
  const [quantity, setQuantity] = useState<number>(1);
  const [expandedSection, setExpandedSection] = useState<ExpandableSection>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [cartSuccess, setCartSuccess] = useState<boolean>(false);

  const toggleSection = useCallback((section: ExpandableSection) => {
    setExpandedSection(prev => prev === section ? null : section);
  }, []);

  const addToCart = useCallback(() => {
    if (!selectedSize.inStock) return;
    
    setIsAddingToCart(true);
    setTimeout(() => {
      setIsAddingToCart(false);
      setCartSuccess(true);
      setTimeout(() => setCartSuccess(false), 3000);
    }, 1000);
  }, [selectedSize]);

  useEffect(() => {
    setCartSuccess(false);
  }, [selectedColor, selectedSize, quantity]);

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          <ImageGallery images={productData.images} />
          
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                {productData.name}
              </h1>
              <SuccessMessage show={cartSuccess} />
            </div>

            <PriceDisplay price={productData.price} />
            
            <RatingStars 
              rating={productData.rating} 
              reviewCount={productData.reviewCount} 
              onReviewsClick={() => toggleSection('reviews')} 
              expanded={expandedSection === 'reviews'}
            />

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <div className="text-base text-gray-700 space-y-6">
                <p>{productData.description}</p>
              </div>
            </div>

            <ColorSelector 
              colors={productData.colors} 
              selectedColor={selectedColor} 
              onSelectColor={setSelectedColor} 
            />

            <SizeSelector 
              sizes={productData.sizes} 
              selectedSize={selectedSize} 
              onSelectSize={setSelectedSize} 
            />

            <QuantitySelector 
              quantity={quantity} 
              onDecrement={() => setQuantity(Math.max(1, quantity - 1))} 
              onIncrement={() => setQuantity(quantity + 1)} 
            />

            <AddToCartButton 
              inStock={selectedSize.inStock} 
              loading={isAddingToCart} 
              onClick={addToCart} 
            />

            <ProductDetails details={productData.details} />

            <div className="mt-8 divide-y divide-gray-200">
              <ExpandableSection 
                title="Description" 
                expanded={expandedSection === 'description'} 
                onToggle={() => toggleSection('description')}
              >
                <p className="mb-4">
                  Our premium comfort sneakers are designed with your feet in
                  mind. The advanced cushioning system absorbs impact while the
                  breathable mesh upper keeps your feet cool and comfortable
                  all day long.
                </p>
                <p>
                  The ergonomic design supports natural foot movement, reducing
                  fatigue during extended wear.
                </p>
              </ExpandableSection>

              <ExpandableSection 
                title="Shipping & Returns" 
                expanded={expandedSection === 'shipping'} 
                onToggle={() => toggleSection('shipping')}
              >
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Shipping Options</h4>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Free standard shipping: 3-5 business days</span>
                      </li>
                      <li className="flex items-start">
                        <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                        <span>Express shipping: 2-3 business days ($9.99)</span>
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
              </ExpandableSection>

              {expandedSection === 'reviews' && (
                <ReviewsSection reviews={productData.reviews} reviewCount={productData.reviewCount} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}