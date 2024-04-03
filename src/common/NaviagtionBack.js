import { useNavigation } from "@react-navigation/native"
import UseOrientation from "./orientation"
import style from "./style"
import { Image, TouchableOpacity } from "react-native"

const NavigationBack = () =>{
    const orientation = UseOrientation()
    const responsiveStyle = style(orientation.orientation)
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={responsiveStyle.logo}
            source={require('../assets/images/back_arrow.png')}
          />
        </TouchableOpacity>
    )
}
export default NavigationBack