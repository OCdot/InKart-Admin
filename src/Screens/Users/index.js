import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UseOrientation from '../../common/orientation';
import style from './style';
import {useCallback, useLayoutEffect, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NavigationBack from '../../common/NaviagtionBack';
import Snackbar from 'react-native-snackbar';
import CustomTextInput from '../../components/CustomTextInput';
import colors from '../../common/colors';
import EmptyData from '../../components/EmptyData';

const Users = () => {
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  const navigation = useNavigation();
  const [users, setUsers] = useState();
  const [searchTxt, setSearchTxt] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Home',
      headerStyle: {
        height: hp('8%'),
      },
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  const getUsers = async () => {
    await firestore()
      .collection('Users')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No users Found..!',
            textColor: colors.white,
            backgroundColor: colors.danger,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      getUsers();
    }, []),
  );

  const Header = () => {
    return (
      <CustomTextInput
        onChangeText={text => handleSearch(text)}
        width={'90%'}
        border={true}
        value={searchTxt}
        placeholder="Search Here"
        icon={
          <Image
            style={{height: hp('6%'), width: wp('6%'), resizeMode: 'contain'}}
            source={require('../../assets/images/loupe.png')}
          />
        }
      />
    );
  };

  const handleSearch = async text => {
    setSearchTxt(text);
    await firestore()
      .collection('Users')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setUsers([]);
          Snackbar.show({
            text: 'No Results Found..!',
            textColor: colors.white,
            backgroundColor: colors.danger,
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
          });
          setUsers(objArray);
        }
      });
  };

  const BlockUser = ({data}) => {
    // console.warn(data);
    return (
      <TouchableOpacity
        onPress={() => handleBlockUser(data)}
        style={{
          paddingHorizontal: 5,
          position: 'absolute',
          top: 5,
          right: 15,
          borderWidth: 1,
          borderColor: data?.active ? colors.danger : colors.primaryGreen,
          borderRadius: 5,
        }}>
        <Text
          style={[
            responsiveStyle.details,
            {
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              color: data?.active ? colors.danger : colors.primaryGreen,
            },
          ]}>
          {data?.active ? 'Block' : 'Unblock'}
        </Text>
      </TouchableOpacity>
    );
  };

  const handleBlockUser = async data => {
    try {
      await firestore()
        .collection('Users')
        .doc(data.id)
        .update({
          active: data?.active ? false : true,
        })
        .then(() => {
          const updatedUsers = users.map(obj => {
            if (obj.id === data.id) {
              obj.active = data?.active ? false : true;
            }
            return obj;
          });
          Snackbar.show({
            text: 'Updated',
            backgroundColor: colors.primaryGreen,
            textColor: colors.white,
            duration: Snackbar.LENGTH_SHORT,
          });
          setUsers(updatedUsers);
        });
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <FlatList
      style={responsiveStyle.container}
      // contentContainerStyle ={{padding :15 , }}
      data={users}
      // keyboardShouldPersistTaps
      ListHeaderComponent={() => <Header />}
      showsVerticalScrollIndicator={false}
      extraData={users}
      ListEmptyComponent={<EmptyData />}
      renderItem={({item, index}) => {
        if (item.username === 'admin') {
          return null;
        } else {
          return (
            <View style={responsiveStyle.flatlistContainer}>
              <Image
                style={responsiveStyle.avatar}
                source={
                  item?.profileimage
                    ? {uri: item?.profileimage}
                    : require('../../assets/images/hacker.png')
                }
              />
              <View style={responsiveStyle.detailsContainer}>
                <Text
                  style={[
                    responsiveStyle.details,
                    {fontFamily: 'Poppins-Bold', fontSize: 20},
                  ]}>
                  {item?.username}
                </Text>
                <Text style={responsiveStyle.details}>{item?.mobile}</Text>
                <Text style={responsiveStyle.details}>{item?.email}</Text>
              </View>
              <BlockUser data={item} />
            </View>
          );
        }
      }}
    />
  );
};
export default Users;
