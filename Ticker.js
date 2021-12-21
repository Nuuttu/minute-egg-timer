import React, {useState} from "react"
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';


export default function Ticker( props ) {
  const [ timeDisplay, setTimeDisplay ] = useState()

  const [ seconds, setSeconds ] = useState()
  const [ minutes, setMinutes ] = useState()

  const now = Date.now()


  
  const stopTimer = (e) => {
    console.log('STooop')
    e.preventDefault()
    //stop = true

  }


  

  return (
    <View>
      <Text>
        {props.countdown}
        
      </Text>
      
      <Button title="STOP" onPress={(e) => stopTimer(e)}></Button>
    </View>
  )
}