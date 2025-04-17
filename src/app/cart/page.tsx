"use client";

import Image from "next/image";
import Link from "next/link";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string;
  size?: string;
};

const mockCart: CartItem[] = [
  {
    id: 1,
    name: "Product One",
    price: 49.99,
    quantity: 1,
    image: "/placeholder.svg?text=Product+1",
    color: "Black",
    size: "M",
  },
  {
    id: 2,
    name: "Product Two",
    price: 39.99,
    quantity: 2,
    image: "/placeholder.svg?text=Product+2",
    color: "White",
    size: "L",
  },
];

const CartPage = () => {
  const subtotal = mockCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {mockCart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center gap-4 border p-4 rounded-md shadow-sm"
            >
              <div className="relative w-28 h-28 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex flex-col flex-grow gap-2 w-full">
                <div className="flex justify-between items-center w-full">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <button className="text-red-500 text-sm hover:underline">Remove</button>
                </div>
                <p className="text-gray-500 text-sm">
                  Color: {item.color} • Size: {item.size}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">${item.price.toFixed(2)}</span>
                  <div className="flex items-center border rounded overflow-hidden">
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">-</button>
                    <span className="px-4 py-1 bg-white">{item.quantity}</span>
                    <button className="px-3 py-1 text-gray-600 hover:bg-gray-100">+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border p-6 rounded-md shadow-sm h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block w-full bg-primary text-white text-center py-2 rounded hover:bg-primary-dark transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
