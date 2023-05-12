import notifee, {
  RepeatFrequency,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import {getSettingsValueById} from '../Actions/Settings';
import {NOTIFY_KEY} from '../Components/Settings/Notifications';
import {HOUR} from '../../App';

export const onDisplayNotification = async () => {
  await notifee.requestPermission();

  if ((await getSettingsValueById(NOTIFY_KEY))?.value === '1') {
    const date = new Date();
    if (date.getHours() >= HOUR) {
      date.setDate(date.getDate() + 1);
    }
    date.setHours(HOUR);
    date.setMinutes(0);
    date.setSeconds(0);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.DAILY,
    };
    await notifee.createTriggerNotification(
      {
        title: 'Расскажи, как прошел день',
        body: 'Ещё один день, ещё одна история 😊',
      },
      trigger,
    );
  } else {
    await notifee.cancelAllNotifications();
  }
};
