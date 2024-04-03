import {Image, TextInput, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import style from './style';
import colors from '../../common/colors';
import {widthPercentageToDP as wp , heightPercentageToDP as  hp} from 'react-native-responsive-screen';

const CustomTextInput = props => {
  const {
    placeholder,
    value,
    onChangeText,
    icon,
    border,
    width,
    secureTxtEntry,
    multiline,
  } = props;
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation, icon, border, width);

  return (
    <View style={responsiveStyle.container}>
      <TextInput
        selectionColor={colors.primaryGreen}
        placeholderTextColor={colors.black_lvl_2}
        style={{
          color: colors.black,
          fontFamily: 'Poppins-Regular',
          paddingHorizontal: 5,
          width: wp('83%'),
          // borderWidth: 1,
          // alignSelf: 'center',
          height : multiline ? hp ('15%') : 'auto'
        }}
        secureTextEntry={secureTxtEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline ={multiline}
      />
      {icon ? icon : null}
    </View>
  );
};
export default CustomTextInput;
