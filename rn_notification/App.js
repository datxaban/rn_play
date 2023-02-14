import { StatusBar } from 'expo-status-bar';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true
    };
  }
});

export default function App() {



  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        );
        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log("Token",pushTokenData);

      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }

    configurePushNotifications();

  }, []);

  useEffect(()=>{
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification)=>
      {
        // console.log("NOTI Received");
        // console.log(notification);
        const userName = notification.request.content.data.userName;
        // console.log(userName)
      }
      );

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response)=>{
        // console.log("NOTI received")
        // console.log(response)
        const userName = response.notification.request.content.data.userName;
        // console.log(userName)
      });

    return () =>{
      subscription1.remove();
      subscription2.remove();
    }
  },[])

  function scheduleNotificationHandler(){
    // console.log("Test");
    Notifications.scheduleNotificationAsync({
      content:{
        title:'Title',
        body:'Body',
        data:{userName:'Dat'}
      },
      trigger:{
        seconds: 2,
      }
    });
  }

  function sendPushNotificationHandler() {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[0_9ivlLqO61qXBIc9c3Kad]',
        title: 'Test - sent from a device!',
        body: 'This is a test!'
      })
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title='Schedule Notification'
        onPress={scheduleNotificationHandler}
      />
      <Button
        title='Send Push Notification'
        onPress={sendPushNotificationHandler}
      />
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
});
