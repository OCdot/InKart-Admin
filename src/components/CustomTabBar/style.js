import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../common/colors";


const style = orientation => StyleSheet.create({
    container : {
        backgroundColor : colors.primaryGreen,
        paddingVertical : 15,
        height : orientation ? hp('8%') : wp('15%'),
        overflow : 'hidden',
        flexDirection :'row',
        justifyContent : 'space-around',
        alignItems : 'center'
    },
    footerTxt : {
        fontFamily : 'Poppins-Regular',
        fontSize :18,
        color : colors.black,
        // fontWeight : '600'
    },
    icon : {
        height : wp('6%'),
        width : wp('6%'),
        resizeMode : 'contain',
        alignSelf : 'center',
        // marginBottom : -10
    }


})
export default style