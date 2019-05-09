
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Card } from 'react-native-elements';

export default class CardPrint extends Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            click: false,
        }
    }

    press = () => {
        this.props.navigation.navigate('Edelete', { Show: this.props.Show, notekey: this.props.notekey });
    }

    longPress() {
        this.setState({ click: !(this.state.click) });
    }


    render() {

        var take = this.props.view ? (style.view1) : (style.view2);
        return (


            <View style={take}>
                <TouchableOpacity onPress={this.press.bind(this)}
                    onLongPress={() => this.longPress()}
                    activeOpacity={0.4} >
                    <Card containerStyle={{ backgroundColor: this.props.Show.color, borderRadius: 10 }}>
                        <View>
                            <View style={{ padding: 5 }}>
                                <Text>{this.props.Show.title}</Text>
                            </View>
                            <View style={{ padding: 5 }}>
                                <Text>{this.props.Show.note}</Text>
                            </View>
                            <View style={{ padding: 5 }}>
                                <Text>{this.props.Show.reminder}</Text>
                            </View>
                        </View>
                    </Card>
                </TouchableOpacity>
            </View>

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