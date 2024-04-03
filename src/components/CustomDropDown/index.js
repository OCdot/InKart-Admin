import {Text, TouchableOpacity, View} from 'react-native';
import UseOrientation from '../../common/orientation';
import Accordion from 'react-native-collapsible/Accordion';
import style from './style';
import {useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import colors from '../../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CustomDropDown = props => {
  const {data, setData, prevData = null} = props;
  const orientation = UseOrientation();
  const responsiveStyle = style(orientation.orientation);
  const [curretSection, setCurretSection] = useState([]);
  const [selected, setSelected] = useState(
    prevData ? prevData.name : data[0].name,
  );
  // console.warn(data);

  useEffect(() => {
    if (data) {
      setSelected(prevData ? prevData.name : data[0].name);
    }
  }, [data]);

  const _updateSections = activeSecrions => {
    setCurretSection(activeSecrions);
  };

  const _renderHeader = () => {
    return (
      <View style={responsiveStyle.renderHeader}>
        <Text style={responsiveStyle.listTxt}>{selected}</Text>
        <AntDesign name="down" size={20} color={colors.grey} />
      </View>
    );
  };

  const SECTIONS = [
    {id: 0, sectionData: prevData ? prevData.name : data[0].name},
  ];

  const _renderContent = () => {
    return (
      <FlatList
        data={data}
        renderItem={({item, index}) => {
          if (item === selected) {
            return null;
          } else {
            return (
              <TouchableOpacity
                onPress={() => {
                  setData(item.name);
                  setSelected(item.name);
                  setCurretSection([]);
                }}>
                <Text style={responsiveStyle.listItem}>{item.name}</Text>
              </TouchableOpacity>
            );
          }
        }}
      />
    );
  };

  return (
    <View>
      <Accordion
        activeSections={curretSection}
        sections={SECTIONS}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={_updateSections}
        underlayColor="transparent"
        sectionContainerStyle={responsiveStyle.sectionContainer}
      />
    </View>
  );
};
export default CustomDropDown;
