import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CreditCard, Lock, CheckCircle, MapPin, Truck } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, cart, totalAmount, clearCart }) => {
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    deliveryAddress: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [addressError, setAddressError] = useState('');

  // Insert your Paystack test public key here
  const publicKey = 'pk_test_049317194455bb577441dad6b61b7ef8e3066917';

  // Nigeria state delivery pricing (Abuja is base state)
  const stateDeliveryPricing = {
    'abuja': 2000,
    'fct': 2000, // Federal Capital Territory
    'lagos': 9000,
    'kano': 9000,
    'rivers': 9000,
    'kaduna': 9000,
    'oyo': 9000,
    'plateau': 9000,
    'delta': 9000,
    'imo': 9000,
    'anambra': 9000,
    'enugu': 9000,
    'abia': 9000,
    'ondo': 9000,
    'ogun': 9000,
    'edo': 9000,
    'kwara': 9000,
    'osun': 9000,
    'ekiti': 9000,
    'nasarawa': 9000,
    'niger': 9000,
    'kogi': 9000,
    'benue': 9000,
    'taraba': 9000,
    'adamawa': 9000,
    'gombe': 9000,
    'bauchi': 9000,
    'borno': 9000,
    'yobe': 9000,
    'jigawa': 9000,
    'katsina': 9000,
    'zamfara': 9000,
    'sokoto': 9000,
    'kebbi': 9000,
    'cross river': 9000,
    'akwa ibom': 9000,
    'bayelsa': 9000,
    'ebonyi': 9000,
  };

  const calculateDeliveryFee = (address) => {
    if (!address) {
      setAddressError('');
      return 0;
    }
    
    const normalizedAddress = address.toLowerCase().trim();
    
    // Check if address contains any state name
    let foundState = false;
    let deliveryFee = 0;
    
    for (const [state, fee] of Object.entries(stateDeliveryPricing)) {
      if (normalizedAddress.includes(state)) {
        foundState = true;
        deliveryFee = fee;
        break;
      }
    }
    
    if (!foundState) {
      setAddressError('Please include state in your address');
      return 0;
    } else {
      setAddressError('');
      return deliveryFee;
    }
  };

  const handleInputChange = (field, value) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }));
    
    // Calculate delivery fee when address changes
    if (field === 'deliveryAddress') {
      const fee = calculateDeliveryFee(value);
      setDeliveryFee(fee);
    }
  };

  const finalTotalAmount = totalAmount + deliveryFee;

  const handlePaystackSuccess = async (response) => {
    console.log('Payment successful:', response);
    setIsProcessing(false);

    try {
      const verifyResponse = await fetch('http://localhost:3150/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          reference: response.reference,
          orderData: {
            email: customerInfo.email,
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            phone: customerInfo.phone,
            deliveryAddress: customerInfo.deliveryAddress,
            items: cart,
            subtotal: totalAmount,
            deliveryFee: deliveryFee
          }
        }),
      });

      const verifyData = await verifyResponse.json();

      if (verifyData.status === 'success') {
        // Store verified order details
        setOrderDetails({
          ...verifyData.data,
          email: customerInfo.email,
          firstName: customerInfo.firstName,
          lastName: customerInfo.lastName,
          deliveryAddress: customerInfo.deliveryAddress,
          items: cart,
          subtotal: totalAmount,
          deliveryFee: deliveryFee,
          total: finalTotalAmount,
        });

        // Clear cart
        if (clearCart) clearCart();

        setPaymentSuccess(true);

        // Auto-close after showing success
        setTimeout(() => {
          setPaymentSuccess(false);
          setOrderDetails(null);
          onClose();
        }, 10000); // 10 seconds

        // Optional: Poll for order status updates
        const interval = setInterval(async () => {
          try {
            const statusResponse = await fetch(`http://localhost:3150/api/order/${response.reference}`);
            const statusData = await statusResponse.json();
            if (statusData.status === 'success' && statusData.order.status === 'shipped') {
              clearInterval(interval);
              // Update UI or show shipping notification
            }
          } catch (error) {
            clearInterval(interval);
          }
        }, 30000); // Check every 30 seconds

      } else {
        alert('❌ Payment verification failed. Please contact support.');
        // Don't clear cart on verification failure
      }
    } catch (error) {
      console.error('Verification error:', error);
      alert('❌ Error verifying payment. Please contact support.');
    }
  };

  const handlePaystackClose = () => {
    console.log('Payment window closed');
    setIsProcessing(false);
  };

  const handleDirectPayment = () => {
    if (!customerInfo.email || !customerInfo.firstName || !customerInfo.deliveryAddress) {
      alert('Please fill in all required fields (Email, First Name, and Delivery Address).');
      return;
    }

    if (addressError) {
      alert('Please correct your delivery address by including your state.');
      return;
    }

    if (deliveryFee === 0) {
      alert('Please enter a valid delivery address with your state.');
      return;
    }

    setIsProcessing(true);

    // Close the modal temporarily to avoid z-index conflicts
    const originalOnClose = onClose;
    onClose();

    // Initialize Paystack directly using their JS API
    if (window.PaystackPop) {
      const popup = window.PaystackPop.setup({
        key: publicKey,
        email: customerInfo.email,
        amount: Math.round(finalTotalAmount * 100), // Use final total including delivery
        currency: 'NGN',
        ref: `txn_${Date.now()}`,
        firstname: customerInfo.firstName,
        lastname: customerInfo.lastName,
        phone: customerInfo.phone,
        onClose: () => {
          setIsProcessing(false);
          // Reopen the modal if payment was cancelled
          setTimeout(() => {
            originalOnClose(); // This should actually reopen the modal
          }, 100);
        },
        callback: (response) => {
          handlePaystackSuccess(response);
        }
      });
      popup.openIframe();
    } else {
      // Fallback: reopen modal and show error
      setTimeout(() => {
        originalOnClose();
        alert('Payment system not loaded. Please refresh and try again.');
        setIsProcessing(false);
      }, 100);
    }
  };

  // Reset states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setPaymentSuccess(false);
      setIsProcessing(false);
      setOrderDetails(null);
      setAddressError('');
    }
  }, [isOpen]);

  // Reset delivery fee when modal opens
  useEffect(() => {
    if (isOpen) {
      const fee = calculateDeliveryFee(customerInfo.deliveryAddress);
      setDeliveryFee(fee);
    }
  }, [isOpen, customerInfo.deliveryAddress]);

  return (
    <>
      {/* Add Paystack script if not already included */}
      <script src="https://js.paystack.co/v1/inline.js"></script>
      
      <Dialog 
        open={isOpen} 
        onOpenChange={onClose}
      >
        <DialogContent 
          className="sm:max-w-2xl p-6 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-y-auto max-h-[85vh]"
          style={{ zIndex: 1000 }}
        >
          {paymentSuccess && orderDetails ? (
            <div className="text-center py-8">
              <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-green-700 mb-6">Thank You for Ordering From Us!</h3>
              
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 text-left">
                <p className="text-lg text-gray-700 mb-4">
                  Details of your order has been sent to your email: 
                  <span className="font-semibold text-green-700"> {orderDetails.email}</span>
                </p>
                
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Details of your orders are as follows:</h4>
                
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-green-200">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600"> ({item.selectedSize})</span>
                        <span className="text-gray-600"> x{item.quantity}</span>
                      </div>
                      <span className="font-semibold">₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  
                  <div className="pt-3 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>₦{orderDetails.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span>₦{orderDetails.deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total Paid:</span>
                      <span>₦{orderDetails.total.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-green-200">
                    <p className="text-sm text-gray-600">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Delivery Address: {orderDetails.deliveryAddress}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Reference: {orderDetails.reference}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className="text-2xl font-bold text-red-600 mb-2">🎄 Have a Merry Christmas! 🎄</p>
              <p className="text-gray-600">Your order will be delivered within 24-48 hours.</p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-teal-500 text-white p-4 rounded-lg">
                  <Lock className="h-6 w-6" />
                  <span className="text-xl font-bold">Secure Checkout</span>
                </DialogTitle>
                <DialogDescription className="text-gray-600 mt-2 text-base">
                  Complete your purchase securely with Paystack
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Order Summary</h4>
                  {cart.map((item) => (
                    <div key={item.cartId} className="flex justify-between text-sm mb-1">
                      <span>{item.name} ({item.selectedSize}) x{item.quantity}</span>
                      <span>₦{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>₦{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm items-center">
                      <span className="flex items-center">
                        <Truck className="h-4 w-4 mr-1" />
                        Delivery Fee:
                      </span>
                      <span>₦{deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-1">
                      <span>Total:</span>
                      <span>₦{finalTotalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="John"
                      className="mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Doe"
                      className="mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john.doe@example.com"
                    className="mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={customerInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+2348012345678"
                    className="mt-2 border-gray-300 focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryAddress" className="text-sm font-medium text-gray-700">
                    Delivery Address *
                  </Label>
                  <Input
                    id="deliveryAddress"
                    value={customerInfo.deliveryAddress}
                    onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                    placeholder="e.g., 123 Main Street, Ikeja, Lagos State"
                    className={`mt-2 border-gray-300 focus:ring-2 focus:ring-green-500 ${addressError ? 'border-red-500' : ''}`}
                  />
                  {addressError && (
                    <p className="text-sm text-red-600 mt-1">
                      {addressError}
                    </p>
                  )}
                  {customerInfo.deliveryAddress && !addressError && deliveryFee > 0 && (
                    <p className="text-sm text-green-600 mt-1">
                      <MapPin className="h-4 w-4 inline mr-1" />
                      Delivery fee: ₦{deliveryFee.toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              <DialogFooter className="mt-6">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                
                <Button
                  onClick={handleDirectPayment}
                  disabled={isProcessing || !customerInfo.email || !customerInfo.firstName || !customerInfo.deliveryAddress || addressError || deliveryFee === 0}
                  className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all disabled:opacity-50"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  {isProcessing ? 'Processing...' : `Pay ₦${finalTotalAmount.toLocaleString()}`}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentModal;