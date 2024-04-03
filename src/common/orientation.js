import {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

const UseOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(Dimensions.get('screen'));
  
  useEffect(() => {
    const checkIsPortrait = () => {
       setIsPortrait(Dimensions.get('screen'));
      
    };
    // setIsPortrait(checkIsPortrait());
    Dimensions.addEventListener('change', checkIsPortrait);
  }, []);
  
  return {orientation : isPortrait.height >= isPortrait.width};

  
  
};
export default UseOrientation;







// const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));
  // useEffect(() => {
  //   const onChange = result => {
  //     setScreenInfo(result.screen);
  //   };
  //   Dimensions.addEventListener('change', onChange);
  //   return () => Dimensions.removeEventListener('change', onChange);
  // }, []);
  // return {isPortrait: screenInfo.height > screenInfo.width};