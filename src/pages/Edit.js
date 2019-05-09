import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, Dimensions } from 'react-native';

import { editNotes, editReminder, editArchive, updatePin, editTrash, editColor } from '../Implementation';
import DateTimePicker from "react-native-modal-datetime-picker";
import Dialog from 'react-native-dialog';
import Modal from "react-native-modal";
import { FlatList } from 'react-native-gesture-handler';

const colorBox = [
    {
        colorCode: "#FFFFFF",
        colorName: "white"
    },
    {
        colorCode: "#e57373",
        colorName: "red"
    },
    {
        colorCode: "#7e57c2",
        colorName: "deepPurple"
    },
    {
        colorCode: "#0277bd",
        colorName: "lightBlue"
    },
    {
        colorCode: "#81c784",
        colorName: "green"
    },
    {
        colorCode: "#fff176",
        colorName: "yellow"
    },
    {
        colorCode: "#ff7043",
        colorName: "deepOrange"
    },
    {
        colorCode: "#78909c",
        colorName: "blueGrey"
    },
    {
        colorCode: "#8d6e63",
        colorName: "brown"
    },

]


export default class Editor extends Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.Show.title,
            note: this.props.navigation.state.params.Show.note,
            reminder: this.props.navigation.state.params.Show.reminder,
            click: this.props.navigation.state.params.Show.pin,
            dialogLog: false,
            DatePickerVisible: false,
            TimePickerVisible: false,
            visible: false,
            select: this.props.navigation.state.params.Show.select,
            trash: this.props.navigation.state.params.Show.trash,
            archive: this.props.navigation.state.params.Show.archive,
            color: this.props.navigation.state.params.Show.color,
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
    async back() {
        var valid = this.validation();
        if (valid) {
            await editNotes(this.state.title, this.state.note, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
            await editReminder(this.state.reminder, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
            await editReminder(this.state.select, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
            await updatePin(this.state.click, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
            await editTrash(this.state.trash, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
            await editArchive(this.state.archive, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
            await editColor(this.state.color, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
            this.props.navigation.navigate('Drawer');
        } else
            this.props.navigation.navigate('Drawer');

    }

    getModel() {
        this.setState({
            visible: !(this.state.visible)
        });
    }

    setDelete() {
        this.setState({
            trash: true
        })

        if (this.state.trash) {
            this.back();
        }

    }
    handleArchive() {
        this.setState({ archive: !(this.state.archive) });
    }

    handleColor(color) {
        this.setState({ color: color });
    }


    render() {
        const deviceWidth = Dimensions.get("window").width;
        // const deviceHeight = Dimensions.get('window').height ;


        return (

            <View style={{ flex: 1, backgroundColor: this.state.color }}>
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
                                        source={require('../Images/unpin.png')}
                                    />
                                </TouchableOpacity>
                            </View>)
                            : (<View>
                                <TouchableOpacity onPress={() => this.getPin()}>
                                    <Image
                                        style={{ width: 25, height: 25, marginLeft: 230, marginVertical: 6 }}
                                        source={require('../Images/pin.png')}
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
                    {
                        this.state.archive ?
                            (<View>
                                <TouchableOpacity onPress={() => this.handleArchive()}>
                                    <Image
                                        style={{ width: 20, height: 20, marginLeft: 15, marginVertical: 6, backgroundColor: 'black' }}
                                        source={require('../Images/unarchive.png')}
                                    />
                                </TouchableOpacity>
                            </View>)
                            : (<View>
                                <TouchableOpacity onPress={() => this.handleArchive()}>
                                    <Image
                                        style={{ width: 20, height: 20, marginLeft: 15, marginVertical: 6 }}
                                        source={require('../Images/archive.png')}
                                    />
                                </TouchableOpacity>
                            </View>)
                    }
                </View>
                <ScrollView>
                    <View >
                        <TextInput
                            style={{ width: 300, paddingTop: 20, marginLeft: 20, fontWeight: 'bold', fontSize: 25 }}
                            placeholder='Title'
                            onChangeText={(title) => this.setState({ title })}
                            onSubmitEditing={() => this.note.focus()}
                            value={this.state.title}
                        />
                        <TextInput
                            style={{ width: 300, marginVertical: 5, marginLeft: 25, fontWeight: 'bold', fontSize: 20 }}
                            placeholder='Notes'
                            onChangeText={(note) => this.setState({ note })}
                            ref={(input) => this.note = input}
                            value={this.state.note}
                            multiline={true}
                        />
                    </View>
                    <TouchableOpacity onPress={this.showDialog}>
                        <Text style={{ fontSize: 20, color: 'green', marginLeft: 20 }}>{this.state.reminder}</Text>
                    </TouchableOpacity>
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
                    <Modal style={{ marginTop: 320 }}
                        isVisible={this.state.visible}
                        deviceHeight={310}
                        deviceWidth={deviceWidth}
                        onBackdropPress={() => this.setState({ visible: false })}
                    >
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.setDelete()}>
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
                                        source={require('../Images/collaborator.png')}
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

                            <View style={{ marginTop: 15 }}>
                                <FlatList horizontal={true}
                                    data={colorBox}
                                    renderItem={({ item }) => <View style={{ flexDirection: 'row' }}><TouchableOpacity onPress={() => this.handleColor(item.colorCode)}>
                                        <View style={{ backgroundColor: item.colorCode, marginLeft: 5, borderRadius: 25, height: 40, width: 40, borderColor: 'black', borderWidth: StyleSheet.hairlineWidth }}>
                                        </View>
                                    </TouchableOpacity>
                                    </View>}
                                />

                            </View>
                        </View>
                    </Modal>
                </View>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 40,


    },
    separetor: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(192,192,192,192)',
    },

});
