import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Plus, Minus, Gift, Snowflake, X, Heart, Package } from 'lucide-react';
import './App.css';
import santahatImage from './assets/images/father_christmas.PNG';
import santaOnesieImage from './assets/images/Gingerbread house.PNG';
import pyjamasImage from './assets/images/Sleigh.PNG';
import socksImage from './assets/images/Christmas socks.PNG';
import shirtsImage from './assets/images/Christmas tree.PNG';
import santapuffyhatImage from './assets/images/father_christmas.PNG';
import landscape1 from './assets/images/landscape1.jpg';
import landscape2 from './assets/images/landscape2.jpg';
import landscape3 from './assets/images/landscape3.jpg';
import landscape4 from './assets/images/landscape4.jpg';
import PaymentModal from './components/PaymentModal';

// Enhanced product data with full customization options
const products = [
  {
    id: 1,
    name: 'Classic Santa Hat',
    price: 6500,
    image: santahatImage,
    description: 'A timeless holiday essential, sleek red fabric with a fluffy white trim and pom-pom, perfect for any Christmas occasion',
    category: 'Santa Hats',
    rating: 4.8,
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: ['darkred', 'darkgreen'],
    styles: ['Regular Fit', 'Oversized', 'Kids Style']
  },
  {
    id: 2,
    name: 'Premium Santa Onesie',
    price: 15000, // In Naira
    image: santaOnesieImage,
    description: 'Wrap yourself in holiday comfort with our Premium Santa Onesie, ultra-soft, cozy, and perfect for festive nights at home.',
    category: 'Onesies',
    sizes: ['0-3M', '3-6M', '1-2 yrs'],
    colors: ['White', 'darkred', 'Black'], // White, Red, Black
  },
  {
    id: 3,
    name: 'Christmas Pyjamas',
    price: 10000, // In Naira
    image: pyjamasImage,
    description: 'Celebrate the season in style with our Christmas Pyjamas, lightweight, breathable, and designed for a perfect holiday fit.',
    category: 'Gift Sets',
    sizes: ['Adult: S', 'Adult: M', 'Adult: L', 'Adult: XL', 'Adult: XXL', 'Kids: 0-6 months', 'Kids: 6-12 months', 'Kids: 1-3 years', 'Kids: 3-12 years'],
    colors: [], // Not used directly; handled by shirt and bottom colors
    shirtStyles: ['Short Sleeves', 'Long Sleeves'],
    bottomStyles: ['Long Plaid', 'Short Plaid'],
    shirtColors: ['#800000', 'darkgreen', '#FFFFFF', '#000000'], // Maroon, Green, White, Black (hex codes)
    bottomColors: ['#800000', '#FFFFFF', 'darkgreen'], // Red, White, Green (hex codes)
  },
  {
    id: 4,
    name: 'Christmas Socks',
    price: 5000, // In Naira (adjust as needed)
    image: socksImage, // Ensure you have a socksImage variable or path
    description: 'Warm up your holiday style with our festive Christmas Socks, soft and cozy for the season.',
    category: 'Accessories',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'], // Default sock sizes; adjust if needed
    colors: ['darkred', 'white', 'darkgreen'], // Red, White, Green
  },
  {
    id: 5,
    name: 'T-Shirts',
    price: 8000, // In Naira
    image: shirtsImage,
    description: 'Spread holiday cheer in style with our Christmas T-Shirts, premium cotton, vibrant prints, and a perfect fit for every celebration.',
    category: 'Clothing',
    sizes: ['Adult: S', 'Adult: M', 'Adult: L', 'Adult: XL', 'Adult: XXL', 'Kids: 0-6 months', 'Kids: 6-12 months', 'Kids: 1-3 years', 'Kids: 3-12 years'],
    colors: ['darkred', 'black', 'white', 'darkgreen'], // Maroon, Black, White, Green
    shirtStyles: ['Short Sleeve', 'Long Sleeve'], // Type options
  },
  {
    id: 6,
    name: 'Puffy Santa Hat',
    price: 7800,
    image: santapuffyhatImage,
    description: 'A fun, ultra-soft twist on the classic, extra plush and cozy, giving you that warm, festive look everyone loves.',
    category: 'Stockings',
    rating: 4.4,
    sizes: ['Small (Kids)', 'Medium (Adult)', 'Large (Family Pack)'],
    colors: ['darkred', 'Elegant Gold', 'Winter White', 'Custom Mix'],
    styles: ['Classic Design', 'Personalized', 'Luxury Velvet']
  },
];

// Floating elements component for 3D effect
const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute top-20 right-10 animate-bounce" style={{ animationDuration: '6s' }}>
        <div className="text-6xl opacity-10">🎄</div>
      </div>
      <div className="absolute top-40 left-20 animate-pulse" style={{ animationDuration: '4s' }}>
        <div className="text-4xl opacity-15">🎁</div>
      </div>
      <div className="absolute bottom-40 right-32 animate-bounce" style={{ animationDuration: '5s' }}>
        <div className="text-5xl opacity-10">⭐</div>
      </div>
      <div className="absolute top-60 left-1/2 animate-pulse" style={{ animationDuration: '7s' }}>
        <div className="text-3xl opacity-20">🔔</div>
      </div>
      <div className="absolute bottom-20 left-10 animate-bounce" style={{ animationDuration: '8s' }}>
        <div className="text-4xl opacity-15">🎅</div>
      </div>
      <div className="absolute top-32 left-1/4 w-16 h-16 bg-red-200 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute bottom-32 right-1/4 w-12 h-12 bg-green-200 rounded-lg opacity-10 animate-bounce"></div>
      <div className="absolute top-1/2 right-20 w-8 h-8 bg-blue-200 rounded-full opacity-15" style={{ animation: 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
    </div>
  );
};

// Snowflake component
const SnowflakeEffect = () => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    const createSnowflake = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      animationDuration: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      fontSize: Math.random() * 8 + 8
    });

    const snowflakeArray = Array.from({ length: 30 }, createSnowflake);
    setSnowflakes(snowflakeArray);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake absolute text-white"
          style={{
            left: `${snowflake.left}%`,
            animationDuration: `${snowflake.animationDuration}s`,
            opacity: snowflake.opacity,
            fontSize: `${snowflake.fontSize}px`
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

// Product Customization Modal
const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [selectedShirtStyle, setSelectedShirtStyle] = useState(product?.shirtStyles ? product.shirtStyles[0] : '');
  const [selectedShirtColor, setSelectedShirtColor] = useState(product?.shirtColors ? product.shirtColors[0] : '');
  const [selectedBottomStyle, setSelectedBottomStyle] = useState(product?.bottomStyles ? product.bottomStyles[0] : '');
  const [selectedBottomColor, setSelectedBottomColor] = useState(product?.bottomColors ? product.bottomColors[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState(''); // State for custom text input
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      setSelectedShirtStyle(product.shirtStyles ? product.shirtStyles[0] : '');
      setSelectedShirtColor(product.shirtColors ? product.shirtColors[0] : '');
      setSelectedBottomStyle(product.bottomStyles ? product.bottomStyles[0] : '');
      setSelectedBottomColor(product.bottomColors ? product.bottomColors[0] : '');
      setQuantity(1);
      setCustomText(''); // Reset custom text on modal open
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    const customizedProduct = {
      ...product,
      selectedSize,
      selectedColor,
      selectedShirtStyle,
      selectedShirtColor,
      selectedBottomStyle,
      selectedBottomColor,
      quantity,
      customText, // Include custom text in the cart item
      cartId: `${product.id}-${selectedSize}-${selectedColor}-${selectedShirtStyle}-${selectedShirtColor}-${selectedBottomStyle}-${selectedBottomColor}-${customText || ''}`
    };
    onAddToCart(customizedProduct);
    onClose();
  };

  // Custom sizes for Puffy Santa Hat and Classic Santa Hat
  const getCustomSizes = (name) => {
    if (['Puffy Santa Hat', 'Classic Santa Hat'].includes(name)) {
      return ['Kids: 0-6 months', 'Kids: 6-12 months', 'Kids: 1-3 years', 'Kids: 3-12 years', 'Adult'];
    }
    return product.sizes; // Use updated sizes for Pyjamas, T-Shirts, Onesies, Socks
  };

  // Custom colors for Puffy Santa Hat, Classic Santa Hat, or specific colors for others
  const getShirtColors = (name) => {
    if (name === 'Christmas Pyjamas') {
      return product.shirtColors || []; // Maroon, Green, White, Black
    }
    if (name === 'T-Shirts') {
      return product.colors || []; // Maroon, Black, White, Green
    }
    if (['Puffy Santa Hat', 'Classic Santa Hat'].includes(name)) {
      return ['#dc2626', '#16a34a']; // Red and Green only
    }
    return product.colors;
  };

  const getBottomColors = (name) => {
    if (name === 'Christmas Pyjamas') {
      return product.bottomColors || []; // Red, White, Green
    }
    return product.colors;
  };

  const getOnesieColors = (name) => {
    if (name === 'Premium Santa Onesie') {
      return product.colors || []; // White, Red, Black
    }
    return product.colors;
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src={product.image} alt={product.name} className="w-full h-96 object-contain bg-transparent" />
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="text-4xl font-bold text-red-600 mb-6">₦{product.price.toFixed(2)}</div>

                {/* Size Selection */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Size</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {getCustomSizes(product.name).map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`p-4 border-2 rounded-xl text-sm font-medium transition-all ${
                          selectedSize === size
                            ? 'border-red-500 bg-red-50 text-red-700'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shirt Style and Color Selection for Christmas Pyjamas and T-Shirts */}
                {['Christmas Pyjamas', 'T-Shirts'].includes(product.name) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Shirt</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {product.shirtStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedShirtStyle(style)}
                          className={`p-4 border-2 rounded-xl text-sm font-medium transition-all ${
                            selectedShirtStyle === style
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-4 gap-2">
                      {getShirtColors(product.name).map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedShirtColor(color)}
                          className={`w-10 h-10 border-2 rounded-lg transition-all ${
                            selectedShirtColor === color
                              ? 'border-red-500 ring-2 ring-red-300'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Style and Color Selection for Christmas Pyjamas */}
                {product.name === 'Christmas Pyjamas' && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Bottom</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {product.bottomStyles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedBottomStyle(style)}
                          className={`p-4 border-2 rounded-xl text-sm font-medium transition-all ${
                            selectedBottomStyle === style
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {getBottomColors(product.name).map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedBottomColor(color)}
                          className={`w-10 h-10 border-2 rounded-lg transition-all ${
                            selectedBottomColor === color
                              ? 'border-red-500 ring-2 ring-red-300'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection for Onesies, Hats, and Socks */}
                {['Puffy Santa Hat', 'Classic Santa Hat', 'Premium Santa Onesie', 'Christmas Socks'].includes(product.name) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Color</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['Puffy Santa Hat', 'Classic Santa Hat'].includes(product.name) ? getShirtColors(product.name).map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 border-2 rounded-lg transition-all ${
                            selectedColor === color
                              ? 'border-red-500 ring-2 ring-red-300'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      )) : product.name === 'Premium Santa Onesie' ? getOnesieColors(product.name).map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 border-2 rounded-lg transition-all ${
                            selectedColor === color
                              ? 'border-red-500 ring-2 ring-red-300'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      )) : product.name === 'Christmas Socks' ? product.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`w-10 h-10 border-2 rounded-lg transition-all ${
                            selectedColor === color
                              ? 'border-red-500 ring-2 ring-red-300'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      )) : null}
                    </div>
                  </div>
                )}

                {/* Style Selection (only for non-custom products except Pyjamas, T-Shirts, Hats, Onesies, Socks) */}
                {!['Puffy Santa Hat', 'Classic Santa Hat', 'Christmas Pyjamas', 'T-Shirts', 'Premium Santa Onesie', 'Christmas Socks'].includes(product.name) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Style</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {product.styles.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(style)}
                          className={`p-3 border-2 rounded-xl text-sm font-medium transition-all ${
                            selectedStyle === style
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Text Input for Puffy, Classic Santa Hat, Christmas Pyjamas, T-Shirts, Onesies, and Socks */}
                {['Puffy Santa Hat', 'Classic Santa Hat', 'Christmas Pyjamas', 'T-Shirts', 'Premium Santa Onesie', 'Christmas Socks'].includes(product.name) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Custom Text</h3>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Enter text for the item"
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all"
                      maxLength={20}
                    />
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Quantity</h3>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Minus className="h-5 w-5" />
                    </button>
                    <span className="text-2xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 border-2 border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-3xl h-16 font-medium text-xl transition-all transform hover:scale-105 flex items-center justify-center"
                >
                  <ShoppingCart className="h-6 w-6 mr-2" />
                  Add to Cart - ₦{(product.price * quantity).toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Cart Sidebar Component
const CartSidebar = ({ isOpen, onClose, cart, updateQuantity, getTotalPrice, getTotalItems, onCheckout }) => {
  return (
    <div className={`fixed inset-y-0 right-0 z-50 w-96 bg-white shadow-2xl transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">
              <ShoppingCart className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.cartId} className="bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-start space-x-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{item.name}</h4>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Size: {item.selectedSize}</p>
                        <p>Color: {item.selectedColor}</p>
                        <p>Style: {item.selectedStyle}</p>
                      </div>
                      <p className="font-bold text-red-600 mt-2">₦{item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                        className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => updateQuantity(item.cartId, 0)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-800">Total ({getTotalItems()} items)</span>
              <span className="text-2xl font-bold text-red-600">₦{getTotalPrice()}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-2xl h-14 font-medium text-lg transition-all transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false); // New state for PaymentModal
  const slides = [landscape1, landscape2, landscape3, landscape4]; // Array of four landscape images

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const addToCart = (customizedProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.cartId === customizedProduct.cartId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.cartId === customizedProduct.cartId
            ? { ...item, quantity: item.quantity + customizedProduct.quantity }
            : item
        );
      }
      return [...prevCart, customizedProduct];
    });
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.cartId === cartId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative overflow-hidden">
      <SnowflakeEffect />
      <FloatingElements />

      {/* Hero Section (Full-screen Carousel with Logo and Cart) */}
      <section className="relative z-0 w-screen">
        <div className="relative w-full h-[700px] overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${slide})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            ></div>
          ))}
          <div className="absolute inset-0 bg-black/40"></div> {/* Transparent overlay */}
          {/* Logo and Cart overlaid on carousel */}
          <div className="absolute top-8 left-8 z-50">
            <div className="w-12 h-12">
              <Gift className="h-12 w-12 text-white opacity-80" />
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="absolute top-8 right-12 z-50 bg-transparent border-none group"
          >
            <div className="relative w-14 h-14 flex items-center justify-center rounded-full border-2 border-white/30 bg-gradient-to-br from-transparent to-white/10 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-white/20 group-hover:to-transparent group-hover:border-white/50">
              <ShoppingCart className="h-12 w-12 text-white opacity-80 transition-all duration-300 group-hover:scale-110" />
            </div>
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B71C1C] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md">
                {getTotalItems()}
              </span>
            )}
          </button>
          {/* Centered text */}
          <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
            <div>
              <h3 className="text-4xl font-bold mb-2">Welcome to</h3>
              <h2 className="text-7xl font-bold">The Christmas Company</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="relative z-10 py-16">
        <div className="text-center mb-16">
          <h3 className="text-6xl font-bold text-gray-900 mb-4">Featured Products</h3>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium Christmas merchandise, each item crafted with love and attention to detail.
          </p>
        </div>

        {products.map((product, index) => {
          const colors = ['bg-[#053f31]', 'bg-[#9e1b23]', 'bg-[#e6cbba]'];
          const currentColor = colors[index % colors.length];

          // Conditionally render "Fast Selling" tag only for specific products
          const isFastSelling = [
            'Classic Santa Hat',
            'Puffy Santa Hat',
            'T-Shirts',
          ].includes(product.name);

          return (
            <div
              key={product.id}
              className={`w-full py-12 ${currentColor} text-white relative overflow-hidden flex items-center min-h-[400px]`}
            >
              <div className="flex items-center justify-between flex-col lg:flex-row px-6 w-full h-full">
                <div className="w-full lg:w-1/2 mb-6 lg:mb-0 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-auto h-[300px] object-contain bg-transparent"
                  />
                  {isFastSelling && (
                    <div className="absolute top-4 left-4 bg-white/80 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      Fast Selling
                    </div>
                  )}
                </div>
                <div className="w-full lg:w-1/2 text-center lg:text-left flex items-center">
                  <div className="w-full">
                    <h3 className="text-6xl font-bold mb-4">{product.name}</h3>
                    <p className="text-white/80 mb-6 text-2xl leading-relaxed max-w-lg mx-auto lg:mx-0">
                      {product.description}
                    </p>
                    <button
                      onClick={() => openProductModal(product)}
                      className="bg-white text-gray-900 hover:bg-gray-100 rounded-lg px-8 py-3 font-semibold text-lg transition-all hover:scale-105"
                    >
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        getTotalPrice={getTotalPrice}
        getTotalItems={getTotalItems}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsPaymentModalOpen(true);
        }}
      />

      {/* Product Customization Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={addToCart}
      />

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cart={cart}
        totalAmount={parseFloat(getTotalPrice())}
      />

      {/* Overlay for cart */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setIsCartOpen(false)} />
      )}
    </div>
  );
}

export default App;