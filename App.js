import React from 'react';
import { Image, StyleSheet, FlatList, Text, View } from 'react-native';
import { ListItem, List } from 'react-native-elements'
import { TabNavigator } from "react-navigation";

const testData = 
  [{ "id": 1, "first_name": "Nevins" }, { "id": 2, "first_name": "Alvy" }, { "id": 3, "first_name": "Loutitia" }, { "id": 4, "first_name": "Serene" }, { "id": 5, "first_name": "Esma" }, { "id": 6, "first_name": "Bradly" }, { "id": 7, "first_name": "Antone" }, { "id": 8, "first_name": "Herminia" }, { "id": 9, "first_name": "Pauly" }, { "id": 10, "first_name": "Bartlet" }, { "id": 11, "first_name": "Fitz" }, { "id": 12, "first_name": "Dorey" }, { "id": 13, "first_name": "Antoine" }, { "id": 14, "first_name": "Sharona" }, { "id": 15, "first_name": "Robinetta" }, { "id": 16, "first_name": "Gertruda" }, { "id": 17, "first_name": "Lilah" }, { "id": 18, "first_name": "Tremayne" }, { "id": 19, "first_name": "Englebert" }, { "id": 20, "first_name": "Geordie" }] 

class ToDoScreen extends React.Component {
  _renderItem({item,index}) {
    return (
      <ListItem 
       roundAvatar
       title = {item.first_name}
      />
    )
  }

  render() {
    return (
      <List>
        <FlatList
        data={testData}
        renderItem={this._renderItem}
        keyExtractor={item => item.id}
        />
      </List>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings Screens</Text>
      </View>
    );
  }
}

const BasicApp = TabNavigator({
  ToDos: {screen: ToDoScreen},
  Settings: {screen: SettingsScreen}
});

export default BasicApp;

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#ffa',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
