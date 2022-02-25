import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyCpUyeG6LvUeopH4G89us-nif9WbTL5ZEY",
  authDomain: "driven-seer-329114.firebaseapp.com",
  projectId: "driven-seer-329114",
  storageBucket: "driven-seer-329114.appspot.com",
  messagingSenderId: "711592713272",
  appId: "1:711592713272:web:481e18d9b772268067dacd",
  measurementId: "G-ZDDF2Y7P8Z"
};
export default function Home({navigation}) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getDatabase();
    const reference = ref(db, 'students/');
    onValue(reference, (snapshot) => {
          var duLieu = new Array();
          snapshot.forEach(function(childSnapshot) {
            var childKey = childSnapshot.key; // id của student
            var childData = childSnapshot.val(); // giá trị của student
            var student = { id : undefined, info : undefined}
            student.id = childKey
            student.info = childData
            duLieu.push(student)
          });
          duLieu.forEach((item) => {
            // console.log(item.id);
          })
        });
  }, [])
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      // console.log(location, ' <=========>');
    })();
  }, []);
  return (
    <View style={styles.container}>
            
           <View style={{}}>
         {location != null? <View> 
            <Text>
            latitude: {location.coords.latitude}
            </Text>
            <Text>
            longitude: {location.coords.longitude}
            </Text>
            </View>: null}
           </View>
          <View>
          <TouchableOpacity 
          onPress={ async() => {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            const db = getDatabase();
            const reference = ref(db, 'location/');
            push(reference, {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            })
          }}
          style={{borderWidth:1, width: 200, height: 40,
           backgroundColor: "blue", borderRadius: 20, justifyContent: 'center', alignItems: "center"}}>
                <Text>Lấy toạ độ</Text>
           </TouchableOpacity>
           <TouchableOpacity  onPress={() => {
              //  const db = getDatabase();
              //  const reference = ref(db, 'location/');
              //  push(reference, {
              //    latitude: location.coords.latitude,
              //    longitude: location.coords.latitude,
              //  })
              navigation.navigate('ListLocation')
           }}
           style={{borderWidth:1, width: 200, height: 40, marginTop: 30,
           backgroundColor: "blue", borderRadius: 20, justifyContent: 'center', alignItems: "center"}}>
             <Text>Danh sách toạ độ</Text>
           </TouchableOpacity>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
