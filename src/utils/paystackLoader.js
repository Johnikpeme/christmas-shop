// Bulletproof Paystack loader
export const loadPaystack = () => {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) {
      console.log('✅ Paystack already loaded');
      resolve(window.PaystackPop);
      return;
    }

    console.log('🔄 Loading Paystack via multiple methods...');
    
    // Method 1: Check if script exists
    const existingScript = document.querySelector('script[src*="paystack.co"]');
    if (existingScript) {
      console.log('🔍 Existing script found, waiting...');
      const checkInterval = setInterval(() => {
        if (window.PaystackPop) {
          clearInterval(checkInterval);
          resolve(window.PaystackPop);
        }
      }, 100);
      
      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Timeout waiting for existing script'));
      }, 5000);
      return;
    }

    // Method 2: Create and load script
    const script = document.createElement('script');
    script.src = 'https://js.paystack.co/v1/inline.js';
    script.crossOrigin = 'anonymous';
    script.type = 'text/javascript';
    
    script.onload = () => {
      console.log('✅ Script loaded, checking PaystackPop...');
      if (window.PaystackPop) {
        resolve(window.PaystackPop);
      } else {
        reject(new Error('Script loaded but PaystackPop not found'));
      }
    };
    
    script.onerror = (e) => {
      console.error('❌ Script load failed:', e);
      reject(e);
    };
    
    document.head.appendChild(script);
  });
};