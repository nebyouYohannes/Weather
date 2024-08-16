import { Text,View,TextInput,StyleSheet,Pressable } from "react-native";
import { useState,useEffect } from 'react';
import axios from 'axios';




export default function mainApp(){
  const [ad , setAd] = useState('addis ababa');
  const [addis , setAddis] = useState({});
  const [search, setSearch] = useState('');
  const [result, setResult] = useState({});
  const handleSearch = () => {
    if (search !== '') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b1fd6e14799699504191b6bdbcadfc35&units=metric`)
        .then(response => {
          setResult(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  useEffect(() => {
    defWeather();
  }, []);

  const defWeather = () => {
    if (ad !== '') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${ad}&appid=b1fd6e14799699504191b6bdbcadfc35&units=metric`)
        .then(response => {
          setAddis(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
  
  const pressed = () => {
      alert('presseddddddd');
  };
  return(
    <View style ={styles.container} >
      {addis && addis.main ? ( // Check if addis and addis.main exist
        <View>
          <Text>City: {addis.name}</Text>
          <Text>Temperature: {addis.main.temp}°C</Text>
          <Text>Weather: {addis.weather[0].description}</Text>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
      <TextInput style={styles.SearchBar} value={search} onChangeText={text => setSearch(text)}/>
      <Pressable style={styles.srchBtn} onPress={handleSearch} >
        <Text style={styles.text}>SEARCH</Text>
      </Pressable>
    <Text>Helloo</Text>
    {result && result.main ? ( // Check if addis and addis.main exist
        <View>
          <Text>City: {result.name}</Text>
          <Text>Temperature: {result.main.temp}°C</Text>
          <Text>Weather: {result.weather[0].description}</Text>
        </View>
      ) : (
        <Text>No data available</Text>
      )}
    
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