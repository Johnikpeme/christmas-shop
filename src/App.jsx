import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Plus, Minus, Snowflake, X, Heart, Package } from 'lucide-react';
import './App.css';
import santahatImage from './assets/images/father_christmas.png';
import santaOnesieImage from './assets/images/Gingerbread house.png';
import pyjamasImage from './assets/images/Sleigh.png';
import socksImage from './assets/images/fluffy-santa-socks.PNG';
import shirtsImage from './assets/images/Christmas tree.png';
import santapuffyhatImage from './assets/images/father_christmas.png';
import landscape1 from './assets/images/IMG_7786.JPG';
import landscape2 from './assets/images/IMG_7787.JPG';
import landscape3 from './assets/images/IMG_7792.JPG';
import landscape4 from './assets/images/IMG_7794.JPG';
import landscape5 from './assets/images/IMG_7796.JPG';
import landscape6 from './assets/images/IMG_7797.JPG';
import landscape7 from './assets/images/IMG_7806.JPG';
import landscape8 from './assets/images/IMG_7808.JPG';
import landscape9 from './assets/images/IMG_7809.JPG';
import landscape10 from './assets/images/IMG_7810.JPG';
import landscape11 from './assets/images/IMG_7812.JPG';
import logoNew from './assets/images/logonew.png';
import PaymentModal from './components/PaymentModal';
import sweatshirtsImage from './assets/images/sweatshirts.png'; // Ensure this image exists
import mugsImage from './assets/images/mugs.png'; // Ensure this image exists
import socksNorthPole from './assets/images/north-pole-socks.PNG';
import socksReindeer from './assets/images/reindeer-socks.PNG';
import socksTeddy from './assets/images/teddy-socks.PNG';
import socksSanta from './assets/images/santa-socks.PNG';
import socksChristmasTree from './assets/images/christmas-tree-socks.PNG';
import socksSnowflake from './assets/images/snowflake-socks.PNG';
import socksSnowman from './assets/images/snowman-socks.PNG';
import fluffySanta from './assets/images/fluffy-santa-socks.PNG';
import fluffyTeddy from './assets/images/fluffy-teddy-socks.PNG';

// Enhanced product data with full customization options
const products = [
  {
    id: 1,
    name: 'Classic Santa Hat',
    price: 6000, // Updated price
    image: santahatImage,
    description: 'A timeless holiday essential, sleek red fabric with a fluffy white trim and pom-pom, perfect for any Christmas occasion',
    category: 'Santa Hats',
    rating: 4.8,
    sizes: ['Kids: 3-12 years', 'Adult'], // Updated sizes
    colors: ['darkred', 'darkgreen'],
    styles: ['Regular Fit', 'Oversized']
  },
  {
    id: 2,
    name: 'Puffy Santa Hat',
    price: 6000, // Same as Classic Santa Hat
    image: santapuffyhatImage,
    description: 'A fun, ultra-soft twist on the classic, extra plush and cozy, giving you that warm, festive look everyone loves.',
    category: 'Santa Hats',
    rating: 4.4,
    sizes: ['Kids: 3-12 years', 'Adult'], // Same as Classic Santa Hat
    colors: ['darkred', 'darkgreen'],
    styles: ['Classic Design', 'Personalized']
  },
  {
    id: 3,
    name: 'Christmas Baby Onesies',
    price: 8500, // Updated price
    image: santaOnesieImage,
    description: 'Adorable, cozy, and festive—your little one’s first Christmas made extra special!',
    category: 'Christmas Baby Onesies',
    sizes: ['0-3M', '3-6M', '6-9M', '9-12M'], // Updated sizes
    colors: ['White'], // Single color
    designs: [ // Placeholder designs (replace with client-provided designs)
      'Santa Face',
      'Reindeer',
      'Snowflake',
      'Christmas Tree',
      'Candy Cane',
      'Gingerbread Man',
      'Snowman',
      'Star',
      'Holly',
      'Present'
    ]
  },
  {
    id: 4,
    name: 'Christmas Pyjamas',
    price: 10000, // In Naira
    image: pyjamasImage,
    description: 'Matching magic for lovebirds and the whole crew—perfect for cozy nights and Christmas photos! ❤🎅',
    category: 'Christmas Pyjamas',
    sizes: ['Adult: S', 'Adult: M', 'Adult: L', 'Adult: XL', 'Adult: XXL', 'Kids: 0-6 months', 'Kids: 6-12 months', 'Kids: 1-3 years', 'Kids: 3-12 years'],
    colors: [], // Not used directly; handled by shirt and bottom colors
    shirtStyles: ['Short Sleeves', 'Long Sleeves'],
    bottomStyles: ['Long Plaid', 'Short Plaid'],
    shirtColors: ['#800000', 'darkgreen', '#FFFFFF', '#000000'], // Maroon, Green, White, Black
    bottomColors: ['#800000', '#FFFFFF', 'darkgreen'] // Red, White, Green
  },
  {
    id: 5,
    name: 'Baby Christmas Socks',
    price: 3500, // In Naira
    image: socksImage,
    description: 'The perfect completion to your baby’s Christmas look',
    category: 'Baby Socks',
    sizes: ['Small', 'Medium', 'Large', 'X-Large'],
    colors: [],
    designs: ['North Pole', 'Reindeer', 'Teddy', 'Santa','Snowflake', 'Christmas Tree', 'Snowman', 'Fluffy Santa','Fluffy Teddy'],
    designImages: {
      'North Pole': socksNorthPole,
      'Reindeer': socksReindeer,
      'Teddy': socksTeddy,
      'Santa': socksSanta,
      'Snowflake': socksSnowflake,
      'Christmas Tree': socksChristmasTree,
      'Snowman': socksSnowman,
      'Fluffy Santa':fluffySanta,
      'Fluffy Teddy':fluffyTeddy,
    }
  },
  {
    id: 6,
    name: 'Christmas T-Shirts',
    price: { 'Short Sleeve': 10500, 'Long Sleeve': 13500 }, // Updated price based on style
    image: shirtsImage,
    description: 'Look fun and festive with our stylish Tees 🌟🎄',
    category: 'Christmas T-Shirts',
    sizes: ['Adult: S', 'Adult: M', 'Adult: L', 'Adult: XL', 'Adult: XXL', 'Kids: 3-12 years'], // Removed kids 0-3 years
    colors: ['darkred', 'black', 'white', 'darkgreen'], // Maroon, Black, White, Green
    shirtStyles: ['Short Sleeve', 'Long Sleeve']
  },
  {
    id: 7,
    name: 'Sweatshirts',
    price: 12000, // In Naira
    image: sweatshirtsImage,
    description: 'Warm, comfy, and oh-so-jolly—✨',
    category: 'Sweatshirts',
    sizes: ['Adult: S', 'Adult: M', 'Adult: L', 'Adult: XL', 'Adult: XXL'],
    colors: ['darkred', 'black', 'white', 'darkgreen'], // Maroon, Black, White, Green
    shirtStyles: ['Crew Neck', 'Hoodie']
  },
  {
    id: 8,
    name: 'Christmas Mugs',
    price: 4000, // In Naira
    image: mugsImage,
    description: 'Sip the season’s joy in style—perfect for cocoa, coffee, and gifting! ☕🎅',
    category: 'Christmas Mugs',
    sizes: ['Standard'],
    colors: ['white', 'darkred', 'darkgreen'] // White, Red, Green
  }
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
  const [selectedDesign, setSelectedDesign] = useState(product?.designs ? product.designs[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [customText, setCustomText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || '');
      setSelectedColor(product.colors ? product.colors[0] : '');
      // Ensure selectedShirtStyle is valid for products with shirtStyles
      setSelectedShirtStyle(product.shirtStyles ? product.shirtStyles[0] : '');
      setSelectedShirtColor(product.shirtColors ? product.shirtColors[0] : '');
      setSelectedBottomStyle(product.bottomStyles ? product.bottomStyles[0] : '');
      setSelectedBottomColor(product.bottomColors ? product.bottomColors[0] : '');
      setSelectedDesign(product.designs ? product.designs[0] : '');
      setQuantity(1);
      setCustomText('');
      setUploadedImage(null);
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
      selectedDesign,
      quantity,
      customText,
      uploadedImage,
      cartId: `${product.id}-${selectedSize}-${selectedColor}-${selectedShirtStyle}-${selectedShirtColor}-${selectedBottomStyle}-${selectedBottomColor}-${selectedDesign}-${customText || ''}`
    };
    onAddToCart(customizedProduct);
    onClose();
  };

  const getCustomSizes = (name) => {
    if (['Puffy Santa Hat', 'Classic Santa Hat'].includes(name)) {
      return ['Kids: 3-12 years', 'Adult'];
    }
    return product.sizes || [];
  };

  const getShirtColors = (name) => {
    if (name === 'Christmas Pyjamas') {
      return product.shirtColors || [];
    }
    if (['Christmas T-Shirts', 'Sweatshirts'].includes(name)) {
      return product.colors || [];
    }
    if (['Puffy Santa Hat', 'Classic Santa Hat'].includes(name)) {
      return ['#dc2626', '#16a34a'];
    }
    return product.colors || [];
  };

  const getBottomColors = (name) => {
    if (name === 'Christmas Pyjamas') {
      return product.bottomColors || [];
    }
    return product.colors || [];
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setUploadedImage(URL.createObjectURL(file));
    } else {
      alert('Please upload a valid image file');
    }
  };

  const getCustomTextPlaceholder = (name) => {
    if (name === 'Christmas Baby Onesies') {
      return 'Add baby’s name';
    }
    if (['Puffy Santa Hat', 'Classic Santa Hat'].includes(name)) {
      return 'Enter names (separate each name with a comma)';
    }
    return 'Enter text for the item';
  };

  // Get the display price safely
  const getDisplayPrice = () => {
    try {
      let basePrice;
      if (product.name === 'Baby Christmas Socks' && selectedDesign) {
        const premiumDesigns = ['Christmas Tree', 'Snowman', 'Fluffy Santa', 'Fluffy Teddy'];
        basePrice = premiumDesigns.includes(selectedDesign) ? 5500 : 3500;
      } else if (typeof product.price === 'object' && selectedShirtStyle && product.price[selectedShirtStyle]) {
        basePrice = product.price[selectedShirtStyle];
      } else {
        basePrice = product.price;
      }
      return (basePrice * quantity).toFixed(2);
    } catch (error) {
      console.error('Error calculating display price:', error);
      return '0.00';
    }
  };

  const displayImage = (selectedDesign && product.designImages && product.designImages[selectedDesign]) || product.image;

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
                <img src={displayImage} alt={product.name} className="w-full h-96 object-contain bg-transparent" />
                {uploadedImage && (
                  <div className="mt-4">
                    <p className="text-gray-600 mb-2">Uploaded Image Preview:</p>
                    <img src={uploadedImage} alt="Uploaded preview" className="w-full h-32 object-contain" />
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h2>
                <p className="text-gray-600 mb-6">{product.description}</p>
                <div className="text-4xl font-bold text-red-600 mb-6">
                  ₦{getDisplayPrice()}
                </div>

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

                {/* Design Selection for Onesies */}
                {product.designs && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Design</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {product.designs.map((design) => (
                        <button
                          key={design}
                          onClick={() => setSelectedDesign(design)}
                          className={`p-4 border-2 rounded-xl text-sm font-medium transition-all ${
                            selectedDesign === design
                              ? 'border-red-500 bg-red-50 text-red-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          {design}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Shirt Style and Color Selection for Christmas Pyjamas, T-Shirts, and Sweatshirts */}
                {['Christmas Pyjamas', 'Christmas T-Shirts', 'Sweatshirts'].includes(product.name) && product.shirtStyles && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Style</h3>
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

                {/* Color Selection for Onesies, Hats, Socks, and Mugs */}
                {['Puffy Santa Hat', 'Classic Santa Hat', 'Baby Christmas Socks', 'Christmas Mugs'].includes(product.name) && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Color</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {['Puffy Santa Hat', 'Classic Santa Hat'].includes(product.name)
                        ? getShirtColors(product.name).map((color) => (
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
                          ))
                        : product.colors.map((color) => (
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
                          ))}
                    </div>
                  </div>
                )}

                {/* Custom Text Input */}
                {['Puffy Santa Hat', 'Classic Santa Hat', 'Christmas Pyjamas', 'Christmas T-Shirts', 'Christmas Baby Onesies', 'Baby Christmas Socks', 'Christmas Mugs'].includes(product.name) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Custom Text</h3>
                    <input
                      type="text"
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder={getCustomTextPlaceholder(product.name)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all"
                      maxLength={20}
                    />
                  </div>
                )}

                {/* Image Upload */}
                {['Puffy Santa Hat', 'Classic Santa Hat', 'Christmas Pyjamas', 'Christmas T-Shirts', 'Christmas Baby Onesies', 'Baby Christmas Socks', 'Christmas Mugs'].includes(product.name) && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Upload Image (Optional)</h3>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:ring-1 focus:ring-red-200 transition-all"
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
                  Add to Cart - ₦{getDisplayPrice()}
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
  const getItemPrice = (item) => {
    if (item.name === 'Baby Christmas Socks' && item.selectedDesign) {
      const premiumDesigns = ['Christmas Tree', 'Snowman', 'Fluffy Santa', 'Fluffy Teddy'];
      return premiumDesigns.includes(item.selectedDesign) ? 5500 : 3500;
    } else if (typeof item.price === 'object' && item.selectedShirtStyle && item.price[item.selectedShirtStyle]) {
      return item.price[item.selectedShirtStyle];
    } else {
      return item.price || 0;
    }
  };

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
                        {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                        {item.selectedShirtStyle && <p>Style: {item.selectedShirtStyle}</p>}
                        {item.selectedDesign && <p>Design: {item.selectedDesign}</p>}
                        {item.customText && <p>Text: {item.customText}</p>}
                        {item.uploadedImage && <p>Image: Uploaded</p>}
                      </div>
                      <p className="font-bold text-red-600 mt-2">
                        ₦{getItemPrice(item).toFixed(2)}
                      </p>
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

// App Component (only updating getTotalPrice)
function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const slides = [landscape4, landscape2, landscape3, landscape1, landscape5, landscape6, landscape7, landscape8, landscape9, landscape10, landscape11];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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

  const getItemPrice = (item) => {
    if (item.name === 'Baby Christmas Socks' && item.selectedDesign) {
      const premiumDesigns = ['Christmas Tree', 'Snowman', 'Fluffy Santa', 'Fluffy Teddy'];
      return premiumDesigns.includes(item.selectedDesign) ? 5500 : 3500;
    } else if (typeof item.price === 'object' && item.selectedShirtStyle && item.price[item.selectedShirtStyle]) {
      return item.price[item.selectedShirtStyle];
    } else {
      return item.price || 0;
    }
  };

  const getTotalPrice = () => {
    try {
      return cart
        .reduce((total, item) => {
          const price = getItemPrice(item);
          return total + price * item.quantity;
        }, 0)
        .toFixed(2);
    } catch (error) {
      console.error('Error calculating total price:', error);
      return '0.00';
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsProductModalOpen(true);
  };

  // ... (Rest of the App component remains unchanged)
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
              style={{ backgroundImage: `url(${slide})`, backgroundSize: 'cover', backgroundPosition: '50% 35%' }}
            ></div>
          ))}
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute -top-4 left-8 z-50">
            <img src={logoNew} alt="The Christmas Company Logo" className="w-24 h-auto" />
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
          const isFastSelling = ['Classic Santa Hat', 'Puffy Santa Hat', 'Christmas T-Shirts'].includes(product.name);

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

      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onAddToCart={addToCart}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cart={cart}
        totalAmount={parseFloat(getTotalPrice())}
      />

      {isCartOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setIsCartOpen(false)} />
      )}
    </div>
  );
}

export default App;