import {useNavigation, useRoute} from '@react-navigation/native';
import {useLayoutEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import NavigationBack from '../../common/NaviagtionBack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Accordion from 'react-native-collapsible/Accordion';
import UseOrientation from '../../common/orientation';
import style from './style';
import colors from '../../common/colors';

const ProductDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const product = route.params.product;
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  // console.warn(product);

  const [curretSection, setCurretSection] = useState([0]);

  const DetailsArray = [
    {
      title: 'Manufacture Details',
      content: 'Dummy Content.... Dummy Content.... ',
    },
    {
      title: 'Disclaimer',
      content: 'Dummy Content.... Dummy Content.... ',
    },
    {
      title: 'Features & Details',
      content: 'Dummy Content.... Dummy Content.... ',
    },
  ];

  const _renderHeader = section => {
    // console.warn(section);
    return (
      <View style={responsiveStyle.extraInfoContainer}>
        <Text style={responsiveStyle.title}>{section.title}</Text>
        <AntDesign name="down" size={20} color={colors.grey} />
      </View>
    );
  };
  const _renderContent = section => {
    return (
      <View>
        <Text style={responsiveStyle.listTxt}>{section.content}</Text>
      </View>
    );
  };
  const _updateSections = activeSecrions => {
    setCurretSection(activeSecrions);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Product Details',
      headerTitleStyle: {
        fontFamily: 'Poppins-Bold',
      },
      headerLeft: () => <NavigationBack />,
      headerRight: () => <RightComponent />,

    });
  }, [navigation]);

  const RightComponent = () => {
    return (
      <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
        <FontAwesome size={30} name="edit" color={colors.black} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={responsiveStyle.container}>
      <View>
        <Image style={responsiveStyle.img} source={{uri: product.image}} />
        <View style={responsiveStyle.detailsContainer}>
          <Text style={responsiveStyle.name}>{product.name}</Text>
          <Text style={responsiveStyle.detail}>{product.detail}</Text>
          <Text style={[responsiveStyle.detail, {color: colors.danger}]}>
            ₹ {product.price}{' '}
            <Text
              style={[responsiveStyle.detail, {color: colors.primaryGreen}]}>
              {'        '}25% Off
            </Text>
          </Text>
        </View>
        <View>
          <Accordion
            activeSections={curretSection}
            sections={DetailsArray}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
            underlayColor="transparent"
            sectionContainerStyle={responsiveStyle.sectionContainer}
          />
        </View>
      </View>
    </ScrollView>
  );
};
export default ProductDetails;
