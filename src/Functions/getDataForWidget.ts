import {Emotion} from '../Types/Emotion';
import {getAllRecords, getRecordsForWidgetStats} from '../Actions/Record';
import {NativeModules} from 'react-native';
import {Record} from '../Types/Record';

export const getDataForWidget = async (allRecordsProps?: Record[]) => {
  console.log('updating widget data...');

  const emotions = Object.keys(Emotion).map(key => {
    return {
      key: key,
      name: Emotion[key].name,
    };
  });

  try {
    const allRecords = allRecordsProps ?? (await getAllRecords());
    const records = {
      record: await getRecordsForWidgetStats(allRecords),
      emotions: emotions,
    };

    const {RNSharedWidget} = NativeModules;
    RNSharedWidget.setData(
      'currentMonthStats',
      JSON.stringify(records),
      (result: number | any) => console.log(result),
    );
  } catch (error) {
    console.log({error});
  }
};
