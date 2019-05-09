
import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { getData } from '../Implementation';
import CardPrint from './CardDelete';

export default class Deleted extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: false,
            note: []

        }
    }
    componentDidMount() {

        getData(arr => {
            if (arr) {
                this.setState({
                    note: arr,
                });
            } else {
                this.setState({
                    note: [],
                })
            }
        })
    }
    getClick() {
        this.setState({ click: !(this.state.click) });
      }

    render() {
        var arrData, key, data;
        arrData = Object.keys(this.state.note).map((note) => {
            key = note;
            data = this.state.note[key];
            if (data.trash === true && data.archive !== true) {
                return (
                    <CardPrint Show={data}
                        notekey={key}
                        view={this.state.click}
                        navigation={this.props.navigation}
                    />

                )
            }
        });

        return (
            <View style={{ flex: 1 }} >
                <View style={styles.container1}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())}>
                        <Image
                            style={{ width: 30, height: 30, marginHorizontal: 20, marginVertical: 6 }}
                            source={require('../Images/menu.png')}
                        />
                    </TouchableOpacity>


                    <Text style={styles.textEdit} >Deleted</Text>
                    <Text>                                                         </Text>

                    {
                        this.state.click ?
                            (<View>
                                <TouchableOpacity onPress={() => this.getClick()}>
                                    <Image
                                        style={{ width: 30, height: 30, marginVertical: 6 }}
                                        source={require('../Images/rectangle.png')}
                                    />
                                </TouchableOpacity>
                            </View>)
                            : (<View>
                                <TouchableOpacity onPress={() => this.getClick()}>
                                    <Image
                                        style={{ width: 30, height: 30,  marginVertical: 6 }}
                                        source={require('../Images/squar.png')}
                                    />
                                </TouchableOpacity>
                            </View>)
                    }
                    <Text>   </Text>
                    <TouchableOpacity >
                        <Image
                            style={{ width: 25, height: 25, marginVertical: 8 }}
                            source={require('../Images/dot_menu.png')}
                        />
                    </TouchableOpacity>

                </View>

                <ScrollView>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                        {arrData}
                    </View>
                </ScrollView>

                <View style={{ flex: 1 }}></View>


            </View >

        );

    }
}

const styles = StyleSheet.create({

    container1: {
        flexDirection: 'row',
        marginVertical: 15,
        marginHorizontal: 10,
        borderRadius: 20,
        height: 40,
        width: 390,

        backgroundColor: '#e57373',
    },




    textEdit: {
        marginVertical: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
});