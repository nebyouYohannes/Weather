import { Text,View,TextInput,StyleSheet,Pressable,Image,ImageBackground} from "react-native";
import { useState,useEffect } from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import back from '../../assets/images/bg.jpg'
import cloudy from '../../assets/images/cloudy.png'; 
import drizzle from '../../assets/images/drizzle.png'; 
import rain from '../../assets/images/rain.png'; 
import snow from '../../assets/images/snow.png'; 
import storm from '../../assets/images/storm.png'; 
import sun from '../../assets/images/sun.png'; 



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

  const weatherImage = () => {
    if (result.weather[0].main === 'Clouds'){
      return <Image source={cloudy} style={styles.weatherImg}/>
    } else if (result.weather[0].main === 'Thunderstorm'){
      return <Image source={storm} style={styles.weatherImg}/>
    } else if (result.weather[0].main === 'Drizzle'){
      return <Image source={drizzle} style={styles.weatherImg}/>
    } else if (result.weather[0].main === 'Rain'){
      return <Image source={rain} style={styles.weatherImg}/>
    } else if (result.weather[0].main === 'Snow'){
      return <Image source={snow} style={styles.weatherImg}/>
    } else if (result.weather[0].main === 'Clear'){
      return <Image source={sun} style={styles.weatherImg}/>
    } else if (result.weather[0].main === 'Atmosphere'){
      return <Image source={sun} style={styles.weatherImg}/>
    }
  }

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
      
      <Text style={styles.mainTxtCity}>Weather</Text>
      <View style={styles.centeredContent}>
      
      <View style={styles.searchContainer}>
      <Icon name="search" size={24} color="#000" style={styles.searchIcon} />
      <TextInput style={styles.SearchBar} value={search} onChangeText={text => setSearch(text)} placeholder="Enter location" onSubmitEditing={handleSearch}/>
      </View>
    
    {error ? (
        <Text style={styles.errorText}>{error}</Text> // Display error message
      ) : (
        <View style={styles.centeredContent}>
          {result && result.main ? (
            <View style={styles.centeredContent}>
            
              <Text style={styles.mainTxtCity}>{result.name}</Text>
              <View>{weatherImage()}</View>
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
      paddingTop: 70,
      paddingLeft:10,
      paddingRight:10,
      backgroundColor: 'white',
      flex: 1, 
      
    },
    SearchBar: {
      flex: 1,
      height: 45,
      borderRadius: 25,
      backgroundColor: '#F0F0F0',
      padding: 10,
      
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
      
      fontSize: 100,
    
    },
    mainTxtOther:{
      fontSize: 15,
    },
    searchIcon: {
      marginLeft: 10,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 350,
      borderRadius: 25,
      backgroundColor: '#F0F0F0',
      height: 45,
      marginBottom: 60,
      marginTop: 15,
    },
    weatherImg: {
      height: 200,
      width: 200,
    },
    back: {
      flex: 1,
    }


});