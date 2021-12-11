import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { TextInput } from 'react-native-web';

export default function App() {

  const now = Date.now()

  const [countdown, setCountdown] = useState(6 * 1000)
  const [cdSecond, setCdSecond] = useState(0)
  const [cdMinute, setCdMinute] = useState(0)

  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)

  const [countup, setCountup] = useState(0)

  const [startTime, setStartTime] = useState(Date.now())
  const [targetTime, setTargetTime] = useState(Date.now() + countdown)

  var inter = 1000

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const [lastTick, setLastTick] = useState(Date.now())
  const [lastT, setLastT] = useState(Date.now())
  
  const checkTime = () => {
    console.log('asd')
    console.log('cd', countup)
    console.log('date', startTime )
    console.log('tagetdate', targetTime )
    console.log('diff', targetTime - startTime)
    
    console.log('lastTick', lastTick)
    console.log('last diff', targetTime - lastTick)
  }

  /*
   if date + 1000 * x > date + countup * x
    -> update
   */


    /*  
      JOS date.now() tuhat vaihtuu -> + 1
    */
  const checkAlert = () => {
  }

  var sc = Math.round(Date.now()/1000) // Toimii ... ... .... ..
  const timerOut = (delay, lastti, expe) => {
    var n = Date.now()
    var expe = n + 1000
    
    //console.log('tiemr')
    setSeconds(seconds => seconds + 1)
    //console.log('dell', delay)
    //console.log('lastt', lastti)
    console.log('sc', sc)
    var dif = Date.now() 
    var lastti = Date.now()
    //console.log('time menny', Date.now() - startTime)
    console.log('now', n)
    console.log('last', lastti)
    console.log('roundnow', Math.round(n/1000))
    console.log('roundlast', Math.round(lastti/1000))
    if (Math.round(n/1000) == Math.round(lastti/1000)) console.log('OOOOOO')
    if (sc != Math.round(n/1000)) sc = sc + 1
    

    var dell = delay
    //console.log('dif', dif)
    setLastT(lastti)
    setTimeout(() => {timerOut(dell, lastti, expe)}, dell)
  }

  useEffect(() => { 
    timerOut(200, lastT)
  }, [])




  const counter = () => {
    const timer = setInterval(() => { 
      setCountup(countup => countup + 1000) 
      setLastTick(lastTick => lastTick + 2)
      inter = inter + 100
      console.log('inter', inter)
      console.log('lastTick', lastTick)
      console.log('datenow', Date.now())
      if (Date.now() > targetTime) console.log('MOIIII')
      console.log('last tick diff', (Date.now() - lastTick))
    }, inter)
    inter = inter + 100
    return () => {inter = inter + 1 
      clearInterval(timer)
    }
  }

  useEffect(() => {
    let timer = setInterval(() => { setCountdown(countdown => countdown - 1) }, 1000)
    return () => { clearInterval(timer) }
  }, [])

  useEffect(() => {
    let timer = setInterval(() => {

      setSecond(second + 1)
      if ((second + 1) % 60 === 0 && second !== 0) {
        setSecond(0)
        setMinute(minute + 1)
      }

    }, 1000)
    return () => { clearInterval(timer) }
  }, [second])

  const addTime = () => {
    setCountdown(targetTime + 1000)
  }

  return (
    <View style={styles.container}>
      <Text>{second}.{minute}</Text>
      <Text>{countdown}</Text>
      <Text>{cdMinute}.{cdSecond}</Text>
      <Text>{countup}</Text>
      <Text>TIMEROUT {seconds}</Text>
      <Button title="Moi" onPress={() => checkTime()}></Button>
      <TextInput
        style={styles.input}
        value="{text}"
      />
      <Button title="Add time" onPress={() => addTime()}></Button>
      <Text>{lastT}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
