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
    contentContainer: {
      // alignSelf : 'center',
      // alignItems : 'center',
      // padding: 15,
      // borderRadius : 15,
    },
    banner: {
      height: orientation ? hp('30%') : wp('60%'),
      width: orientation ? wp('100%') : hp('80%'),
      resizeMode: 'contain',
      alignSelf: orientation ? 'auto' : 'center',
      marginTop: 10,
      borderRadius: 15,
      // borderTopLeftRadius : 20
    },
    detailContainer: {
      padding: 20,
    },
    heading: {
      fontFamily: 'Poppins-Bold',
      color: colors.white,
      fontSize: 28,
    },
    content: {
      fontFamily: 'Poppins-Regular',
      fontSize: 19,
      color: colors.white,
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
    head: {
      fontFamily: 'Poppins-Bold',
      fontSize: 16,
      color: colors.black,
    },
  });
export default style;
