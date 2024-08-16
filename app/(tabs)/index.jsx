import { Text,View,TextInput,StyleSheet,Pressable } from "react-native";
import { useState,useEffect } from 'react';
import axios from 'axios';




export default function mainApp(){
  const [ad , setAd] = useState('addis ababa');
  const [addis , setAddis] = useState({});
  const [search, setSearch] = useState('');
  const [result, setResult] = useState({});
  const [error, setError] = useState(null);
  
  const handleSearch = () => {
    if (search !== '') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=b1fd6e14799699504191b6bdbcadfc35&units=metric`)
        .then(response => {
          setResult(response.data);
          
          setError(null); // Clear previous errors on successful fetch
        })
        .catch(error => {
          if (error.response) {
            // Handle specific HTTP errors
            switch (error.response.status) {
              case 404:
                setError('City not found. Please try another city.');
                break;
              case 401:
                setError('Invalid API key. Please check your API key.');
                break;
              default:
                setError('An error occurred. Please try again later.');
                break;
            }
          } else {
            // Handle other errors (network issues, etc.)
            setError('An error occurred. Please try again later.');
          }
          setResult({}); // Clear previous results on error
        });
    }
  };

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

  const roundUpTemp = (temp) => Math.ceil(temp);
  return(
    
    <View style ={styles.container} >
      <View style={styles.centeredContent}>
      
      
      
      <TextInput style={styles.SearchBar} value={search} onChangeText={text => setSearch(text)} placeholder="Enter location" onSubmitEditing={handleSearch}/>
      
    
    {error ? (
        <Text style={styles.errorText}>{error}</Text> // Display error message
      ) : (
        <View style={styles.centeredContent}>
          {result && result.main ? (
            <View style={styles.centeredContent}>
              <Text style={styles.mainTxtCity}>{result.name}</Text>
              <Text style={styles.mainTxtTemp}>{roundUpTemp(result.main.temp)}°</Text>
              <Text style={styles.mainTxtOther}>{roundUpTemp(result.main.temp_min)}° / {roundUpTemp(result.main.temp_max)}° </Text>
              <Text style={styles.mainTxtOther}>{result.weather[0].description} </Text>
            </View>
          ) : null
        }
        </View>
        
      )}
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      paddingTop: 100,
      backgroundColor: 'white',
      flex: 1, 
      
    },
    SearchBar: {
      height: 45,
      width: 330,
      borderRadius: 25,
      backgroundColor: '#F0F0F0',
      padding: 10,
      marginBottom: 50,
    },
    srchBtn:{
    marginTop: 10,
    marginBottom: 10,
    width: 330,
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
    errorText: {
      color: 'red',
      fontSize: 16,
    },
    centeredContent: {
    
    alignItems: 'center', 
    marginBottom:20,
    },
    mainTxtCity:{
      fontSize: 35,
    },
    mainTxtTemp:{
      marginTop:30,
      fontSize: 100,
    
    },
    mainTxtOther:{
      fontSize: 15,
    },
    


});