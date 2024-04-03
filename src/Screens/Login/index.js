import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import style from './style';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import {useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {validateEmail} from '../../common/validation';
import colors from '../../common/colors';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions';

const Login = () => {
  const orinentation = UseOrientation();
  const responsiveStyle = style(orinentation.orientation);
  const [secureTxtEntry, setSecureTxtEntry] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()

  const handleLogin = async () => {
    if (email.trim() === 'admin@gmail.com' && password.trim() === '123') {
      await firestore()
        .collection('Users')
        .where('email', '==', email.trim().toLowerCase())
        .get()
        .then(async snapshot => {
          if (!snapshot.empty) {
            snapshot.forEach(documentSnapshot => {
              

              const respData = documentSnapshot.data();
              

              if (password.trim() === respData.password) {
                // console.warn(documentSnapshot.id);
                dispatch(login({userId : documentSnapshot.id}))
                Snackbar.show({
                  text: ' Login SUCCESS !!! ',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: colors.primaryGreen,
                  textColor: colors.white_lvl_2,
                });
                // navigation.navigate('MyDrawer');
              } else {
                Snackbar.show({
                  text: ' Wrong Password !!! ',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: colors.danger,
                  textColor: colors.white_lvl_2,
                });
              }
            });
          }
        })
        .catch(err => {
          console.warn(err);
        });
    } else {
      Snackbar.show({
        text: "Wrong Credentials..!!",
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: colors.danger,
        textColor: colors.white_lvl_2,
      });
    }
  };

  const handleSecureTxtEntry = () => {
    setSecureTxtEntry(!secureTxtEntry);
  };

  return (
    <View style={responsiveStyle.mainContainer}>
      <Image
        style={responsiveStyle.topBg}
        source={require('../../assets/images/topBg.jpg')}
      />
      <ScrollView style={responsiveStyle.innerContainer}>
        <Image
          style={responsiveStyle.logo}
          source={require('../../assets/images/logo-removebg-preview.png')}
        />
        <Text style={responsiveStyle.head}>Admin Login</Text>

        <CustomTextInput
        secureTxtEntry = {false}
          onChangeText={text => setEmail(text)}
          width={'90%'}
          border={true}
          placeholder="e-mail"
          icon={
            <Image
              style={{height: hp('6%'), width: wp('6%'), resizeMode: 'contain'}}
              source={require('../../assets/images/email.png')}
            />
          }
          
        />
        <CustomTextInput
          secureTxtEntry={secureTxtEntry}
          onChangeText={text => setPassword(text)}
          width={'90%'}
          border={true}
          placeholder="Password"
          icon={
            <TouchableOpacity onPress={handleSecureTxtEntry}>
              <Image
                style={{
                  height: hp('6%'),
                  width: wp('6%'),
                  resizeMode: 'contain',
                }}
                source={
                  secureTxtEntry
                    ? require('../../assets/images/hide.png')
                    : require('../../assets/images/view.png')
                }
              />
            </TouchableOpacity>
          }
        />
        <CustomButton width="80%" text="Login" onPress={handleLogin} />
      </ScrollView>
    </View>
  );
};
export default Login;
