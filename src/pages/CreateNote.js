import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

import { createNotes } from '../Implementation';





export default class CreateNotes extends Component {

    static navigationOptions = { header: null };

    constructor() {
        super();
        this.state = {
            click: false,
            title: '',
            note: '',
        }
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
            createNotes(this.state.title, this.state.note);
            this.props.navigation.navigate('Drawer');
        } else
            this.props.navigation.navigate('Drawer');

    }


    render() {
        return (
            <View>
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

                    <TouchableOpacity>
                        <Image
                            style={{ width: 22, height: 22, marginLeft: 15, marginVertical: 6 }}
                            source={require('../Images/reminder.png')}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <Image
                            style={{ width: 20, height: 20, marginLeft: 15, marginVertical: 6 }}
                            source={require('../Images/achieve.png')}
                        />
                    </TouchableOpacity>
                </View>

                <View >
                    <TextInput
                        style={{ width: 300, paddingTop: 20, marginLeft: 20, fontWeight: 'bold', fontSize: 25 }}
                        placeholder='Title'
                        onChangeText={(title) => this.setState({ title })}
                        value={this.state.title}
                    />
                    <TextInput
                        style={{ width: 300, marginVertical: 5, marginLeft: 25, fontWeight: 'bold', fontSize: 15 }}
                        placeholder='Notes'
                        onChangeText={(note) => this.setState({ note })}
                        value={this.state.note}
                    />
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
    separetor: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(192,192,192,192)',
    },

});