import { NativeModules, NativeModule, NativeEventEmitter } from 'react-native';

import BackgroundService from 'react-native-background-actions';
import * as Notifications from 'expo-notifications';
import { getString } from '@strings/translations';

//import BackgroundFetch from 'react-native-background-fetch';

export default class BGService {
  static async start<T>(launch: any, options?: any): Promise<void> {
    if (options) {
      // Handle the case when both launch and options are provided
      console.log('Launch:', launch);
      console.log('Options:', options);
    } else {
      // Handle the case when only launch is provided
      console.log('Launch:', launch);
    }
  }
  /*
  static async start(lauch: any) {

    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // minimum interval in minutes
        stopOnTerminate: false, // continue running after the app is terminated
        startOnBoot: true, // start when the device boots up
      },
      async taskId => {
        //alert('Background');
        // Perform your background task here
        console.log(`Background task with ID ${taskId} executed`);
        BackgroundFetch.finish(taskId); // signal task completion
      },
    );
   
    // Start the background task
    if (lauch) {
      BackgroundService.start(lauch, {
        taskName: 'app_services',
        taskTitle: 'App Service',
        taskDesc: getString('common.preparing'),
        taskIcon: { name: 'notification_icon', type: 'drawable' },
        color: '#00adb5',
        ///linkingURI: 'lnreader://',
      }).catch(error => {
        
        Notifications.scheduleNotificationAsync({
          content: {
            title: getString('backupScreen.drive.backupInterruped'),
            body: error.message,
          },
          trigger: null,
        });
        BackgroundService.stop();
      });
    }
  }*/
  static isRunning() {
    //return BackgroundService.isRunning();
    return true;
  }

  static async stop() {
    try {
      //await BackgroundService.stop();
    } catch (e) {}
  }

  static async updateNotification(notification: any) {
    try {
      //if (notification)
      //await BackgroundService.updateNotification(notification);
    } catch (error) {
      console.error('Failed to update notification:', error);
    }
  }
}
