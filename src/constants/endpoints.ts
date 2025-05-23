export const endpoints = {
    auth: {
    signup: '/api/auth/signup',
    login: '/api/auth/login',
    verifyOTP: '/api/auth/verify-otp',
    resendOTP:'/api/auth/resend-verification-otp',
    refreshToken:'/api/auth/refresh-token',
    getUserProfile: '/api/user/profile',
    updateUser: '/api/user/profile',
    forgotPassword: '/api/auth/forgot-password'
  },
  products:{
    createProduct:'/api/products',
    getProducts:'/api/products',
    searchProducts:'/api/products/search',
    getProductById:'/api/products/:productId',
    updateProduct: '/api/products/:productId',
    deleteProduct: '/api/products/:productId'
  }
};
