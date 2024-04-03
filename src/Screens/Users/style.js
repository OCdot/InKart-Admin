import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp ,widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../common/colors";


const style = orientation => StyleSheet.create({
    container : {
        // flex : 1,
        padding : 15,
    },
    flatlistContainer : {
        flexDirection : 'row',
        justifyContent :'flex-start',
        alignItems : 'center',
        marginVertical :6,
        backgroundColor : colors.lightGrey,
        borderRadius : 15,
        alignSelf :'center',
        width : orientation ? wp('95%') : hp('95%'),
        padding : 15
        
    },
    avatar :{
        height : wp('20%'),
        width: wp('20%'),
        resizeMode :'contain',
        borderRadius : wp('20%')*0.5
    },
    details : {
        fontFamily : 'Poppins-Regular',
        color : colors.black
    },
    detailsContainer : {
        paddingLeft : 10
    },



})
export default style