import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

import { createNotes } from '../Implementation';
import DateTimePicker from "react-native-modal-datetime-picker";
import Dialog from 'react-native-dialog';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from "react-native-modal";



export default class CreateNotes extends Component {

    static navigationOptions = { header: null };

    constructor() {
        super();
        this.state = {
            click: true,
            title: '',
            note: '',
            reminder: '',
            dialogLog: false,
            DatePickerVisible: false,
            TimePickerVisible: false,
            visible: false,

        }
    }

    handleDatePicker = (date) => {
        var d = '' + date;
        var dt = d.slice(4, 10);
        this.setState({
            date: dt,
        });
        this.hideDatePicker();
    }
    handleTimePicker = (time) => {
        var t = '' + time;
        var tm = t.slice(16, 21);
        this.setState({
            time: tm,
        });
        this.hideTimePicker();
    }

    hideDatePicker = () => {
        this.setState({
            DatePickerVisible: false,
        });
    }
    hideTimePicker = () => {
        this.setState({
            TimePickerVisible: false,
        });
    }
    save = () => {
        var data = this.state.date + '   ' + this.state.time;
        this.setState({
            reminder: data,
            dialogLog: false,
        });
    }

    cancel = () => {
        this.setState({
            dialogLog: false,
        });
    }
    showDate = () => {
        this.setState({
            DatePickerVisible: true,
        });
    }

    showTime = () => {
        this.setState({
            TimePickerVisible: true,
        });
    }
    showDialog = () => {
        this.setState({
            dialogLog: true,
        });
    }


    getPin() {
        this.setState({ click: !(this.state.click) });
    }

    validation() {
        var title, note;
        title = this.state.title;
        note = this.state.note;
        if (title.trim() == '')
            alert('title is need');
        else if (note.trim() == '')
            alert('note is needed');
        else
            return true;
    }
    back() {
        var valid = this.validation();
        if (valid) {
            createNotes(this.state.title, this.state.note, this.state.reminder);
            this.props.navigation.navigate('Drawer');
        } else
            this.props.navigation.navigate('Drawer');

    }
    getModel() {
        this.setState({
            visible: true,
        });
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.back()}>
                        <Image
                            style={{ width: 25, height: 25, marginHorizontal: 15, marginVertical: 8 }}
                            source={require('../Images/leftArrow.png')}
                        />
                    </TouchableOpacity>

                    {
                        this.state.click ?
                            (<View>
                                <TouchableOpacity onPress={() => this.getPin()}>
                                    <Image
                                        style={{ width: 25, height: 25, marginLeft: 230, marginVertical: 6 }}
                                        source={require('../Images/pin.png')}
                                    />
                                </TouchableOpacity>
                            </View>)
                            : (<View>
                                <TouchableOpacity onPress={() => this.getPin()}>
                                    <Image
                                        style={{ width: 25, height: 25, marginLeft: 230, marginVertical: 6 }}
                                        source={require('../Images/unpin.png')}
                                    />
                                </TouchableOpacity>
                            </View>)

                    }

                    <TouchableOpacity onPress={this.showDialog}>
                        <Image
                            style={{ width: 22, height: 22, marginLeft: 15, marginVertical: 6 }}
                            source={require('../Images/reminder.png')}
                        />

                    </TouchableOpacity>
                    <View>
                        <Dialog.Container visible={this.state.dialogLog}>
                            <Dialog.Title>Add Reminder</Dialog.Title>

                            <View>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 8 }} onPress={this.showDate}>Enter Date</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 12, color: 'green' }}>{this.state.date}</Text>
                                <DateTimePicker
                                    isVisible={this.state.DatePickerVisible}
                                    onConfirm={this.handleDatePicker}
                                    onCancel={this.hideDatePicker}

                                />
                            </View>
                            <View>
                                <TouchableOpacity>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 8 }} onPress={this.showTime}>Enter Time</Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 12, color: 'green' }}>{this.state.time}</Text>
                                <DateTimePicker
                                    isVisible={this.state.TimePickerVisible}
                                    onConfirm={this.handleTimePicker}
                                    onCancel={this.hideTimePicker}
                                    mode={'time'}
                                    is24Hour={false}
                                />
                            </View>

                            <Dialog.Button label="Cancel" onPress={this.cancel} />
                            <Dialog.Button label="ok" onPress={this.save} />
                        </Dialog.Container>
                    </View>

                    <TouchableOpacity>
                        <Image
                            style={{ width: 20, height: 20, marginLeft: 15, marginVertical: 6 }}
                            source={require('../Images/achieve.png')}
                        />
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View >
                        <TextInput
                            style={{ width: 300, paddingTop: 20, marginLeft: 20, fontWeight: 'bold', fontSize: 20 }}
                            placeholder='Title'
                            onChangeText={(title) => this.setState({ title })}
                            onSubmitEditing={() => this.note.focus()}
                            value={this.state.title}
                        />
                        <TextInput
                            style={{ width: 300, marginVertical: 5, marginLeft: 25, fontWeight: 'bold', fontSize: 15 }}
                            placeholder='Notes'
                            onChangeText={(note) => this.setState({ note })}
                            ref={(input) => this.note = input}
                            value={this.state.note}
                            multiline={true}
                        />
                    </View>
                    <Text style={{ fontSize: 20, color: 'green', marginLeft: 20 }}>{this.state.reminder}</Text>
                </ScrollView>
                <View style={{ flex: 1 }}></View>
                <View style={styles.container}>
                    <TouchableOpacity>
                        <Image
                            style={{ width: 25, height: 25, marginLeft: 10, marginVertical: 6 }}
                            source={require('../Images/plus.png')}
                        />
                    </TouchableOpacity>
                    <Text>                                                                                                    </Text>
                    <TouchableOpacity onPress={() => this.getModel()}>
                        <Image
                            style={{ width: 25, height: 25, marginVertical: 6 }}
                            source={require('../Images/dot_menu.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <Modal style={{ marginTop: 330 }}
                        isVisible={this.state.visible}
                        deviceHeight={320}
                        deviceWidth={420}
                        onBackdropPress={() => this.setState({ visible: false })}
                    >
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                    <Image
                                        style={{ width: 30, height: 30, color: 'black', }}
                                        source={require('../Images/delete.png')}
                                    />
                                    <Text style={{ marginHorizontal: 10, fontSize: 25 }}> Delete</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                                    <Image
                                        style={{ width: 30, height: 30, color: 'black', }}
                                        source={require('../Images/copy.png')}
                                    />
                                    <Text style={{ marginHorizontal: 10, fontSize: 25 }}> Make a copy </Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                                    <Image
                                        style={{ width: 30, height: 30, color: 'black', }}
                                        source={require('../Images/send.png')}
                                    />
                                    <Text style={{ marginHorizontal: 10, fontSize: 25 }}> Send</Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                                    <Image
                                        style={{ width: 30, height: 30, color: 'black', }}
                                        source={require('../Images/delete.png')}
                                    />
                                    <Text style={{ marginHorizontal: 10, fontSize: 25 }}> Collaborator </Text>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                                    <Image
                                        style={{ width: 30, height: 30, color: 'black', }}
                                        source={require('../Images/label.png')}
                                    />
                                    <Text style={{ marginHorizontal: 10, fontSize: 25 }}> Labels</Text>

                                </View>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,


    },

});