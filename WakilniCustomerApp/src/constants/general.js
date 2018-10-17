
import { Platform } from 'react-native';

export const Colors = {
    STATUS_BAR_COLOR: '#383838',
    NAVIGATION_BAR_COLOR: '#3f3f3f',
    MAIN_COLOR: '#464646',
    SUB_COLOR: '#fec222',
    BADGE_COLOR: '#ff5050',
    TEXT_COLOR: '#d5d5d5',
}

export const Fonts = {
    //Open Sans
    MAIN_FONT: Platform.OS === 'ios' ? 'OpenSans-Bold' : 'openSansBold',
    SUB_FONT: Platform.OS === 'ios' ? 'OpenSans-Semibold': 'openSansSemibold'
}
