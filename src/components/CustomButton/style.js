import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import colors from "../../common/colors";


const style = (orientation,width) => StyleSheet.create({
    btnContainer :{
        // borderWidth : 1,
        borderRadius :15,
        padding: 15,
        backgroundColor : colors.primaryGreen,
        alignSelf : 'center',
        width : wp(width),
        justifyContent : 'center',
        alignItems : 'center',
        marginVertical : 10
    },
    btnTxt : {
        fontFamily : 'Poppins-Bold',
        fontSize : 20,
        color : colors.white
    },
})
export default style