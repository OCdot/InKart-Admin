import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../common/colors";


const style = orientation => StyleSheet.create({
    container : {
        // marginTop :15,
    },
    topContainer :{
        borderBottomWidth : StyleSheet.hairlineWidth,
        padding :  15,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        // borderWidth : 1,
    },
    avatarContainer :{
        height : wp('20%'),
        width :wp('20%'),
        borderRadius : hp('20%') * 0.5,
        backgroundColor : colors.category_1,
        // borderWidth : 1,
        marginLeft : -10
    },
    name : {
        fontFamily : 'Poppins-Bold',
        fontSize : 20,
        color : colors.black
    },
    mail : {
        fontFamily : 'Poppins-Regular',
        fontSize : 16,
        color : colors.black
    },
    touch :{
        paddingHorizontal :15,
        // marginVertical :5,
        flexDirection  : 'row',
        // justifyContent : 'space-between',
        // alignItems : 'center',
    },
    icon : {
        resizeMode : 'contain',
        height : hp('7%'),
        width: wp('7%'),
        marginRight : 10
    },
    drawerTxt : {
        fontFamily : 'Poppins-Regular',
        color : colors.black,
        fontSize :16
    },

})
export default style