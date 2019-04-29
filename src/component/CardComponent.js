
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet, 
    TouchableOpacity,
 } from 'react-native';

import { Card } from 'react-native-elements';

export default class Display extends Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            click: false,
        }
    }

    // longPress() {
    //     this.setState({ click: !(this.state.click) });
    // }
 

    render() {

        var take = this.props.view ? (style.view1) : (style.view2);
        return (
            <View style={take}>  
                    <Card containerStyle={{ backgroundColor: '#ffff', borderRadius: 10 }}>
                        <View>
                            <View style={{ padding: 8 }}>
                                <Text>{this.props.display.title}</Text>
                            </View>
                            <View style={{ padding: 8 }}>
                                <Text>{this.props.display.note}</Text>
                            </View>
                            <View style={{ padding: 8 }}>
                                <Text>{this.props.display.reminder}</Text>
                            </View>
                        </View>
                    </Card>
             
            </View >
        );
    }
}

const style = StyleSheet.create({
    view1: {
        width: '50%'
    },
    view2: {
        width: '100%'
    },
});