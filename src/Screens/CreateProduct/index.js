import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import UseOrientation from '../../common/orientation';
import style from './style';
import CustomButton from '../../components/CustomButton';
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import NavigationBack from '../../common/NaviagtionBack';
import Snackbar from 'react-native-snackbar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import CustomTextInput from '../../components/CustomTextInput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import ActionSheet from 'react-native-actions-sheet';
import CustomDropDown from '../../components/CustomDropDown';
import Octicons from 'react-native-vector-icons/Octicons';
import colors from '../../common/colors';
import uploadImage from '../../common/store';

const CreateProduct = () => {
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const actionSheetRef = useRef(null);
  const [uploadUri, setUploadUri] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState(null);
  const [qty, setQty] = useState(0);
  const route = useRoute();
  const {type, data} = route.params;
  // console.warn(data)

  useEffect(() => {
    setName(data?.name);
    setDesc(data?.detail);
    setPrice(data?.price);
    // setCategory(data.categoryName)
    setUploadUri(data?.image);
    setQty(data?.qty ?? 1);
  }, [data]);

  useEffect(() => {
   if(category){
    setCategory(category)
   }
  }, [category])
  

  useLayoutEffect(() => {
    navigation.setOptions({
      title: type === 'create' ? 'Add Product' : 'Edit Product',
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
      headerLeft: () => <NavigationBack />,
    });
  }, [navigation]);

  const getCategories = async () => {
    // console.warn("GetProducts");
    await firestore()
      .collection('Categories')
      .get()
      .then(snapshot => {
        if (!snapshot.empty) {
          const objArray = [];
          snapshot?.docs.forEach(document => {
            const result = {id: document.id, ...document?.data()};
            objArray.push(result);
            // console.warn(objArray);
          });
          setCategories(objArray);
          setCategoryWithObj(objArray);
        }
      });
  };

  const setCategoryWithObj = objArray => {
    if (data && data.categoryId) {
      // console.warn('CAT ID',data.categoryId);
      const result = objArray.find(ele => ele.id === data.categoryId);
      setCategory(result);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getCategories();
    }, []),
  );

  const handleTouch = async touch => {
    const options = {
      mediaType: 'photo',
    };
    if (touch === 'camera') {
      await launchCamera(options, response => {
        actionSheetRef.current.hide();
        if (response && response.assets) {
          // console.warn('if');
          // console.warn('resp',response?.assets[0]?.uri);
          setUploadUri(response?.assets[0]?.uri);
        }
      });
    } else {
      await launchImageLibrary(options, response => {
        actionSheetRef.current.hide();
        if (response && response.assets) {
          setUploadUri(response.assets[0]?.uri);
        }
      });
    }
  };

  const handleUpdateProduct = async () => {
    if (
      uploadUri &&
      name !== '' &&
      desc !== '' &&
      category &&
      qty !== 0 &&
      price !== ''
    ) {
      const responseUri = uploadUri.includes('file://')
        ? await uploadImage(uploadUri)
        : uploadUri;
      const product = {
        updated: Date.now(),
        name: name,
        detail: desc,
        // categoryId: category.id,
        // categoryName: category.name,
        price: price,
        quantity: qty,
        image: responseUri,
      };
      await firestore()
        .collection('Product')
        .doc(data.id)
        .update(product)
        .then(() => {
          Snackbar.show({
            text: 'Product Updated SUCCESSFULLY...',
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
            fontFamily: 'Poppins-Regular',
          });
          navigation.goBack();
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

  const handleCreateProduct = async () => {
    // console.warn('ok');
    // console.warn('UPLOAD URI',uploadUri);
    console.warn(category, name, price, qty, desc);
    if (
      uploadUri &&
      name !== '' &&
      desc !== '' &&
      category &&
      qty !== 0 &&
      price !== ''
    ) {
      //  console.warn('ok');
      const responseUri = await uploadImage(uploadUri);
      // console.warn('RESPONSE URI',responseUri);
      // console.warn('CATEGORY',category);
      const product = {
        created: Date.now(),
        updated: Date.now(),
        name: name,
        detail: desc,
        // categoryId: category.id,
        // categoryName: category.name,
        price: price,
        quantity: qty,
        image: responseUri,
      };
      await firestore()
        .collection('Product')
        .add(product)
        .then(() => {
          Snackbar.show({
            text: ' SUCCESS...',
            textColor: colors.white,
            backgroundColor: colors.primaryGreen,
            fontFamily: 'Poppins-Regular',
          });
          navigation.goBack();
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={responsiveStyle.container}>
      <ActionSheet ref={actionSheetRef}>
        <View style={responsiveStyle.actionSheetContainer}>
          <View style={responsiveStyle.close}>
            <Text style={responsiveStyle.TA}>Select Option</Text>
            <TouchableOpacity onPress={() => actionSheetRef.current?.hide()}>
              <AntDesign size={30} name="closecircleo" color={colors.danger} />
            </TouchableOpacity>
          </View>

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
        </View>
      </ActionSheet>

      <CustomTextInput
        // secureTxtEntry={false}
        onChangeText={text => setName(text)}
        value={name}
        width={'90%'}
        border={true}
        placeholder="Name"
      />
      <CustomTextInput
        // secureTxtEntry={false}
        onChangeText={text => setDesc(text)}
        value={desc}
        width={'90%'}
        border={true}
        placeholder="Description"
        multiline={true}
      />
      <CustomTextInput
        // secureTxtEntry={false}
        onChangeText={text => setPrice(text)}
        value={price}
        width={'90%'}
        border={true}
        placeholder="Price"
      />
      <CustomTextInput
        // secureTxtEntry={false}
        onChangeText={text => setQty(text)}
        value={qty}
        width={'90%'}
        border={true}
        placeholder="Quantity"
      />
      {categories.length > 0 ? (
        <View style={{paddingHorizontal: 10}}>
          <CustomDropDown prevData ={category} data={categories} setData={obj => setCategory(obj)} />
        </View>
      ) : null}

      <TouchableOpacity
        onPress={() => actionSheetRef.current?.show()}
        style={responsiveStyle.imgIcon}>
        <Text style={responsiveStyle.head}> Upload Image</Text>
        {uploadUri ? (
          <View>
            <TouchableOpacity
              style={{position: 'absolute', zIndex: 2, right: 0, top: 1}}
              onPress={() => setUploadUri(null)}>
              <AntDesign size={30} name="closecircleo" color={colors.danger} />
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

      <CustomButton
        width={'90%'}
        text={type == 'create' ? 'Add Product' : 'Update'}
        onPress={type == 'create' ? handleCreateProduct : handleUpdateProduct}
      />
    </ScrollView>
  );
};
export default CreateProduct;
