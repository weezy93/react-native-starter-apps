var React = require('react-native');
var {
  AppRegistry,
  MapView,
  View,
  Text,
  StyleSheet
} = React;

var Api = require('./src/api');

var Weather = React.createClass({
  getInitialState: function () {
    return {
      pin: {
        latitude: 0,
        longitude: 0,
        city: '',
        temperature: '',
        description: ''
      }
    };
  },
  render: function () {
    return <View style={styles.container}>
          <MapView
              annotations={[this.state.pin]} // annotations expects an array
              style={styles.map}
              onRegionChangeComplete={this.onRegionChangeComplete}
              >
          </MapView>
          <View style={styles.textWrapper}>
            <Text style={styles.text}>{this.state.city}</Text>
            <Text style={styles.text}>{this.state.temperature}</Text>
            <Text style={styles.text}>{this.state.description}</Text>
          </View>
        </View>
  },
  onRegionChangeComplete: function (region) {
    this.setState({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

// function keyword using 'this', value is unknown. fat arrow function 'this' refers to component. equal in and out of component

    Api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data); // is not desctructive. only additive
      });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weather', () => Weather);
