import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp , widthPercentageToDP as wp } from "react-native-responsive-screen";
import colors from "../../common/colors";


const style = orientation => StyleSheet.create({
    logo :{
        resizeMode : 'contain',
        height : hp('5%'),
        width : wp('10%'),
        // marginLeft :15,
    },
    container : {
        flex :1,
        padding :10
    },
    innerContainer : {
        width : wp('90%'),
        borderRadius :15,
        padding: 15,
        backgroundColor : colors.category_4,
        height : hp('18%'),
        alignSelf : 'center',
        marginVertical : 8,
        alignItems :'center',
        justifyContent :'flex-start',
        flexDirection :'row'
    },
    img : {
        resizeMode : 'contain',
        height : hp('20%'),
        width : wp('20%')
    },
    txtContainer :{
        marginLeft : 15,
    },
    txtHead : {
        color : colors.black,
        fontFamily : 'Poppins-Bold',
        fontSize : 28
    },
    txt : {
        color : colors.black,
        fontFamily : 'Poppins-Regular',
        fontSize :16
    },
})
export default style