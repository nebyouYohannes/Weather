import { Text,View,TextInput,StyleSheet,Pressable } from "react-native"




export default function mainApp(){
  const pressed = () => {
      alert('presseddddddd');
  };
  return(
    <View style ={styles.container} >
      <TextInput style={styles.SearchBar}/>
      <Pressable style={styles.srchBtn} onPress={pressed}>
        <Text style={styles.text}>SEARCH</Text>
      </Pressable>
    <Text>Helloo</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 100,
      margin: 32,
    },
    SearchBar: {
      height: 55,
      borderRadius: 15,
      backgroundColor: 'white',
      padding: 10,
    },
    srchBtn:{
    marginTop: 10,
      alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },


});