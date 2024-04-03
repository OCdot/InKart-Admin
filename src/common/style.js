import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


const style  = orientation => StyleSheet.create({
    logo :{
        resizeMode : 'contain',
        height : hp('5%'),
        width : wp('15%'),
        marginRight :15,
    },

})
export default style