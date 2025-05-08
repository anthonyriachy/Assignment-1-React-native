import { BottomTabIconsProps } from './BottomTabIcons.type';
import HomeIcon from '../../../assets/icons/HomeIcon.svg';
import HomeSelected from '../../../assets/icons/HomeSelected.svg';
import BottomTabSearch from '../../../assets/icons/BottomTabSearch.svg';
import BottomTabSeacrch from '../../../assets/icons/SearchActive.svg'
import Profile from '../../../assets/icons/ProfileFooter.svg';
import ProfileSelected from '../../../assets/icons/SmallProfileSelected.svg';
export function BottomTabIcons({ name, selected }: BottomTabIconsProps) {
    switch (name.toLowerCase()) {
        case 'home':
            return selected ? <HomeSelected /> : <HomeIcon />;
        case 'search':
            return selected ? <BottomTabSearch /> : <BottomTabSearch />;
        case 'profile':
            return selected ? <ProfileSelected /> : <Profile />;
        case 'search':
            return selected ? <BottomTabSearch /> : <BottomTabSearch />;
        default:
            return selected ? <HomeSelected /> : <HomeIcon />;
    }
}
