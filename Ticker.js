import React from "react"
import { StyleSheet, Text, View, Button, TextInput, Alert } from 'react-native';


export default function Ticker() {
  const now = Date.now()

  console.log('ticker')

  return (
    <View>
      <Text>
        {Date.now()}
      </Text>
    </View>
  )
}