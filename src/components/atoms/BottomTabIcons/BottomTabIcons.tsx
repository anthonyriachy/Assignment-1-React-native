import { BottomTabIconsProps } from './BottomTabIcons.type';
import HomeIcon from '../../../assets/icons/HomeIcon.svg';
import HomeSelected from '../../../assets/icons/HomeSelected.svg';
import BottomTabSearch from '../../../assets/icons/BottomTabSearch.svg';
import Heart from '../../../assets/icons/Heart.svg';
import Notifications from '../../../assets/icons/Notifications.svg';

export function BottomTabIcons({ name, selected }: BottomTabIconsProps) {
    switch (name.toLowerCase()) {
        case 'home':
            return selected ? <HomeSelected /> : <HomeIcon />;
        case 'search':
            return selected ? <BottomTabSearch /> : <BottomTabSearch />;
        case 'favorites':
            return selected ? <Heart /> : <Heart />;
        case 'notifications':
            return selected ? <Notifications /> : <Notifications />;
        default:
            return selected ? <HomeSelected /> : <HomeIcon />;
    }
}
