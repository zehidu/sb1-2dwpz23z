import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ShoppingBag, Truck, Shield, CreditCard } from 'lucide-react';
import { Product } from '../types';
import { getAllProducts } from '../services/productService';

const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProducts();
        setFeaturedProducts(productsData.slice(0, 3));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Shop the Latest Products at Amazing Prices
              </h1>
              <p className="mt-4 text-lg text-blue-100">
                Discover our curated collection of high-quality products for every need.
              </p>
              <div className="mt-8">
                <Link
                  to="/products"
                  className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Shopping"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <ShoppingBag className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Wide Selection</h3>
            <p className="text-gray-600 mt-2">Thousands of products to choose from</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Truck className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Fast Delivery</h3>
            <p className="text-gray-600 mt-2">Quick shipping to your doorstep</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Shield className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Secure Shopping</h3>
            <p className="text-gray-600 mt-2">Your data is always protected</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <CreditCard className="h-10 w-10 text-blue-600 mb-3" />
            <h3 className="text-lg font-semibold">Easy Payments</h3>
            <p className="text-gray-600 mt-2">Multiple payment options available</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Featured Products</h2>
          <p className="mt-2 text-gray-600">Check out our most popular items</p>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading featured products...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        
        <div className="mt-10 text-center">
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;