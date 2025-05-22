export const endpoints = {
    auth: {
    signup: '/auth/signup',
    login: '/auth/login',
    verifyOTP: '/auth/verify-otp',
    resendOTP:'/auth/resend-verification-otp',
    refreshToken:'/auth/refresh-token',
    getUserProfile: '/user/profile',
    updateUser: '/user/profile'
  },
  products:{
    createProduct:'/products',
    getProducts:'/products',
    searchProducts:'/products/search',
    getProductById:'/products/:productId',
    updateProduct: '/products/:productId',
    deleteProduct: '/products/:productId'
  }
};
