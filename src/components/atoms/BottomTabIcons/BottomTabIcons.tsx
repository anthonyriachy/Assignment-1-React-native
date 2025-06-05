import { memo, useMemo } from 'react';
import { BottomTabIconsProps } from './BottomTabIcons.type';
import HomeIcon from '../../../assets/icons/HomeIcon.svg';
import HomeSelected from '../../../assets/icons/HomeSelected.svg';
import BottomTabSearch from '../../../assets/icons/BottomTabSearch.svg';
import Profile from '../../../assets/icons/ProfileFooter.svg';
import ProfileSelected from '../../../assets/icons/SmallProfileSelected.svg';
import SellIcon from '../../../assets/icons/plus-circle-fill-svgrepo-com.svg';
import CartIcon from '../../../assets/icons/shopping-cart-outline-svgrepo-com (2).svg';

// Memoized icon components
const MemoizedHomeIcon = memo(HomeIcon);
const MemoizedHomeSelected = memo(HomeSelected);
const MemoizedBottomTabSearch = memo(BottomTabSearch);
const MemoizedProfile = memo(Profile);
const MemoizedProfileSelected = memo(ProfileSelected);
const MemoizedSellIcon = memo(SellIcon);
const MemoizedCartIcon = memo(CartIcon);

export const BottomTabIcons = memo(({ name, selected, style }: BottomTabIconsProps) => {
    const iconProps = useMemo(() => ({ width: 25, height: 25, style }), [style]);
    
    switch (name.toLowerCase()) {
        case 'home':
            return selected ? <MemoizedHomeSelected {...iconProps} /> : <MemoizedHomeIcon {...iconProps} />;
        case 'sell':
            return selected ? <MemoizedSellIcon width={50} height={50} /> : <MemoizedSellIcon width={50} height={50} />;
        case 'profile':
            return selected ? <MemoizedProfileSelected {...iconProps} /> : <MemoizedProfile {...iconProps} />;
        case 'search':
            return selected ? <MemoizedBottomTabSearch {...iconProps} /> : <MemoizedBottomTabSearch {...iconProps} />;
        case 'cart':
            return selected ? <MemoizedCartIcon {...iconProps} /> : <MemoizedCartIcon {...iconProps} />;
        default:
            return selected ? <MemoizedHomeSelected {...iconProps} /> : <MemoizedHomeIcon {...iconProps} />;
    }
});
