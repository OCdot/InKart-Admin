import {Text, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import { useLayoutEffect } from 'react';
import NavigationBack from '../../common/NaviagtionBack';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const orientation = UseOrientation();
  const navigation = useNavigation() 

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};
export default Profile;
