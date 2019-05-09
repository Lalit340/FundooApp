
import React, { Component } from 'react';
import { Text, View, StyleSheet ,Image } from 'react-native';
import Modal from "react-native-modal";
import { editNotes, editReminder, editArchive, updatePin, editTrash } from '../Implementation';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class MultiSelect extends Component {

    constructor(props) {
        super(props);
        this.state = {
            view: this.props.view,
            trash:this.props.trash,
            
        }
    }

    handleTrash(){
        this.setState({
            trash: !(this.state.trash) ,
            view : !(this.state.view)
        });

        editTrash(this.state.trash , this.props.show,this.props.notekey);
     
    }

    back(){
        this.setState({
            view : false
        });
    }


    render() {

        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.back()}>
                        <Image
                            style={{ width: 25, height: 25, marginHorizontal: 15, marginVertical: 8 }}
                            source={require('../Images/leftArrow.png')}
                        />
                    </TouchableOpacity>
                 <TouchableOpacity onPress={() => this.handleTrash()}>
                    <Image
                        style={{ width: 25, height: 25, color: 'black',marginLeft: 35, marginVertical: 8  }}
                        source={require('../Images/delete.png')}
                    />
                    </TouchableOpacity>
                </View>
            </View>
            // <View>
            //     <Modal style={{ marginTop: 450 }}
            //         isVisible={this.state.view}
            //         deviceHeight={200}
            //         deviceWidth={420}
            //         onBackdropPress={() => this.setState({ view: !(this.state.view) })}

            //     >
            //         <View>
            //             <Text style={{ fontSize: 20, fontWeight: 'bold' }}> hiiiiiii </Text>
            //         </View>
            //     </Modal>
            // </View>

        );
    }
}
const styles = StyleSheet.create({

    container: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 40,
        width: '100%',
        backgroundColor: 'orange',

    },

})

