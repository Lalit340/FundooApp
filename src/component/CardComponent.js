
import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements';
import { editSelect } from '../config/Implementation';

export default class Display extends Component {
    static navigationOptions = { header: null };

    constructor(props) {
        super(props);
        this.state = {
            click: false,
        }
    }

    press = () => {
        this.props.navigation.navigate('Modify', { Show: this.props.Show, notekey: this.props.notekey });
    }

    longPress() {
        this.setState({ click: !(this.state.click) });
        editSelect(this.state.click, this.props.Show, this.props.notekey);
    }


    render() {
        if (this.state.click && this.props.Show.select) {
            var pick = this.props.view ? (styles.view1) : (styles.view2);
            return (
                <View style={pick} >

                    <TouchableOpacity onLongPress={() => this.longPress()}>
                        <Card containerStyle={{ backgroundColor: this.props.Show.color, borderRadius: 10, borderColor: 'green' }}>
                            <View>
                                <Text style={{ padding: 5 }}>{this.props.Show.title}</Text>
                                <Text style={{ padding: 5 }}>{this.props.Show.note}</Text>
                                {this.props.Show.reminder ?
                                    (<View>
                                        <Text style={{ padding: 5 }}>{this.props.Show.reminder}</Text>
                                    </View>)
                                    : (<View>
                                    </View>)
                                }
                            </View>
                        </Card>
                    </TouchableOpacity>

                </View>
            )
        }

        var take = this.props.view ? (styles.view1) : (styles.view2);
        return (


            <View style={take} >
                <TouchableOpacity onPress={this.press.bind(this)}
                    onLongPress={() => this.longPress()}
                    activeOpacity={0.4} >
                    <Card containerStyle={{ backgroundColor: this.props.Show.color, borderRadius: 10 }}>
                        <View>
                            <Text style={{ padding: 5 }}>{this.props.Show.title}</Text>
                            <Text style={{ padding: 5 }}>{this.props.Show.note}</Text>
                            {this.props.Show.reminder ?
                                (<View>
                                    <Text style={{ padding: 5 }}>{this.props.Show.reminder}</Text>
                                </View>)
                                : (<View>
                                </View>)
                            }
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