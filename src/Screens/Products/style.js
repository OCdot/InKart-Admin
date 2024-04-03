import { StyleSheet } from "react-native";
import colors from "../../common/colors";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "react-native-responsive-screen";


const style = orientation => StyleSheet.create({
    container : {
        // flex : 1,
        padding : 15,
    },
    flatlistContainer : {
        // flexDirection : 'row',
        justifyContent :'center',
        alignSelf : 'center',
        alignItems :'center',
        marginVertical :6,
        backgroundColor : colors.lightGrey,
        borderRadius : 15,
        alignSelf :'center',
        width : orientation ? wp('45%') : hp('45%'),
        padding : 15,
        marginRight :5,
        borderWidth : 1,
        borderColor : colors.primaryGreen
    },
    image :{
        height : wp('20%'),
        width: wp('20%'),
        resizeMode :'contain',
        borderRadius : wp('20%')*0.5,
       
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