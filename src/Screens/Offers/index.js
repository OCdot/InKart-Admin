import {
  Alert,
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import UseOrientation from '../../common/orientation';
import style from './style';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import NavigationBack from '../../common/NaviagtionBack';
import Snackbar from 'react-native-snackbar';
import colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';

const Offers = () => {
  const orientation = UseOrientation();
  const navigation = useNavigation();
  const responsiveStyle = style(orientation.orientation);
  const [offers, setOffers] = useState([]);
  const [offerCode, setOfferCode] = useState('');
  const [offer, setOffer] = useState('');
  const [head, setHead] = useState('');
  const [subHead, setSubHead] = useState('');
  const [type, setType] = useState(null);
  const [offerId, setOfferId] = useState(null);
  const actionSheetRef = useRef(null);

  useFocusEffect(
    useCallback(() => {
      getOffers();
    }, []),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Offers',
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
          actionSheetRef.current.show();
        }}>
        <AntDesign size={30} name="plussquareo" color={colors.black} />
      </TouchableOpacity>
    );
  };

  const getOffers = async () => {
    await firestore()
      .collection('Offers')
      .get()
      .then(snapshot => {
        if (snapshot.empty) {
          Snackbar.show({
            text: 'No Offers Found',
            duration: Snackbar.LENGTH_SHORT,
            fontFamily: 'Poppins-Regular',
            textColor: colors.white,
            backgroundColor: colors.danger,
          });
        } else {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document.data()};
            objArray.push(result);
          });
          setOffers(objArray);
        }
      });
  };
  // console.warn(offers);

  const handleCreate = async () => {
    if (head !== '' && subHead !== '' && offer !== '' && offerCode !== '') {
      const product = {
        head: head,
        subhead: subHead,
        offerCode: offerCode,
        offer: offer,
      };
      await firestore()
        .collection('Offers')
        .add(product)
        .then(() => {
          Snackbar.show({
            text: 'Updated SUCCESSFULLY...',
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
            fontFamily: 'Poppins-Regular',
          });
          actionSheetRef.current.hide();
          getOffers();
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

  const handleEdit = async offerData => {
    // console.warn(subHead);
    actionSheetRef.current.show();
    setOfferId(offerData.id);
    setType('Edit');
    setHead(offerData.head);
    setSubHead(offerData.subhead);
    setOffer(offerData.offer);
    setOfferCode(offerData.offerCode);
  };

  const handleUpdate = async () => {
    if (head !== '' && subHead !== '' && offer !== '' && offerCode !== '') {
      const product = {
        head: head,
        subhead: subHead,
        offerCode: offerCode,
        offer: offer,
      };
      await firestore()
        .collection('Offers')
        .doc(offerId)
        .update(product)
        .then(() => {
          Snackbar.show({
            text: 'Updated SUCCESSFULLY...',
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
            fontFamily: 'Poppins-Regular',
          });
          actionSheetRef.current.hide();
          getOffers();
          setHead('');
          setSubHead('');
          setType(null);
          setOfferCode('');
          setOffer('');
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

  const handleDelete = offerData => {
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
            .collection('Offers')
            .doc(offerData.id)
            .delete()
            .then(() => {
              Snackbar.show({
                text: 'Offer Deleted SUCCESSFULLY...',
                textColor: colors.white,
                backgroundColor: colors.danger,
                fontFamily: 'Poppins-Regular',
              });
              // setHead('');
              // setSubHead('');
              // setUploadUri(null);
              getOffers();
            });
        },
      },
    ]);
  };

  // console.warn(offers);

  return (
    <View style={responsiveStyle.container}>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.actionSheetContainer}>
          <View style={responsiveStyle.close}>
            <Text style={responsiveStyle.TA}>
              {type === 'Edit' ? 'Edit Offer' : 'Add Offer'}
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
              value={subHead}
              border={true}
              placeholder={'Description'}
              onChangeText={text => setSubHead(text)}
            />
            <CustomTextInput
              width={'100%'}
              value={offer}
              border={true}
              placeholder={'Offer Percentage'}
              onChangeText={text => setOffer(text)}
            />
            <CustomTextInput
              width={'100%'}
              value={offerCode}
              border={true}
              placeholder={'Offer Code'}
              onChangeText={text => setOfferCode(text)}
            />

            <CustomButton
              onPress={type === 'Edit' ? handleUpdate : handleCreate}
              width={'50%'}
              text={type === 'Edit' ? 'Edit' : 'Add'}
            />
          </View>
        </View>
      </ActionSheet>

      <FlatList
        data={offers}
        extraData={offers}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                backgroundColor: colors.category_2,
                marginBottom: 20,
                borderRadius: 15,
              }}>
              <ImageBackground
                source={require('../../assets/images/offer-banner.png')}
                style={responsiveStyle.img}>
                <View
                  style={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // paddingRight: 30,
                    backgroundColor: colors.secondaryGreen,
                  }}>
                  <TouchableOpacity
                    style={{zIndex: 2}}
                    onPress={() => handleEdit(item)}>
                    <Feather
                      name="edit"
                      size={25}
                      color={colors.primaryGreen}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleDelete(item)}
                    style={{
                      marginLeft: 10,
                    }}>
                    <AntDesign name="delete" size={25} color={colors.danger} />
                  </TouchableOpacity>
                </View>

                <View style={responsiveStyle.offerContainer}>
                  <View style={responsiveStyle.offer}>
                    <Text style={responsiveStyle.offerTxt}>{item.offer} %</Text>
                  </View>
                  <View>
                    <Text style={responsiveStyle.offerTxt}>{item.head}</Text>
                    <Text style={responsiveStyle.detailsTxt}>
                      {item.subhead}
                    </Text>
                    <View
                      style={{
                        backgroundColor: colors.primaryGreen,
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 5,
                        borderRadius: 15,
                      }}>
                      <Text style={responsiveStyle.detailsTxt}>
                        {item.offerCode}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          );
        }}
      />
    </View>
  );
};
export default Offers;
