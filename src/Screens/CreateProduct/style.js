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
      padding : 15
    },
    imgIcon : {
        justifyContent : 'center',
        alignItems : 'center',
        marginVertical : 10,
        borderWidth : 1,
        borderColor : colors.primaryGreen,
        padding : 15,
        borderRadius : 15
    },
    head : {
      fontFamily :'Poppins-Bold',
      fontSize : 16,
      color : colors.black
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
    TA: {
      fontFamily: 'Poppins-Bold',
      color: colors.black,
      fontSize: 18,
    },
    optionsContainer : {
      flexDirection : 'row',
      justifyContent : 'space-around',
      // paddingHorizontal :50,
      paddingVertical : 17
      
    },
    optionTxt : {
      fontFamily : 'Poppins-Regular',
      color : colors.black,
      fontSize : 15
    }
  });
export default style;
