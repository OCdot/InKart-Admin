import {Text, TouchableOpacity, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import style from './style';

const CustomButton = props => {
  const {onPress, text,width} =props
  const orientation =UseOrientation()
  const responsiveStyle = style(orientation.orientation,width)

  return (
    <TouchableOpacity onPress={onPress} style ={responsiveStyle.btnContainer}>
      <Text style ={responsiveStyle.btnTxt}>{text}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
