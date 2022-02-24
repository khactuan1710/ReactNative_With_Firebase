import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Splash = ({navigation})=> {

        useEffect(() => {
            console.log("call");
            setTimeout(() => {
                navigation.navigate('Home');
            }, 2000); 
        },[])
  return (
    <View style={styles.container}>
            <Text>Splash</Text>

    </View>
  );
}
export default Splash
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
