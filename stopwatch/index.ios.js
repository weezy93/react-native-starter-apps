var formatTime = require('minutes-seconds-milliseconds');
var React = require('react-native');
var {
  Text,
  View,
  TouchableHighlight,
  AppRegistry,
  StyleSheet
} = React;

var StopWatch = React.createClass({
  getInitialState: function () { // should never have logic in it
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function () {
    return <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.timerWrapper}>
            <Text style={styles.timer}>
              {formatTime(this.state.timeElapsed)}
            </Text>
          </View>
          <View style={styles.buttonWrapper}>
            {this.startStopButton()}
            {this.lapButton()}
          </View>
        </View>
        <View  style={styles.footer}>
          {this.laps()}
        </View>
      </View>
  },
  laps: function () {
    return this.state.laps.map(function (time, index) {
      return <View style={styles.lap}>
          <Text style={styles.lapText}>
            Lap {index + 1}
          </Text>
          <Text style={styles.lapText}>
            {formatTime(time)}
          </Text>
        </View>
    });
  },
  startStopButton: function () {
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
              underlayColor="gray"
              onPress={this.handleStartPress}
              style={[styles.button, style]}
              >
          <Text>
            {this.state.running ? 'Stop' : 'Start'}
          </Text>
        </TouchableHighlight>
  },
  lapButton: function () {
    return <TouchableHighlight
              style={styles.button}
              underlayColor="gray"
              onPress={this.handleLapPress}
              >
        <Text>
          Lap
        </Text>
      </TouchableHighlight>
  },
  handleLapPress: function () {
    var lap = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  },
  handleStartPress: function () {
    if (this.state.running) {
      clearInterval(this.interval); // javascript function. passing something to return an interval id
      this.setState({ running: false });
      return;
    }

    this.setState({ startTime: new Date() });

    this.interval = setInterval(() => {
      this.setState({ // only ever update state this way
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30); // this runs once every 30 milliseconds, how we'll track time
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, // fill entire screen
    alignItems: 'stretch' // take as much space as possible ( default is column )
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1
  },
  timerWrapper: {
    flex: 5, // takes up 5/8 of available space
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3, // takes up 3/8 of available space
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#CC0000'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

// ES6 does not automatically bind functions the way es5 does

// AppRegistry.registerComponent('stopwatch', function () {
//   return StopWatch;
// }); ES5

AppRegistry.registerComponent('stopwatch', () => StopWatch);
// es6
