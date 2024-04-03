import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../common/colors';

const style = (orientation, icon, border, width) =>
  StyleSheet.create({
    container: {
      flexDirection: icon ? 'row' : 'column',
      borderWidth: border ? 1 : 0,
      borderColor: colors.primaryGreen,
      // width: wp(width),
      padding: 1,
      marginVertical: 10,
      alignItems: icon ? 'center' : 'baseline',
      borderRadius: 15,
      justifyContent : 'space-between',
      alignSelf: 'center',
      
      paddingHorizontal : 5,
      // flex : 1
    },
  });
export default style;
