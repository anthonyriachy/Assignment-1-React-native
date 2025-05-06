import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('Error while using AuthContext');
    }
    return context;
};
export {useAuthContext};
