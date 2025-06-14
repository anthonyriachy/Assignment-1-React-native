import { endpoints } from '../../constants/endpoints';
import axiosInstance from '../../lib/axiosInstance/axiosInstance';
import { LoginSchemaType } from '../../schemas/Login.schema';
import { LoginResponse, resendOTPType, SignUpResponse, VerifyOTPType, VerifyOTPResponse, RefreshTokenResponse, UserResponse, EditProfileResponse, ForgotPasswordResponse } from './UserService.type';
import { handleError } from '../../lib/handleError';

export class UserService {
    static async signup(user: FormData): Promise<SignUpResponse> {
        try {
            const { data } = await axiosInstance.post(endpoints.auth.signup, user, {
                headers: { 'Content-Type': 'multipart/form-data' },
                isAuth: false,
            });
            return data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }
    static async login(user: LoginSchemaType): Promise<LoginResponse> {
        try {
            const { data } = await axiosInstance.post(endpoints.auth.login, user, { isAuth: false });
            return data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }

    static async verifyOTP(verifyBody: VerifyOTPType): Promise<VerifyOTPResponse> {
        try {
            const { data } = await axiosInstance.post(endpoints.auth.verifyOTP, verifyBody, { isAuth: false });
            return data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }

    static async resendOTP(email: resendOTPType): Promise<SignUpResponse> {
        try {
            const { data } = await axiosInstance.post(endpoints.auth.verifyOTP, email, { isAuth: false });
            return data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }

    static async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        try {
            const { data } = await axiosInstance.post(endpoints.auth.refreshToken, { refreshToken }, { isAuth: false });
            return data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }
    
    static async getUserProfile(): Promise<UserResponse> {
        try {
            const { data } = await axiosInstance.get(endpoints.auth.getUserProfile);
            return data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }

    static async updateUser(user: FormData): Promise<EditProfileResponse> {
        try {
            const res = await axiosInstance.put(endpoints.auth.updateUser, user, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            
            return res.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }

    static async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
        try {
            const res = await axiosInstance.post(endpoints.auth.forgotPassword, { email }, { isAuth: false });
            
            return res.data;
        } catch (error) {
            throw new Error(handleError(error));
        }
    }
}
