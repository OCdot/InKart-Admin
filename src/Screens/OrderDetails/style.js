import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../common/colors';

const style = orientation =>
  StyleSheet.create({
    scrollViewContainer: {
      padding: 15,
      marginBottom : 50
    },
    innerContainer: {
      backgroundColor: colors.primaryGreen,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderRadius: 15,
      alignItems: 'center',
      padding: 10,
    },
    orderContainer: {
      marginLeft: 15,
    },
    idTxt: {
      fontFamily: 'Poppins-Regular',
      color: colors.white,
      fontSize: 14,
    },
    statusTxt: {
      fontFamily: 'Poppins-Bold',
      color: colors.white,
      fontSize: 18,
    },
    cartContainer: {
      flexDirection: 'row',
      padding: 10,
      justifyContent: 'space-between',
    },
    qtyView: {
      backgroundColor: colors.primaryGreen,
      // paddingHorizontal : 10,
      // paddingVertical : 10,
      borderRadius: 10,
      alignItems: 'center',
      padding: 15,
    },
    qty: {
      fontFamily: 'Poppins-Bold',
      color: colors.white,
      fontSize: 14,
    },
    cartDetailsView: {
      marginLeft: 10,
      width: wp('50%'),
    },
    item: {
      fontFamily: 'Poppins-Bold',
      fontSize: 19,
      color: colors.primaryGreen,
    },
    itemName: {
      fontFamily: 'Poppins-Bold',
      color: colors.black,
      fontSize: 16,
    },
    itemDetail: {
      fontFamily: 'Poppins-Regular',
      color: colors.black_lvl_3,
      fontSize: 14,
    },
    price: {
      fontFamily: 'Poppins-Bold',
      color: colors.black_lvl_3,
      fontSize: 14,
    },
    paymentContainer: {
      marginVertical: 10,
    },
    paymentInnerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 10,
      borderBottomWidth: 1,
      paddingBottom: 5,
    },
    leftView: {
      padding: 5,
      // justifyContent : 'flex-start'
    },
    rightView: {
      padding: 5,
      // justifyContent : 'flex-end',
      alignItems: 'flex-end',
    },
    paymentDetails: {
      fontFamily: 'Poppins-Regular',
      color: colors.black_lvl_3,
      fontSize: 16,
      lineHeight: 40,
    },
    coupon: {
      fontFamily: 'Poppins-Regular',
      color: colors.primaryGreen,
      fontSize: 16,
    },
    TAcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    TA: {
      fontFamily: 'Poppins-Bold',
      color: colors.black,
      fontSize: 18,
    },
    amount: {
      fontFamily: 'Poppins-Regular',
      color: colors.black,
      fontSize: 16,
    },
    cardDetailsView: {
      // padding :5,
      marginLeft: 15,
      // alignItems : 'center'
    },
    cardDetails: {
      fontFamily: 'Poppins-Regular',
      color: colors.black,
      fontSize: 16,
    },
    actionSheetContainer :{
      padding : 15,
      // backgroundColor : colors.category_2,
      borderTopLeftRadius : 15,
      borderTopRightRadius : 15
    },
    close : {
     justifyContent : 'space-between',
     alignItems : 'center',
     flexDirection : 'row'
    },
  });
export default style;
