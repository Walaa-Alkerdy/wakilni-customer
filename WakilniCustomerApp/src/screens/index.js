import LoginContainer from '../containers/auth/LoginContainer';
// import LandingScreen from '../containers/landing/Landing';
import { Route_Login, Route_Register, Route_Landing } from '../constants/routes';
import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';

/**
 * All screens are imported from their containers and not from sub folders of 'Screens' folder
 */
export default (store, Provider) => {
    // Navigation.registerComponent(Route_Landing, () => LandingScreen, store, Provider);
    Navigation.registerComponent(Route_Login, () => LoginContainer, store, Provider);
    // Navigation.registerComponent(Route_Register, () => Registration, store, Provider); 
}