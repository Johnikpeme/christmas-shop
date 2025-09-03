import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, cart, totalAmount }) => {
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleInputChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const processPayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setPaymentSuccess(false);
        onClose();
      }, 3000);
    }, 2000);
  };

  const initializePaystackPayment = () => {
    // In a real implementation, use Paystack's JavaScript SDK
    // For demo, simulate payment process
    const paystackConfig = {
      key: 'pk_test_your_paystack_public_key', // Replace with your actual public key
      email: customerInfo.email,
      amount: Math.round(totalAmount * 100), // Amount in kobo (Naira)
      currency: 'NGN', // Changed to Naira
      ref: `txn_${Date.now()}`,
      callback: function(response) {
        console.log('Payment successful:', response);
        setPaymentSuccess(true);
      },
      onClose: function() {
        console.log('Payment window closed');
      }
    };

    // In production: PaystackPop.setup(paystackConfig).openIframe();
    processPayment(); // For demo
  };

  const initializeFlutterwavePayment = () => {
    // In a real implementation, use Flutterwave's JavaScript SDK
    // For demo, simulate payment process
    const flutterwaveConfig = {
      public_key: 'FLWPUBK_TEST-your_flutterwave_public_key', // Replace with your actual public key
      tx_ref: `txn_${Date.now()}`,
      amount: totalAmount,
      currency: 'NGN', // Changed to Naira
      payment_options: 'card,mobilemoney,ussd',
      customer: {
        email: customerInfo.email,
        phone_number: customerInfo.phone,
        name: `${customerInfo.firstName} ${customerInfo.lastName}`,
      },
      callback: function(data) {
        console.log('Payment successful:', data);
        setPaymentSuccess(true);
      },
      onclose: function() {
        console.log('Payment window closed');
      }
    };

    // In production: FlutterwaveCheckout(flutterwaveConfig);
    processPayment(); // For demo
  };

  const handlePayment = () => {
    if (paymentMethod === 'paystack') {
      initializePaystackPayment();
    } else {
      initializeFlutterwavePayment();
    }
  };

  if (paymentSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-xl p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="text-center py-10">
            <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-6" />
            <h3 className="text-3xl font-semibold text-green-700 mb-4">Payment Successful!</h3>
            <p className="text-lg text-gray-600">Thank you for your purchase. Your order is being processed.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-teal-500 text-white p-4 rounded-lg">
            <Lock className="h-6 w-6" />
            <span className="text-xl font-bold">Secure Checkout</span>
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2 text-base">
            Complete your purchase securely with our trusted payment partners
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-8">
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h4>
            {cart.map((item) => (
              <div key={item.cartId} className="flex justify-between text-sm mb-2">
                <span>{item.name} ({item.selectedSize}) x{item.quantity}</span>
                <span>₦{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-3 mt-3 font-medium">
              <div className="flex justify-between text-lg">
                <span>Total:</span>
                <span>₦{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div>
            <Label htmlFor="payment-method" className="text-sm font-medium text-gray-700">
              Payment Method
            </Label>
            <Select value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
              <SelectTrigger className="w-full border-gray-300 focus:ring-2 focus:ring-green-500">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="border-gray-200">
                <SelectItem value="paystack" className="hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-800">Paystack</span>
                  </div>
                </SelectItem>
                <SelectItem value="flutterwave" className="hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <span className="text-gray-800">Flutterwave</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer Information */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                First Name
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
              Email
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
        </div>

        <DialogFooter className="mt-8">
          <Button variant="outline" onClick={onClose} className="text-gray-700 border-gray-300 hover:bg-gray-50">
            Cancel
          </Button>
          <Button
            onClick={handlePayment}
            disabled={isProcessing || !customerInfo.email || !customerInfo.firstName}
            className="bg-gradient-to-r from-green-600 to-teal-500 hover:from-green-700 hover:to-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all disabled:opacity-50"
          >
            {isProcessing ? 'Processing...' : `Pay ₦${totalAmount.toFixed(2)}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;