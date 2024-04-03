import { Image, Text, View } from "react-native"
import UseOrientation from "../../common/orientation"
import style from "./style"

const Splash =() =>{
    const orientation = UseOrientation()
    const responsiveStyle = style(orientation.orientation)
    return (
        <View style ={responsiveStyle.container}>
            <Image
          style={responsiveStyle.logo}
          source={require('../../assets/images/logo-removebg-preview.png')}
        />
        </View>
    )
}
export default Splash