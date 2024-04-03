import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";


const style = orientation =>StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center'
    },
    logo : {
        height : hp('20%'),
        resizeMode : 'contain',
        alignSelf : 'center'
    },

})
export default style