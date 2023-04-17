import React, { useContext, useEffect } from "react";
import {View,StyleSheet,Text,Dimensions} from 'react-native';
import Screen from '../components/Screen';
import color from "../misc/color";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import PlayerButton from "../components/PlayerButton";
import { AudioContext } from "../context/AudioProvider";
import {
    changeAudio,
    moveAudio,
    pause,
    play,
    playNext,
    resume,
    selectAudio,
  } from '../misc/AudioController';
import { convertTime, storeAudioForNextOpening } from "../misc/helper";

const { width } = Dimensions.get('window');

const Player = () => {
    const context =useContext(AudioContext)
    const {playbackPosition,playbackDuration} = context
    
    const calculateSeebBar = () =>{
        if(playbackPosition !== null && playbackDuration !==null){
            return playbackPosition / playbackDuration;
        }
        return 0
    }

    useEffect(() => {
        context.loadPreviousAudio()
    }, [])

    const handlePlayPause = async () => {
        await selectAudio(context.currentAudio,context)

    }

   const handleNext = async() => {
    await changeAudio(context,'next')
        
    }

    const handlePrevious = async() => {
        await changeAudio(context,'previous')
        
    }

    const renderCurrentTime = () =>{
       return convertTime(context.playbackPosition/1000)
    }

    if(!context.currentAudio) return null

    return <Screen >
        <View style={styles.container}> 
            <Text style={styles.audioCount}>{`${context.currentAudioIndex + 1}/${context.totalAudioCount}`}</Text>
            <View style={styles.midBannerContainer}>
                <MaterialCommunityIcons
                name='music-circle'
                size={300}
                color={context.isPlaying ? color.ACTIVE_BG : color.FONT_MEDIUM}
                />
            </View>
            <View style={styles.audioPlayerContainer}>
                <Text numberOfLines={1} style={styles.audioTitle}>
                    {context.currentAudio.filename}
                </Text>
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingHorizontal:15,}}>
                    <Text>{convertTime(context.currentAudio.duration)}</Text>
                    <Text>{renderCurrentTime()}</Text>
                </View>
                <Slider
                    style={{width:width,height:40}}
                    minimumValue={0}
                    maximumValue={1}
                    value = {calculateSeebBar()}
                    minimumTrackTintColor={color.FONT_MEDIUM}
                    maximumTrackTintColor={color.ACTIVE_BG}
                />
                <View style={styles.audioControllers}>
                    <PlayerButton iconType='PREV' onPress={handlePrevious} />
                    <PlayerButton onPress={handlePlayPause} style={{marginHorizontal: 30}} iconType={context.isPlaying ? 'PLAY' :'PAUSE'} />
                    <PlayerButton iconType='NEXT' onPress={handleNext} />
                </View>
            </View>
        </View>
    </Screen>
}

const styles = StyleSheet.create({
    audioControllers: {
      width,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
    },
    audioCountContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
    },
    container: {
      flex: 1,
    },
    audioCount: {
      textAlign: 'right',
      color: color.FONT_LIGHT,
      fontSize: 14,
    },
    midBannerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    audioTitle: {
      fontSize: 16,
      color: color.FONT,
      padding: 15,
    },
  });
  

export default Player;