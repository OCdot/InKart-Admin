import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import style from './style';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {signout} from '../../store/actions';

const CustomDrawer = () => {
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSignOut = () => {
    dispatch(signout());
  };

  const handleTouch = item => {
    if (item.navigation) {
      navigation.navigate(item.navigation);
    } else {
      item.onPress();
    }
  };

  const contents = [
    {
      itemId: 0,
      itemName: 'Home',
      navigation: 'Footer',
      icon: require('../../assets/images/home.png'),
    },
    {
      itemId: 1,
      itemName: 'Products',
      navigation: 'Footer',
      icon: require('../../assets/images/gift.png'),
    },
    {
      itemId: 2,
      itemName: 'Categories',
      navigation: 'Footer',
      icon: require('../../assets/images/categories.png'),
    },
    {
      itemId: 3,
      itemName: 'Orders',
      navigation: 'Footer',
      icon: require('../../assets/images/checkout.png'),
    },
    {
      itemId: 4,
      itemName: 'Reviews',
      navigation: 'Footer',
      icon: require('../../assets/images/favourite.png'),
    },
    {
      itemId: 5,
      itemName: 'Banners',
      navigation: 'Banner',
      icon: require('../../assets/images/advertising.png'),
    },
    {
      itemId: 6,
      itemName: 'Offers',
      navigation: 'Offers',
      icon: require('../../assets/images/sale.png'),
    },
    {
      itemId: 7,
      itemName: 'Logout',
      onPress: handleSignOut,
      icon: require('../../assets/images/logout.png'),
    },
  ];

  return (
    <ScrollView>
      <View style={responsiveStyle.topContainer}>
        <View style ={responsiveStyle.avatarContainer}></View>
        <View>
          <Text style ={responsiveStyle.name}>Admin</Text>
          <Text style = {responsiveStyle.mail}>admin@gmail.com</Text>
        </View>
      </View>
      <View style={responsiveStyle.container}>
        {contents.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleTouch(item)}
              style={responsiveStyle.touch}
              key={String(item.itemId)}>
              <View
                style={{
                  marginLeft: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                }}>
                <Image style={responsiveStyle.icon} source={item.icon} />
                <Text style={responsiveStyle.drawerTxt}>{item.itemName}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      
    </ScrollView>
  );
};
export default CustomDrawer;
