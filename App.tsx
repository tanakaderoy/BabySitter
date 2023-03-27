import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import BabysitterUtil from './BabySitterUtil';

const timeData = [
  {time: '12:00 PM', value: '12 PM'},
  {time: '1:00 PM', value: '1 PM'},
  {time: '2:00 PM', value: '2 PM'},
  {time: '3:00 PM', value: '3 PM'},
  {time: '4:00 PM', value: '4 PM'},
  {time: '5:00 PM', value: '5 PM'},
  {time: '6:00 PM', value: '6 PM'},
  {time: '7:00 PM', value: '7 PM'},
  {time: '8:00 PM', value: '8 PM'},
  {time: '9:00 PM', value: '9 PM'},
  {time: '10:00 PM', value: '10 PM'},
  {time: '11:00 PM', value: '11 PM'},
  {time: '12:00 AM', value: '12 AM'},
  {time: '1:00 AM', value: '1 AM'},
  {time: '2:00 AM', value: '2 AM'},
  {time: '3:00 AM', value: '3 AM'},
  {time: '4:00 AM', value: '4 AM'},
  {time: '5:00 AM', value: '5 AM'},
  {time: '6:00 AM', value: '6 AM'},
  {time: '7:00 AM', value: '7 AM'},
  {time: '8:00 AM', value: '8 AM'},
  {time: '9:00 AM', value: '9 AM'},
  {time: '10:00 AM', value: '10 AM'},
  {time: '11:00 AM', value: '11 AM'},
];

export default function App() {
  const [startTime, setStartTime] = useState('');
  const [bedTime, setBedTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [nightlyCharge, setNightlyCharge] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text>Start Time: </Text>
        <SelectDropdown
          data={timeData}
          onSelect={(selectedItem, index) => {
            setStartTime(selectedItem.value);
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.time;
          }}
          rowTextForSelection={item => {
            return item.time;
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text>Bed Time: </Text>
        <SelectDropdown
          data={[{time: 'N/A', value: ''}, ...timeData]}
          onSelect={(selectedItem, index) => {
            setBedTime(selectedItem.value);
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.time;
          }}
          rowTextForSelection={item => {
            return item.time;
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
        }}>
        <Text>End Time: </Text>
        <SelectDropdown
          data={timeData}
          onSelect={(selectedItem, index) => {
            setEndTime(selectedItem.value);
          }}
          buttonTextAfterSelection={selectedItem => {
            return selectedItem.time;
          }}
          rowTextForSelection={item => {
            return item.time;
          }}
        />
      </View>

      <Button
        title="Calculate Nightly Charge"
        onPress={() => {
          setError(undefined);
          try {
            const pay = BabysitterUtil.calculate(startTime, endTime, bedTime);

            setNightlyCharge(Math.abs(pay).toFixed(2));
          } catch (e: any) {
            setError(e.message);
          }
        }}
      />
      {error && <Text>Error: {error}</Text>}
      {!error && <Text>Nightly Charge: ${nightlyCharge}</Text>}
    </View>
  );
}
