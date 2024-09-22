import * as WebBrowser from 'expo-web-browser';

import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {
  Animated,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Icon } from 'react-native-elements';

import { Component } from 'react';

//Import react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

export default class IntroScreen extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0), //fade in animation

      //determines which page is shown
      showPage1: true,
      showPage2: false,
      showPage3: false,
      showPage4: false,
      showPage5: false,
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

  render(){
    const { navigation } = this.props;
    const {navigate} = this.props.navigation;
    let {fadeAnim} = this.state;

    return (
      <Animated.ScrollView contentContainerStyle={styles.container} style={{opacity: fadeAnim}}>
        {
          this.state.showPage1 ?
          <View style={styles.container}>
            <Icon
              name='bullseye'
              type='font-awesome'
              color='#555'
              size={100}
              onPress={() => console.log('hello')}>
            </Icon>
            <Text></Text>
            <Text style={styles.title}>Welcome</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={{textAlign:'center', fontSize: 16}}>
            Everyone seeks different goals and has different purposes in life.
            We help you to identify, prioritise, and reflect on your personal goals so you can achieve your strivings in life.
            </Text>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => this.setState({showPage1:false, showPage2:true})}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
          :null
        }

        {
          this.state.showPage2 ?
          <View style={styles.container}>
            <Text style={styles.title}>What are Strivings?</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Icon
              name='lightbulb-o'
              type='font-awesome'
              color='#555'
              size={100}
              onPress={() => console.log('hello')}>
            </Icon>
            <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
            Strivings are personal goals that you typically or characteristically are trying to do,
            which you may or may not be successful at.
            </Text>
            <Text style={{textAlign:'center', margin: 10, fontSize: 16, fontStyle: 'italic'}}>
            Now, start thinking about the personal goals you want to achieve so that you can enrich your life experiences.
            </Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle-o'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle-o'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle-o'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>           </Text>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage2:false, showPage3:true})}
              >
              </Icon>
            </View>
            <Text></Text>
            <Text style={{fontStyle: 'italic'}}>Tap Right to Continue</Text>
          </View>
          :null
        }

        {
          this.state.showPage3 ?
          <View style={styles.container}>
            <Text style={{fontSize: 16}}>First, you should consider</Text>
            <Text style={styles.title}>Are your strivings...</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Icon
              name='arrows-alt'
              type='font-awesome'
              color='#555'
              size={50}
              onPress={() => console.log('hello')}>
            </Icon>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>Broad?</Text>
            <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
            (e.g. trying to help others in need of help) 
            </Text>
            <Text></Text>
            <Text style={{fontSize: 20}}>OR</Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <Icon
                name='long-arrow-right'
                type='font-awesome'
                color='#555'
                size={50}
                onPress={() => console.log('hello')}>
              </Icon>
              <Icon
                name='long-arrow-left'
                type='font-awesome'
                color='#555'
                size={50}
                onPress={() => console.log('hello')}>
              </Icon>
            </View>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>Specific?</Text>
            <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
            (e.g. trying to help your parents in need of help)
            </Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <Icon
                name='chevron-left'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage3:false, showPage2:true})}
              >
              </Icon>
              <Text>           </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle-o'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle-o'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>           </Text>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage3:false, showPage4:true})}
              >
              </Icon>
            </View>
            <Text></Text>
            <Text style={{fontStyle: 'italic'}}>Tap Left to Go Back</Text>
          </View>
          :null
        }

        {
          this.state.showPage4 ?
          <View style={styles.container}>
            <Text style={{fontSize: 16}}>Next, you should consider</Text>
            <Text style={styles.title}>Are your strivings...</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Icon
              name='plus'
              type='font-awesome'
              color='#555'
              size={50}
              onPress={() => console.log('hello')}>
            </Icon>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>Positive?</Text>
            <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
            known as approach goals (e.g. seeking new and exciting experiences)
            </Text>
            <Text></Text>
            <Text style={{fontSize: 20}}>OR</Text>
            <Text></Text>
            <Icon
              name='minus'
              type='font-awesome'
              color='#555'
              size={50}
              onPress={() => console.log('hello')}>
            </Icon>
            <Text style={{fontSize: 18, fontWeight:'bold'}}>Negative?</Text>
            <Text style={{textAlign:'center', margin: 10, fontSize: 16}}>
            known as avoidance goals (e.g. avoid being noticed by others)
            </Text>
            <Text></Text>
            <View style={styles.rowContainer}>
              <Icon
                  name='chevron-left'
                  type='font-awesome'
                  color='#555'
                  onPress={() => this.setState({showPage4:false, showPage3:true})}>
              </Icon>
              <Text>           </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle-o'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>           </Text>
              <Icon
                name='chevron-right'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage4:false, showPage5:true})} 
              >
              </Icon>
            </View>
          </View>
          :null
        }

        {
          this.state.showPage5 ?
          <View style={styles.container}>
            <Text style={styles.title}>Here's some examples</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text style={{fontSize: 20}}>Trying to...</Text>
            <Text></Text>

            <View style={styles.rowContainer}>
              <View style = {styles.rowIcon}>
                <Icon
                name='heart'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.rowText}>
                <Text style= {{fontSize:16}}>be physically attractive to others</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.rowIcon}>
                <Icon
                name='comments-o'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.rowText}>
                <Text style= {{fontSize:16}}>persuade others that you are right</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.rowIcon}>
                <Icon
                name='users'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.rowText}>
                <Text style= {{fontSize:16}}>help others in need of help</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.rowIcon}>
                <Icon
                name='bolt'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.rowText}>
                <Text style= {{fontSize:16}}>seek new and exciting experiences</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.rowIcon}>
                <Icon
                name='eye'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.rowText}>
                <Text style= {{fontSize:16}}>avoid being noticed by others</Text>
              </View>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <View style = {styles.rowIcon}>
                <Icon
                name='commenting-o'
                type='font-awesome'
                color='#555'
                size={20}
                >
                </Icon>
              </View>
              <View style = {styles.rowText}>
                <Text style= {{fontSize:16}}>avoid feeling inferior to others</Text>
              </View>
            </View>
            <Text></Text>
            <View style={[styles.button,{backgroundColor: '#F2F4F4'}]}>
              <TouchableOpacity onPress={() => navigate('Home')}>
                <Text style={{fontWeight:'bold', fontSize: 16}}>Next</Text>
              </TouchableOpacity>
            </View>
            <Text></Text>
            <View style={styles.rowContainer}>
              <Icon
                name='chevron-left'
                type='font-awesome'
                color='#555'
                onPress={() => this.setState({showPage5:false, showPage4:true})}
              >
              </Icon>
              <Text>           </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>  </Text>
              <Icon
                  name='circle'
                  type='font-awesome'
                  color='#555'
                  onPress={() => console.log('hello')}>
              </Icon>
              <Text>           </Text>
            </View>
          </View>
          :null
        }
      </Animated.ScrollView>  
    );
  }
}

/*<View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"></View>*/
IntroScreen.navigationOptions = {
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
    backgroundColor: 'transparent'
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
  rowContainer: {
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  rowIcon:{
    width: '30%',
    backgroundColor: 'transparent'
  },
  rowText:{
    width: '70%',
    backgroundColor: 'transparent'
  },
});
