import { BottomTabIconsProps } from './BottomTabIcons.type';
import HomeIcon from '../../../assets/icons/HomeIcon.svg';
import HomeSelected from '../../../assets/icons/HomeSelected.svg';
import BottomTabSearch from '../../../assets/icons/BottomTabSearch.svg';
import Profile from '../../../assets/icons/ProfileFooter.svg';
import ProfileSelected from '../../../assets/icons/SmallProfileSelected.svg';
import SellIcon from '../../../assets/icons/plus-circle-fill-svgrepo-com.svg';

export function BottomTabIcons({ name, selected, style }: BottomTabIconsProps) {
    const iconProps = { width: 25, height: 25, style };
    
    switch (name.toLowerCase()) {
        case 'home':
            return selected ? <HomeSelected {...iconProps} /> : <HomeIcon {...iconProps} />;
        case 'sell':
            return selected ? <SellIcon width={50} height={50} /> : <SellIcon width={50} height={50} />;
        case 'profile':
            return selected ? <ProfileSelected {...iconProps} /> : <Profile {...iconProps} />;
        case 'search':
            return selected ? <BottomTabSearch {...iconProps} /> : <BottomTabSearch {...iconProps} />;
        default:
            return selected ? <HomeSelected {...iconProps} /> : <HomeIcon {...iconProps} />;
    }
}
