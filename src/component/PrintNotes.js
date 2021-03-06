
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import MultiSelect from './MultiSelection';
import { Card } from 'react-native-elements';

export default class Print extends Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            click: false,
        }
    }

    // press = () => {
    //     this.props.navigation.navigate('Modify', { Show: this.props.Show, notekey: this.props.notekey });
    // }

    longPress() {
        this.setState({ click: !(this.state.click) });
    }


    render() {
        if (this.state.click) {
            var pick = this.props.view ? (styles.view1) : (styles.view2);
            return (
                <View style={pick} >
                    <View >
                        <MultiSelect view={this.state.click}/>
                    </View>
                    <TouchableOpacity  onLongPress={() => this.longPress()}
                        activeOpacity={0.4} >
                        <Card containerStyle={{ backgroundColor: this.props.Show.color, borderRadius: 10, borderColor: 'green' }}>
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
            )
        }

        var take = this.props.view ? (styles.view1) : (styles.view2);
        return (


            <View style={take} >
                <TouchableOpacity  onLongPress={() => this.longPress()}
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

const styles = StyleSheet.create({
    view1: {
        width: '50%'
    },
    view2: {
        width: '100%'
    },

});