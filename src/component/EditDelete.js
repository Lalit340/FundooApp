import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';

import { editTrash, deleteNote } from '../config/Implementation';
import Modal from "react-native-modal";






export default class Editor extends Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            title: this.props.navigation.state.params.Show.title,
            note: this.props.navigation.state.params.Show.note,
            reminder: this.props.navigation.state.params.Show.reminder,
            click: this.props.navigation.state.params.Show.pin,
            visible: false,
            trash: this.props.navigation.state.params.Show.trash,
            archive: this.props.navigation.state.params.Show.archive,
            color: this.props.navigation.state.params.Show.color,
        }
    }






    back() {
        editTrash(this.state.trash, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
        this.props.navigation.goBack();

    }

    getModel() {
        this.setState({
            visible: true,
        });
    }

    setDelete() {
        deleteNote(this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
        this.props.navigation.goBack();

    }

    handleRestore = () => {
        this.setState({ trash: !this.state.trash });
        editTrash(this.state.trash, this.props.navigation.state.params.Show, this.props.navigation.state.params.notekey);
        this.props.navigation.goBack();
    }


    render() {
        const deviceWidth = Dimensions.get("window").width;
        const deviceHeight = Dimensions.get('window').height;

        return (
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => this.back()}>
                        <Image
                            style={{ width: 25, height: 25, marginHorizontal: 15, marginVertical: 8 }}
                            source={require('../Images/leftArrow.png')}
                        />
                    </TouchableOpacity>

                </View>
                <ScrollView>
                    <View >
                        <Text style={{ width: 300, paddingTop: 20, marginLeft: 20, fontWeight: 'bold', fontSize: 25 }}>
                            {this.state.title}</Text>
                        <Text style={{ width: 300, marginVertical: 5, marginLeft: 25, fontWeight: 'bold', fontSize: 20 }} >
                            {this.state.note} </Text>
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
                    <Modal style={{ marginTop: 530 }}
                        isVisible={this.state.visible}
                        deviceHeight={deviceHeight/1.27}
                        deviceWidth={deviceWidth}
                        onBackdropPress={() => this.setState({ visible: false })}
                    >
                        <View style={{ flex: 1 }}>
                            <TouchableOpacity onPress={() => this.handleRestore()}>
                                <View style={{ flexDirection: 'row', marginTop: 15 }}>

                                    <Image
                                        style={{ width: 30, height: 30, color: 'black', }}
                                        source={require('../Images/restore.png')}
                                    />
                                    <Text style={{ marginHorizontal: 10, fontSize: 25 }}> Restore  </Text>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.setDelete()}>
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>

                                    <Image
                                        style={{ width: 30, height: 30, color: 'black', }}
                                        source={require('../Images/delete.png')}
                                    />
                                    <Text style={{ marginHorizontal: 10, fontSize: 25 }}> Delete forever </Text>

                                </View>
                            </TouchableOpacity>

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
