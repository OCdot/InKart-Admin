import {StyleSheet} from 'react-native';
import colors from '../../common/colors';

const style = orientation =>
  StyleSheet.create({
    listTxt: {
      fontFamily: 'Poppins-Bold',
      color: colors.black_lvl_3,
      // marginRight: 15,
      fontSize: 14,
    },
    sectionContainer: {
      paddingVertical: 10,
      borderWidth: 1,
      borderColor: colors.primaryGreen,
      backgroundColor: colors.white,
      borderRadius : 15,
      // justifyContent :'center',
      // alignItems : 'center',
      paddingHorizontal : 15
    },
    renderHeader : {
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'space-between'
    },
    listItem : {
      fontFamily: 'Poppins-Regular',
      color: colors.black_lvl_3,
      // marginRight: 15,
      fontSize: 14,
    }
  });
export default style;
