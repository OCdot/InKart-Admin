import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import UseOrientation from '../../common/orientation';
import style from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useCallback, useLayoutEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import NavigationBack from '../../common/NaviagtionBack';
import colors from '../../common/colors';
import firestore from '@react-native-firebase/firestore';
import Snackbar from 'react-native-snackbar';
import ActionSheet from 'react-native-actions-sheet';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import uploadImage from '../../common/store';

const Banner = () => {
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  const navigation = useNavigation();
  const [banners, setBanners] = useState([]);
  const actionSheetRef = useRef(null);
  const [head, setHead] = useState('');
  const [desc, setDesc] = useState('');
  const [uploadUri, setUploadUri] = useState(null);
  const [type, setType] = useState(null);
  const [bannerId, setBannerId] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Banners',
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
        onPress={() => {
          setType('add');
          actionSheetRef.current.show();
        }}>
        <AntDesign size={30} name="plussquareo" color={colors.black} />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      getBanners();
    }, []),
  );

  const getBanners = async () => {
    await firestore()
      .collection('Banners')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Banners Found..!',
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
          setBanners(objArray);
        }
      });
  };

  const handleTouch = async touch => {
    const options = {
      mediaType: 'photo',
    };
    if (touch === 'camera') {
      await launchCamera(options, response => {
        // actionSheetRef.current.hide();
        if (response && response.assets) {
          // console.warn('if');
          //   console.warn('resp',response?.assets[0]?.uri);
          setUploadUri(response?.assets[0]?.uri);
        }
      });
    } else {
      await launchImageLibrary(options, response => {
        // actionSheetRef.current.hide();
        if (response && response.assets) {
          setUploadUri(response.assets[0]?.uri);
        }
      });
    }
  };

  const handleCreate = async () => {
    if (uploadUri && head !== '' && desc !== '') {
      //  console.warn('ok');
      const responseUri = await uploadImage(uploadUri);
      // console.warn('RESPONSE URI',responseUri);
      // console.warn('CATEGORY',category);
      const product = {
        head: head,
        content: desc,
        image: responseUri,
      };
      await firestore()
        .collection('Banners')
        .add(product)
        .then(() => {
          Snackbar.show({
            text: ' SUCCESS...',
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
            fontFamily: 'Poppins-Regular',
          });
          actionSheetRef.current.hide();
          getBanners();
        });
    } else {
      Snackbar.show({
        text: 'Fill Up All The Fields',
        textColor: colors.white,
        backgroundColor: colors.primaryGreen,
        fontFamily: 'Poppins-Regular',
      });
    }
  };

  const handleEdit = async bannerData => {
    setBannerId(bannerData.id);
    // console.warn(bannerData);
    setHead(bannerData.head);
    setDesc(bannerData.content);
    setUploadUri(bannerData.image);
    setType('update');
    actionSheetRef.current.show();
  };

  const handleUpdate = async () => {
    if (bannerId && uploadUri && head !== '' && desc !== '') {
      //  console.warn('ok');
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;
      // console.warn('RESPONSE URI',responseUri);
      // console.warn('CATEGORY',category);
      const product = {
        head: head,
        content: desc,
        image: responseUri,
      };
      await firestore()
        .collection('Banners')
        .doc(bannerId)
        .update(product)
        .then(() => {
          Snackbar.show({
            text: 'Updated SUCCESSFULLY...',
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
            fontFamily: 'Poppins-Regular',
          });
          actionSheetRef.current.hide();
          getBanners();
        });
    } else {
      Snackbar.show({
        text: 'Fill Up All The Fields',
        textColor: colors.white,
        backgroundColor: colors.primaryGreen,
        fontFamily: 'Poppins-Regular',
      });
    }
  };

  const handleDelete = bannerData => {
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
            .collection('Banners')
            .doc(bannerData.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'Banner Deleted SUCCESSFULLY...',
                textColor: colors.white,
                backgroundColor: colors.danger,
                fontFamily: 'Poppins-Regular',
              });
              setHead('');
              setDesc('');
              setUploadUri(null);
              getBanners();
            });
        },
      },
    ]);
  };

  return (
    <View style={responsiveStyle.container}>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.actionSheetContainer}>
          <View style={responsiveStyle.close}>
            <Text style={responsiveStyle.TA}>
              {type === 'add' ? 'Upload Banner' : 'Edit Banner'}
            </Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <AntDesign size={30} name="closecircleo" color={colors.danger} />
            </TouchableOpacity>
          </View>

          <View>
            <CustomTextInput
              width={'100%'}
              value={head}
              border={true}
              placeholder={'Heading'}
              onChangeText={text => setHead(text)}
            />
            <CustomTextInput
              width={'100%'}
              value={desc}
              border={true}
              placeholder={'Description'}
              onChangeText={text => setDesc(text)}
            />

            <TouchableOpacity
              onPress={() => actionSheetRef.current?.show()}
              style={responsiveStyle.imgIcon}>
              <Text style={responsiveStyle.head}> Upload Image</Text>
              {uploadUri ? (
                <View>
                  <TouchableOpacity
                    style={{position: 'absolute', zIndex: 2, right: 0, top: 1}}
                    onPress={() => setUploadUri(null)}>
                    <AntDesign
                      size={30}
                      name="closecircleo"
                      color={colors.danger}
                    />
                  </TouchableOpacity>
                  <Image
                    style={{
                      resizeMode: 'contain',
                      height: hp('20%'),
                      width: wp('30%'),
                    }}
                    source={{uri: uploadUri}}
                  />
                </View>
              ) : (
                <Octicons name="image" size={40} color={colors.black} />
              )}
            </TouchableOpacity>

            <View style={responsiveStyle.optionsContainer}>
              <TouchableOpacity onPress={() => handleTouch('camera')}>
                <AntDesign size={50} name="camerao" color={colors.danger} />
                <Text style={responsiveStyle.optionTxt}>Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleTouch('gallery')}>
                <Feather size={50} name="image" color={colors.danger} />
                <Text style={responsiveStyle.optionTxt}>Gallery</Text>
              </TouchableOpacity>
            </View>

            <CustomButton
              onPress={type === 'add' ? handleCreate : handleUpdate}
              width={'50%'}
              text={type === 'add' ? 'Upload' : 'Update'}
            />
          </View>
        </View>
      </ActionSheet>

      <FlatList
        contentContainerStyle={responsiveStyle.contentContainer}
        showsVerticalScrollIndicator={false}
        data={banners}
        keyExtractor={(item, index) => String(index)}
        renderItem={({item, index}) => {
          return (
            <ImageBackground
              source={{uri: item.image}}
              style={responsiveStyle.banner}>
              <View
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: 30,
                  backgroundColor: colors.secondaryGreen,
                }}>
                <TouchableOpacity
                  style={{zIndex: 2}}
                  onPress={() => handleEdit(item)}>
                  <Feather name="edit" size={25} color={colors.white} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDelete(item)}
                  style={{
                    marginLeft: 10,
                  }}>
                  <AntDesign name="delete" size={25} color={colors.danger} />
                </TouchableOpacity>
              </View>

              <View style={responsiveStyle.detailContainer}>
                <Text style={responsiveStyle.heading}>{item.head}</Text>
                <Text style={responsiveStyle.content}>{item.content}</Text>
              </View>
            </ImageBackground>
          );
        }}
      />
    </View>
  );
};
export default Banner;
