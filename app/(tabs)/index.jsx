import { Text,View,TextInput,StyleSheet } from "react-native"




export default function mainApp(){
  return(
    <View style ={styles.container} >
      <TextInput style={styles.SearchBar}/>
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
      
    }
});