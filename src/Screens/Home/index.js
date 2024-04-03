import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore'
import style from './style';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import colors from '../../common/colors';

const Home = () => {
  const navigation = useNavigation();
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  const [orders, setOrders] = useState(0)
  const [users, setUsers] = useState(0)
  const [products, setProducts] = useState(0)
 
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {
        height: heightPercentageToDP('1%'),
      },
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Image
            style={responsiveStyle.logo}
            source={require('../../assets/images/app-drawer.png')}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
  getAllCount()
  }, [])

  const getAllCount = async () =>{
    const productRef = firestore().collection('Product').get()
    const userRef = firestore().collection('Users').get()
    const orderRef = firestore().collection('Orders').get()
    setOrders((await orderRef).size)
    setProducts((await productRef).size)
    setUsers((await userRef).size)
  }
  

  return (
    <ScrollView style={responsiveStyle.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Orders')}
        style={[
          responsiveStyle.innerContainer,
          {backgroundColor: colors.category_1},
        ]}>
        <Image
          style={responsiveStyle.img}
          source={require('../../assets/images/order-fulfillment.png')}
        />
        <View style={responsiveStyle.txtContainer}>
          <Text style={responsiveStyle.txtHead}>{orders}</Text>
          <Text style={responsiveStyle.txt}>Orders</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Products')}
        style={[
          responsiveStyle.innerContainer,
          {backgroundColor: colors.category_2},
        ]}>
        <Image
          style={responsiveStyle.img}
          source={require('../../assets/images/dairy-products.png')}
        />
        <View style={responsiveStyle.txtContainer}>
          <Text style={responsiveStyle.txtHead}>{products}</Text>
          <Text style={responsiveStyle.txt}>Products</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Users')}
        style={[
          responsiveStyle.innerContainer,
          {backgroundColor: colors.category_3},
        ]}>
        <Image
          style={responsiveStyle.img}
          source={require('../../assets/images/man.png')}
        />
        <View style={responsiveStyle.txtContainer}>
          <Text style={responsiveStyle.txtHead}>{users}</Text>
          <Text style={responsiveStyle.txt}>Users</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Home;
