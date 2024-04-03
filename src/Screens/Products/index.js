import {
  Alert,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UseOrientation from '../../common/orientation';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useLayoutEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import colors from '../../common/colors';
import style from './style';
import EmptyData from '../../components/EmptyData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomTextInput from '../../components/CustomTextInput';
import NavigationBack from '../../common/NaviagtionBack';

const Products = () => {
  const [products, setProducts] = useState();
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  const [searchTxt, setSearchTxt] = useState('');
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Products',
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,
    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateProduct', {type: 'create'})}>
        <AntDesign size={30} name="plussquareo" color={colors.black} />
      </TouchableOpacity>
    );
  };

  const getProducts = async () => {
    // console.warn("GetProducts");
    await firestore()
      .collection('Product')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Products Found..!',
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
          setProducts(objArray);
        }
      });
  };

  useFocusEffect(
    useCallback(() => {
      getProducts();
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
      .collection('Product')
      .orderBy('username')
      .startAt(text)
      .endAt(text + '\uf8ff')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          setProducts([]);
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
          setProducts(objArray);
        }
      });
  };

  const handleDelete = async productData => {
    Alert.alert('Confirm Delete', 'Do You Want To DELETE', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await firestore()
            .collection('Product')
            .doc(productData.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'Product Deleted SUCCESSFULLY...',
                textColor: colors.white,
                backgroundColor: colors.danger,
                fontFamily: 'Poppins-Regular',
              });
              getProducts();
            });
        },
      },
    ]);
  };

  const handleEdit = productData => {
    navigation.navigate('CreateProduct', {type: 'edit', data: productData});
  };

  return (
    <FlatList
      style={responsiveStyle.container}
      // contentContainerStyle ={{padding :15 , }}
      data={products}
      // horizontal ={true}
      numColumns={2}
      // keyboardShouldPersistTaps
      ListHeaderComponent={() => <Header />}
      showsVerticalScrollIndicator={false}
      extraData={products}
      contentContainerStyle={{alignSelf: 'center'}}
      ListEmptyComponent={<EmptyData />}
      renderItem={({item, index}) => {
        if (item.username === 'admin') {
          return null;
        } else {
          return (
            <View style={responsiveStyle.flatlistContainer}>
              <View
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{zIndex: 2}}
                  onPress={() => handleEdit(item)}>
                  <Feather name="edit" size={25} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={{
                    marginLeft: 10,
                  }}>
                  <AntDesign name="delete" size={25} color={colors.danger} />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ProductDetails', {product: item})
                }>
                <Image
                  style={responsiveStyle.image}
                  source={
                    item?.image
                      ? {uri: item?.image}
                      : require('../../assets/images/hacker.png')
                  }
                />
              </TouchableOpacity>

              <View style={responsiveStyle.detailsContainer}>
                <Text
                  style={[
                    responsiveStyle.details,
                    {fontFamily: 'Poppins-Bold', fontSize: 20},
                  ]}>
                  {item?.name}
                </Text>
                <Text style={responsiveStyle.details}>{item?.detail}</Text>
                <Text style={[responsiveStyle.details, {fontWeight: '700'}]}>
                  ₹ {item?.price}
                </Text>
              </View>
            </View>
          );
        }
      }}
    />
  );
};
export default Products;
