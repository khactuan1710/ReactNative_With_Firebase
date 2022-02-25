import React, { useEffect, useState } from "react";
import { View, Text , FlatList, TouchableOpacity} from "react-native";
import { getDatabase, ref, onValue, set, push, remove } from 'firebase/database';
const ListLocation = ({navigation}) => {
    const [listLocation, setListLocation] = useState(null);
    useEffect(() => {
        const db = getDatabase();
        const reference = ref(db, 'location/');
        onValue(reference, (snapshot) => {
              var duLieu = new Array();
              snapshot.forEach(function(childSnapshot) {
                var childKey = childSnapshot.key; // id của student
                var childData = childSnapshot.val(); // giá trị của student
                var locationObj = { id : undefined, location : undefined}
                locationObj.id = childKey
                locationObj.location = childData
                duLieu.push(locationObj)
              });
              setListLocation(duLieu)
              duLieu.forEach((item) => {
                // console.log(item);
              })
            });
    },[])
    return (
        <View>
            <Text style={{alignSelf: "center", fontSize: 20}}>Danh sách toạ độ</Text>
            <FlatList
                style={{marginHorizontal: 50, marginBottom: 100}}
                data={listLocation}
                keyExtractor={(item) => {
                    item.id
                }}
                renderItem = {({item}) => {
                    return (<View style={{marginTop: 50, flexDirection: "row", justifyContent: "space-between", borderRadius: 30, borderWidth: 1, height: 50, alignItems: 'center', paddingLeft: 20}}>
                      <View>
                      <Text>{item.location.latitude}</Text>
                        <Text>{item.location.longitude}</Text>
                      </View>
                      <TouchableOpacity
                      onPress={() => {
                        const db = getDatabase();
                        const studentID = 'PH01410'
                        const reference = ref(db, 'location/' + item.id);
                        remove(reference)
                      }}
                       style={{alignItems:"center", justifyContent: "center",  backgroundColor: "red", borderRadius: 100, marginRight: 30,  width: 50, height: 30}}>
                          <Text>
                              Xoá
                          </Text>
                      </TouchableOpacity>
                    </View>)
                }}
            />
        </View>
    )
}
export default ListLocation;