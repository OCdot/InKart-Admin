import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../common/colors";

const style = orientation => StyleSheet.create({
    head : {
        fontFamily :'Poppinns-Bold',
        color : colors.black,
        alignSelf : 'center',
        fontSize : 20,
        fontWeight : '700',
        marginBottom : 20
    },
    mainContainer : {
        flex : 1,
    },
    topBg : {
        resizeMode : 'stretch',
        width : wp('100%'),
        height : hp('20%')
    },
    logo : {
        height : hp('20%'),
        resizeMode : 'contain',
        alignSelf : 'center'
    },
    innerContainer : {
        marginTop : -45,
        borderTopLeftRadius : 15,
        borderTopRightRadius : 15,
        backgroundColor : colors.white
    }

})
export default style