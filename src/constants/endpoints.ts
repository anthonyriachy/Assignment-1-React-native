export const endpoints = {
  auth: {
    signup: '/auth/signup',
    login: '/auth/login',
    verifyOTP: '/auth/verify-otp',
    resendOTP:'/auth/resend-verification-otp',
    refreshToken:'/auth/refresh-token'
  },
  products:{
    getProducts:'/products',
    searchProducts:'/products/search',
    getProductById:'/products/:productId'
  }
};
