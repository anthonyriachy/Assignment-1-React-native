declare module 'axios' {
  export interface AxiosRequestConfig {
    isAuth?: boolean;
  }
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
  