import React from 'react';
import {AppRegistry, StyleSheet, View, Text, TextInput ,Button} from 'react-native';
export default class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NamaKota: '',
      forecast: {
        main: '_',
        description: '_',
        temp: 0
      }
    };
  }

  getWeather= () => {
       let url='http://api.openweathermap.org/data/2.5/weather?q=' + this.state.NamaKota + '&appid=8e07fcb87279bfddafb89bf88a2823ea&units=metric';
       fetch (url)
       .then((response) => response.json())
       .then((responseJson) => {
          console.log(responseJson);
         this.setState({
           forecast: {
             main: responseJson.weather[0].main,
             description: responseJson.weather[0].description,
             temp: responseJson.main.temp
           }
         });
       }
     );
    }
  render() {
    return (
      <View style={styles.containerMain}>

        <View style={styles.box2}>
          <Text style={styles.text}>Masukkan Nama kota</Text>
          <View style={styles.boxSearch} >
            <TextInput style = {{height: 50}}
            placeholder="Search"
            onChangeText={(NamaKota)=>this.setState({NamaKota})}
            />
          </View>

          <Button
          onPress={
                () => this.getWeather()
              }
            title="LIHAT"
            accessibilityLabel="Klik untuk mengecek"
          />

        </View>
        <View style={styles.box3}>
        <View>
            <Text style={{ padding: 10, fontSize: 20 }} >
              {this.state.NamaKota} {'\n'}
              Suhu{'\t'}{'\t'}: {this.state.forecast.temp} Celcius {'\n'}
              Cuaca{'\t'}{'\t'}: {this.state.forecast.main} {'\n'}
              Deskripsi{'\t'}: {this.state.forecast.description}
            </Text>
        </View>

        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    containerMain: {
      backgroundColor: '#f2f5f0',
      flex:1,
      flexDirection:'column'
    },
    box1:{
      flex: 1,
      backgroundColor: '#0066cc',
      flexDirection : 'row',
      justifyContent: 'center',
      alignItems: 'center'

    },
    box2:{
      flex: 2,
      backgroundColor: '#1E90FF',
      flexDirection : 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
    },
    box3: {
    flex: 4,
    margin: 15,
    backgroundColor: '#1E90FF',
    flexDirection: 'row'

  },
    box4:{
      flex: 1,
      backgroundColor: '#0066cc',
      flexDirection : 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize:20,
      color: 'white',
    },
    boxSearch: {
    padding:10,
    width: 250,
    height: 35,
    backgroundColor: 'white',
    margin: 10,
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'column'

  }
});
