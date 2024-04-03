import {useNavigation, useRoute} from '@react-navigation/native';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import ActionSheet from 'react-native-actions-sheet';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationBack from '../../common/NaviagtionBack';
import style from './style';
import UseOrientation from '../../common/orientation';
import colors from '../../common/colors';
import CustomButton from '../../components/CustomButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CustomTextInput from '../../components/CustomTextInput';
import Snackbar from 'react-native-snackbar';
import CustomDropDown from '../../components/CustomDropDown';

const OrderDetails = () => {
  const orientation = UseOrientation();
  const navigation = useNavigation();
  const route = useRoute();
  const responsiveStyle = style(orientation.orientation);
  const order = route.params.order;
  const actionSheetRef = useRef(null);
  const [orderStatus, setOrderStatus] = useState('');
  const [status, setStatus] = useState('');
  // console.warn(order);

  useEffect(() => {
    if (order) {
      setOrderStatus(order?.orderStatus);
    }
  }, [order]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Order Details',
      headerStyle: {
        height: hp('8%'),
      },
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  const handleUpdateOrder = async () => {
    try {
      if (order.id && status !== '') {
        await firestore()
          .collection('Orders')
          .doc(order.id)
          .update({
            orderStatus: status,
          })
          .then(() => {
            actionSheetRef.current?.hide();
            setOrderStatus(status);
            setTimeout(() => {
              Snackbar.show({
                text: 'Status updated Successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor: colors.primaryGreen,
                textColor: colors.white,
                fontFamily: 'Poppins-Regular',
              });
            }, 2000);
          });
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const statusData = [
    {name : 'Ordered'},
    {name : 'InProgress'},
    {name : 'OrderPacked'},
    {name : 'Order Shipped'},
    {name : 'Out of Delivery'},
    {name : 'Delivered'},
    {name : 'Returned'},
    {name : 'Order Failed'},
  ];

  return (
    <View>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.actionSheetContainer}>
          <View style={responsiveStyle.close}>
            <Text style={responsiveStyle.TA}>Update Orders</Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <AntDesign size={30} name="closecircleo" color={colors.danger} />
            </TouchableOpacity>
          </View>

          <View>
            <CustomDropDown
              data={statusData}
              setData={text => setStatus(text)}
            />
            <CustomButton
              onPress={handleUpdateOrder}
              width={'50%'}
              text={'Update'}
            />
          </View>
        </View>
      </ActionSheet>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={responsiveStyle.scrollViewContainer}>
        <View style={responsiveStyle.innerContainer}>
          <FontAwesome5 name="box" size={35} color={colors.white} />
          <View style={responsiveStyle.orderContainer}>
            <Text style={responsiveStyle.idTxt}>
              Order Id : {order.orderId}{' '}
            </Text>
            <Text style={responsiveStyle.statusTxt}>{orderStatus}</Text>
          </View>
        </View>

        <View style={{marginVertical: 10}}>
          <Text style={responsiveStyle.item}>Items</Text>
          {order?.cartItems &&
            order.cartItems.map((ele, index) => {
              return (
                <View style={responsiveStyle.cartContainer} key={index}>
                  <View style={responsiveStyle.qtyView}>
                    <Text style={responsiveStyle.qty}>{ele.qty}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                    }}>
                    <FontAwesome5
                      name="star-of-life"
                      size={20}
                      color={colors.black_lvl_3}
                    />
                  </View>
                  <View style={responsiveStyle.cartDetailsView}>
                    <Text style={responsiveStyle.itemName}>{ele.name}</Text>
                    <Text style={responsiveStyle.itemDetail}>{ele.detail}</Text>
                  </View>
                  <Text style={responsiveStyle.price}> ₹ {ele.price}</Text>
                </View>
              );
            })}
        </View>

        <View style={responsiveStyle.paymentContainer}>
          <Text style={responsiveStyle.item}>Payment Details</Text>
          <View style={responsiveStyle.paymentInnerContainer}>
            <View style={responsiveStyle.leftView}>
              <Text style={responsiveStyle.paymentDetails}>Bag Total</Text>
              <Text style={responsiveStyle.paymentDetails}>
                Coupon Discount
              </Text>
              <Text style={responsiveStyle.paymentDetails}>Delivery</Text>
            </View>
            <View style={responsiveStyle.rightView}>
              <Text style={responsiveStyle.paymentDetails}>₹ 499</Text>
              <Text style={responsiveStyle.coupon}>Apply Coupon</Text>
              <Text style={responsiveStyle.paymentDetails}>100</Text>
            </View>
          </View>
          <View style={responsiveStyle.TAcontainer}>
            <Text style={responsiveStyle.TA}>Total Amount</Text>
            <Text style={responsiveStyle.amount}>₹ {order.totalAmount}</Text>
          </View>
        </View>

        <View>
          <Text style={responsiveStyle.item}>Address</Text>
          <Text style={responsiveStyle.itemDetail}>OC</Text>
          <Text style={responsiveStyle.itemDetail}>House Name, LandMark</Text>
          <Text style={responsiveStyle.itemDetail}>Pin : 908765</Text>
        </View>
        <View>
          <Text style={responsiveStyle.item}>Payment Methode</Text>
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <FontAwesome5 name="credit-card" size={28} color={colors.black} />
            <View style={responsiveStyle.cardDetailsView}>
              <Text style={responsiveStyle.cardDetails}>
                **** **** **** 9812
              </Text>
              <Text style={responsiveStyle.cardDetails}>
                {order.paymentMethode}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={(StyleSheet.absoluteFillObject, {bottom: 90})}>
        <CustomButton
          width={'90%'}
          text={'Update Status'}
          onPress={() => actionSheetRef.current?.show()}
        />
      </View>
    </View>
  );
};
export default OrderDetails;
