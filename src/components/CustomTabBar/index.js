import {Image, Text, TouchableOpacity, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const CustomTabBar = () => {
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation, active);
  const navigation = useNavigation();
  const [active, setActive] = useState('Home');
  const activeSize = '5%';
  const activeFamily = 'Poppins-Bold';

  const handleNavigation = name =>{
    setActive(name)
    navigation.navigate(name)
  }

  return (
    <View style={responsiveStyle.container}>
      <TouchableOpacity onPress={() => handleNavigation('Home')}>
        <Image
          style={responsiveStyle.icon}
          source={require('../../assets/images/home.png')}
        />
        <Text
          style={[
            responsiveStyle.footerTxt,
            {fontFamily: active === 'Home' ? activeFamily : 'Poppins-Regular'},
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Products')}>
        <Image
          style={responsiveStyle.icon}
          source={require('../../assets/images/gift.png')}
        />
        <Text
          style={[
            responsiveStyle.footerTxt,
            {fontFamily: active === 'Products' ? activeFamily : 'Poppins-Regular'},
          ]}>
          Products
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Orders')}>
        <Image
          style={responsiveStyle.icon}
          source={require('../../assets/images/checkout.png')}
        />
        <Text
          style={[
            responsiveStyle.footerTxt,
            {fontFamily: active === 'Orders' ? activeFamily : 'Poppins-Regular'},
          ]}>
          Orders
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavigation('Profile')}>
        <Image
          style={responsiveStyle.icon}
          source={require('../../assets/images/user.png')}
        />
        <Text
          style={[
            responsiveStyle.footerTxt,
            {fontFamily: active === 'Profile' ? activeFamily : 'Poppins-Regular'},
          ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default CustomTabBar;
