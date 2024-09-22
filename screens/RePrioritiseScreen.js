import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {
  Animated,
  Image,
  TouchableOpacity,
  PanResponder,
} from 'react-native';

import { Icon } from 'react-native-elements';

export default class RePrioritiseScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //fade in animation

      //determines which page is shown (page 1 shown first)
      showPage1: true,
      showPage2: false,

      //stores each of the user's strivings
      strivings: [
        'Striving 1',
        'Striving 2',
        'Striving 3',
        'Striving 4',
        'Striving 5',
        'Striving 6',
        'Striving 7',
        'Striving 8',
        'Striving 9',
        'Striving 10'
      ],

      //drag and drop functionality for each striving
      pan: new Animated.ValueXY(),
      pan2: new Animated.ValueXY(),
      pan3: new Animated.ValueXY(),
      pan4: new Animated.ValueXY(),
      pan5: new Animated.ValueXY(),
      pan6: new Animated.ValueXY(),
      pan7: new Animated.ValueXY(),
      pan8: new Animated.ValueXY(),
      pan9: new Animated.ValueXY(),
      pan10: new Animated.ValueXY(),

      //stores priority level for each of the strivings (defaults to order they were entered in)
      s1Priority: 1,
      s2Priority: 2,
      s3Priority: 3,
      s4Priority: 4,
      s5Priority: 5,
      s6Priority: 6,
      s7Priority: 7,
      s8Priority: 8,
      s9Priority: 9,
      s10Priority: 10,
    };
  }

  componentDidMount = () => {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start();
  };

  componentWillMount() {
    // Add a listener for the delta value change
    this._val = { x:0, y:0 }
    this.state.pan.addListener((value) => this._val = value);
    this.state.pan2.addListener((value) => this._val = value);
    this.state.pan3.addListener((value) => this._val = value);
    this.state.pan4.addListener((value) => this._val = value);
    this.state.pan5.addListener((value) => this._val = value);
    this.state.pan6.addListener((value) => this._val = value);
    this.state.pan7.addListener((value) => this._val = value);
    this.state.pan8.addListener((value) => this._val = value);
    this.state.pan9.addListener((value) => this._val = value);
    this.state.pan10.addListener((value) => this._val = value);

    // Initialize PanResponder with move handling for 1st striving box
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 2nd striving box
    this.pan2Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan2.x, dy: this.state.pan2.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 3rd striving box
    this.pan3Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan3.x, dy: this.state.pan3.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 4th striving box
    this.pan4Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan4.x, dy: this.state.pan4.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 5th striving box
    this.pan5Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan5.x, dy: this.state.pan5.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 6th striving box
    this.pan6Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan6.x, dy: this.state.pan6.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 7th striving box
    this.pan7Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan7.x, dy: this.state.pan7.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 8th striving box
    this.pan8Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan8.x, dy: this.state.pan8.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 9th striving box
    this.pan9Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan9.x, dy: this.state.pan9.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });

    // Initialize PanResponder with move handling for 10th striving box
    this.pan10Responder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan10.x, dy: this.state.pan10.y }
      ])
      // adjusting delta value
      //this.state.pan.setValue({ x:0, y:0})
    });
  }

  render(){
    const { navigation } = this.props;
    const {navigate} = this.props.navigation;
    let {fadeAnim} = this.state;

    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }

    const panStyle2 = {
      transform: this.state.pan2.getTranslateTransform()
    }

    const panStyle3 = {
      transform: this.state.pan3.getTranslateTransform()
    }

    const panStyle4 = {
      transform: this.state.pan4.getTranslateTransform()
    }

    const panStyle5 = {
      transform: this.state.pan5.getTranslateTransform()
    }

    const panStyle6 = {
      transform: this.state.pan6.getTranslateTransform()
    }

    const panStyle7 = {
      transform: this.state.pan7.getTranslateTransform()
    }

    const panStyle8 = {
      transform: this.state.pan8.getTranslateTransform()
    }

    const panStyle9 = {
      transform: this.state.pan9.getTranslateTransform()
    }

    const panStyle10 = {
      transform: this.state.pan10.getTranslateTransform()
    }

    return (
      <Animated.ScrollView contentContainerStyle={styles.container} style={{opacity: fadeAnim}}>
        {
        this.state.showPage1 ?
        <View style={styles.container}>
          <Icon
            name='random'
            type='font-awesome'
            color='#555'
            size={100}
            onPress={() => console.log('hello')}>
          </Icon>
          <Text></Text>
          <Text style={styles.title}>Re-prioritise</Text>
          <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
          <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
          After reflecting on your strivings, you may have reconsidered the importance of your strivings
          based on the key aspects of reflection. To re-prioritise your strivings, you should review the
          ranking of your strivings in order of importance so you know which strivings to focus on.
          </Text>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage1:false, showPage2:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
        {
        this.state.showPage2 ?
        <View style={styles.container}>
          <Text style={styles.title}>Re-prioritise</Text>
          <Text style={{textAlign:'center', margin: 5, fontSize: 16}}>
            Please rank your strivings in order of importance
          </Text>
          <Text>(1 = Most Important) (10 = Least Important)</Text>
          <Text></Text>
          
          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>1</Text>
            </View>
            <Animated.View
            {...this.panResponder.panHandlers}
            style={[panStyle, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[0]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>2</Text>
            </View>
            <Animated.View
            {...this.pan2Responder.panHandlers}
            style={[panStyle2, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[1]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>3</Text>
            </View>
            <Animated.View
            {...this.pan3Responder.panHandlers}
            style={[panStyle3, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[2]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>4</Text>
            </View>
            <Animated.View
            {...this.pan4Responder.panHandlers}
            style={[panStyle4, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[3]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>5</Text>
            </View>
            <Animated.View
            {...this.pan5Responder.panHandlers}
            style={[panStyle5, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[4]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>6</Text>
            </View>
            <Animated.View
            {...this.pan6Responder.panHandlers}
            style={[panStyle6, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[5]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>7</Text>
            </View>
            <Animated.View
            {...this.pan7Responder.panHandlers}
            style={[panStyle7, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[6]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>8</Text>
            </View>
            <Animated.View
            {...this.pan8Responder.panHandlers}
            style={[panStyle8, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[7]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>9</Text>
            </View>
            <Animated.View
            {...this.pan9Responder.panHandlers}
            style={[panStyle9, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[8]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>

          <View style={styles.priorityRow}>
            <View style={[{width:'10%'}, styles.circle, {backgroundColor:'#2980B9'}]}>
              <Text style={{fontWeight: 'bold', fontSize: 18, textAlign: 'center', color: 'white'}}>10</Text>
            </View>
            <Animated.View
            {...this.pan10Responder.panHandlers}
            style={[panStyle10, styles.strivingBox]}>
              <View style = {{width: '90%'}}>
                <Text> {this.state.strivings[9]}</Text>
              </View>
              <View style = {{width: '10%'}}>
                <Icon
                name='arrows-v'
                type='font-awesome'
                color='#555'
                size={20}
                onPress={() => console.log('hello')}>
                </Icon>
              </View>
            </Animated.View>
          </View>
          <View style={styles.rowContainer}>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage2:false, showPage1:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Back</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        :null
        }
      </Animated.ScrollView>
    );
  }
}

/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>*/
RePrioritiseScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#113D9E',
  },
  headerTintColor: 'white',
  headerBackground:(
    <Image style={{
      marginTop: 20,
      marginHorizontal: '40%',
      width: 80,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center'
    }}
    //source={require('./logo.jpg')}
    >
    </Image>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  sectionHeading: {
    fontSize: 20, //25
    fontWeight: 'bold',
    textAlign: 'left',
    alignSelf: 'stretch',
  },
  button:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#A9CCE3',
  },
  strivingBox:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    elevation: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
    borderRadius: 10,
    borderColor: 'gray',
    width: '70%',
  },
  circle: {
    backgroundColor: "skyblue",
    width: 28,
    height: 28,
    borderRadius: 14,
    margin: 5,
  },
  priorityRow:{
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
});