import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../common/colors';

const style = orientation =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 5,
    },
    img: {
      resizeMode: 'contain',
      height: hp('30%'),
      width: wp('100%'),
    },
    detailsContainer: {
      backgroundColor: colors.white,
      padding: 15,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      flex: 1,
    },
    name: {
      fontFamily: 'Poppins-Bold',
      color: colors.primaryGreen,
      fontSize: 25,
    },
    detail: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      color: colors.black,
    },
    extraInfoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontFamily: 'Poppins-Regular',
      fontSize: 15,
      color: colors.black,
      fontWeight: '800',
    },
    sectionContainer: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.grey,
      backgroundColor : colors.white
      
    },
    listTxt: {
      fontFamily: 'Popins-Regular',
      color: colors.black_lvl_3,
      marginRight: 15,
      fontSize: 16,
    },
  });
export default style;
