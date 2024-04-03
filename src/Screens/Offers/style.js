import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../common/colors';

const style = orientation =>
  StyleSheet.create({
    container: {
      padding: 15,
    },
    img: {
      resizeMode: 'contain',
      height: orientation ? hp('30%') : wp('70%'),
      width: orientation ? wp('90%') : hp('80%'),
      alignSelf: orientation ? 'auto' : 'center',
    },
    offerContainer: {
      flexDirection: 'row',
      alignSelf: 'center',
      alignItems: 'center',
      marginTop: 70,
      //   borderWidth: 1,
      justifyContent: 'space-between',
      width: orientation ? wp('50%') : hp('80%'),
    },
    offer: {
      alignItems: 'center',
      //   borderWidth: 1,
      //   padding: 15,
    },
    offerTxt: {
      fontFamily: 'Poppins-Bold',
      color: colors.primaryGreen,
      fontSize: 25,
    },
    detailsTxt: {
      fontFamily: 'Poppins-Regular',
      color: colors.black,
      fontSize: 14,
    },

    actionSheetContainer: {
      padding: 15,
      // backgroundColor : colors.category_2,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    close: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: 15,
    },
    TA: {
      fontFamily: 'Poppins-Bold',
      color: colors.primaryGreen,
      fontSize: 18,
    },
    optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      // paddingHorizontal :50,
      paddingVertical: 17,
    },
    optionTxt: {
      fontFamily: 'Poppins-Regular',
      color: colors.black,
      fontSize: 15,
    },
    imgIcon: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 10,
      borderWidth: 1,
      borderColor: colors.primaryGreen,
      padding: 15,
      borderRadius: 15,
    },
  });
export default style;
