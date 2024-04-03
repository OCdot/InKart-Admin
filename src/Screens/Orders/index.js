import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import CustomTextInput from '../../components/CustomTextInput';
import {useCallback, useLayoutEffect, useState} from 'react';
import style from './style';
import firestore from '@react-native-firebase/firestore';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import EmptyData from '../../components/EmptyData';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import colors from '../../common/colors';
import NavigationBack from '../../common/NaviagtionBack';
import moment from 'moment';

const Orders = () => {
  const [orders, setOrders] = useState();
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  const [searchTxt, setSearchTxt] = useState('');
  const navigation =useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Orders',
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);


  const Header = () => {
    return (
      <CustomTextInput
        onChangeText={text => handleSearch(text)}
        width={'90%'}
        border={true}
        value={searchTxt}
        placeholder="Search Here"
        icon={
          <Image
            style={{height: hp('6%'), width: wp('6%'), resizeMode: 'contain'}}
            source={require('../../assets/images/loupe.png')}
          />
        }
      />
    );
  };

  const handleSearch = async text => {
    setSearchTxt(text);
    await firestore()
      .collection('Orders')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setOrders([]);
          Snackbar.show({
            text: 'No Results Found..!',
            textColor: colors.white,
            backgroundColor: colors.danger,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  const getOrders = async () => {
    // console.warn("GetProducts");
    await firestore()
      .collection('Orders')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Products Found..!',
            textColor: colors.white,
            backgroundColor: colors.danger,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setOrders(objArray);
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, []),
  );

  const dateFormat =time => {
    return moment(new Date(time)).format('DD/MM/YY HH:mm:ss')
  }

  return (
    <FlatList
      style={responsiveStyle.container}
      // contentContainerStyle ={{padding :15 , }}
      data={orders}
      // keyboardShouldPersistTaps
      ListHeaderComponent={() => <Header />}
      showsVerticalScrollIndicator={false}
      extraData={orders}
      ListEmptyComponent={<EmptyData />}
      renderItem={({item, index}) => {
        if (item.username === 'admin') {
          return null;
        } else {
          return (
            <TouchableOpacity onPress={() => navigation.navigate('OrderDetails' , {order : item})} style={responsiveStyle.flatlistContainer}>
              <Text
                style={[
                  responsiveStyle.details,
                  {fontFamily: 'Poppins-Bold', fontSize: 20},
                ]}>
                ID : #{item?.orderId}
              </Text>
              <Text style={[responsiveStyle.details,{fontWeight : '800'}]}>{item?.userName}</Text>
              <Text style={[responsiveStyle.details, {color : colors.lightGreen}]}>Address : {item?.address}</Text>
              <Text style={[responsiveStyle.details,{color : colors.category_4}]}>Ordered On : {dateFormat(item?.created)}</Text>
              <Text style={[responsiveStyle.details,{color : colors.danger}]}>{item?.totalAmount}</Text>
              <Text style={[responsiveStyle.details,{color : colors.category_3}]}>{item?.userEmail}</Text>
              <Text style={responsiveStyle.details}>No.of Items : {item?.cartItems.length}</Text>
            </TouchableOpacity>
          );
        }
      }}
    />
  );
};
export default Orders;
