import { Text, View } from "react-native"
import colors from "../../common/colors"

const EmptyData =() =>{
    return(
        <View>
            <Text style ={{fontFamily : 'Poppins-Regular', fontSize : 20, color : colors.danger}}>No Results Found...!</Text>
        </View>
    )
}
export default EmptyData