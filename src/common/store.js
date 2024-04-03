import storage from '@react-native-firebase/storage';
import RNfetchBlob from 'rn-fetch-blob';
import {Platform} from 'react-native';

const uploadImage = path => {
  return new Promise(async resolve => {
    try {
      const uri = path;
//       console.warn('uri', uri);
      const filename = uri.substring(uri.lastIndexOf('/') + 1);
        //     console.warn(filename);
      const pathForFirebaseStorage = await getPathForFirebaseStorage(uri);
      //       console.warn('pathFIREBASE',pathForFirebaseStorage);
      await storage().ref(filename).putFile(pathForFirebaseStorage);
      await storage()
        .ref(filename)
        .getDownloadURL()
        .then(url => {
          resolve(url);
        });
    } catch (error) {
      console.warn(error);
    }
  });
};

const getPathForFirebaseStorage = async uri => {
  if (Platform.OS === 'ios') {
    return uri;
  }
  const stat = await RNfetchBlob.fs.stat(uri);
  return stat.path;
};

export default uploadImage;
