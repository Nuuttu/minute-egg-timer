import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';
import { Audio } from 'expo-av';


export default function App() {

  const now = Date.now()

  const [countdown, setCountdown] = useState(6)
  const [cdSecond, setCdSecond] = useState(0)
  const [cdMinute, setCdMinute] = useState(0)

  const [second, setSecond] = useState(0)
  const [minute, setMinute] = useState(0)

  const [countup, setCountup] = useState(0)

  const [startTime, setStartTime] = useState(now)
  const [targetTime, setTargetTime] = useState(now + (countdown * 1000))

  var inter = 1000

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  const [lastTick, setLastTick] = useState(now)
  const [lastT, setLastT] = useState(now)


  const [sound, setSound] = React.useState();

  //https://docs.expo.dev/versions/latest/sdk/audio/
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/TarkeeAsiaa.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  const checkTime = () => {
    console.log('asd')
    console.log('cd', countup)
    console.log('date', startTime)
    console.log('tagetdate', targetTime)
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

  var sc = Date.now()
  var cd = countdown
  var tar = Date.now() + (cd * 1000)
  var alerted = false
  var t = null
  var stop = false

  const timerOut = (delay) => {
    console.log('stop', stop)
    if (!stop) {
      var n = Date.now()
      setSeconds(seconds => seconds + 1)

      if (n >= sc) {
        sc = sc + 1000
        if (n < tar) {
          cd = cd - 1
          setCountdown(countdown => countdown - 1)
          console.log('ASD')

        }
        if (!alerted && n > tar) {
          playSound()
          console.log('asdadsd')
          clearTimeout(t)
          alerted = true
        }
      }
      var dell = delay
      if (!alerted) {
        setCountup(countup => countup + 1)
        t = setTimeout(() => { timerOut(dell) }, dell)
      }
    }
  }

  var interv = null
  const intervaller = () => {
    interv = setInterval(() => {
      console.log('interv1', interv)
      var n = Date.now()
      if (n >= sc) {
        sc = sc + 1000
        if (n < tar) {
          setCountdown(countdown => countdown - 1)
          console.log('cup')

        }
        if (!alerted && n > tar) {
          console.log('DONE')
          clearTimeout(t)
          alerted = true
        }
      }
    }, 100)
  }


  useEffect(() => {
    timerOut(100)
    //intervaller()
    //repeatFunc()
  }, [])

  // STOP FALSE ALL THE TIME
  const stopTimer = (e) => {
    console.log('STIOPOPPOOP', stop)
    e.preventDefault()
    stop = true
    console.log('stopp', stop)
  }

  // set target time again 
  const continueTimer = (e) => {
    e.preventDefault(e)
    tar = Date.now() + cd * 1000
    stop = false
    timerOut(100)
  }

  const again = () => {
    console.log('adagi')
    stop = false
    alerted = false
    sc = Math.round(Date.now())
    cd = cd + 5
    tar = Date.now() + (cd * 1000)
    setCountdown(cd)
    timerOut(100)
  }

  const addTime = () => {
    clearTimeout(t)
    console.log('add')
    tar = tar + 2000
    cd = cd + 2
    setCountdown(cd)
    timerOut(100)
  }
  /*
  
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
  */

  return (
    <View style={styles.container}>
      <Text style={styles.clock}>{second}.{minute}</Text>
      <Text>{countdown}</Text>
      <Text>{cdMinute}.{cdSecond}</Text>
      <Text>countup {countup}</Text>
      <Text>TIMEROUT {seconds}</Text>
      <Button title="Again" onPress={() => again()}></Button>
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Add time" onPress={() => addTime()}></Button>
      <Button title="STOP" onPress={(e) => stopTimer(e)}></Button>
      <Button title="CONTINUE" onPress={(e) => continueTimer(e)}></Button>
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
  inp: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  clock: {
    fontSize: 26
  }
});
