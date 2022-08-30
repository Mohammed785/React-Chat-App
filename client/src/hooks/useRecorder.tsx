import { useEffect, useState } from "react";


interface IMediaState{
    init:boolean;
    data:Blob|null;
    mediaStream:MediaStream|null;
    mediaRecorder:MediaRecorder|null;
}

const initialState = {init:false,data:null,mediaStream:null,mediaRecorder:null}

function useRecorder(){
    const [mediaState,setMediaState] = useState<IMediaState>(initialState)
    
    useEffect(()=>{
        if(mediaState.mediaStream){
            setMediaState({...mediaState,mediaRecorder:new MediaRecorder(mediaState.mediaStream)})
        }
    },[mediaState.mediaStream])
    
    useEffect(()=>{
        if(mediaState.mediaRecorder){
            const recorder = mediaState.mediaRecorder
            let chunks:Blob[] = []
            if(recorder&&recorder.state==="inactive"){
                recorder.start()
                recorder.ondataavailable = (e)=>{
                    chunks.push(e.data)
                }
                recorder.onstop = ()=>{
                    const blob = new Blob(chunks,{type:"audio/ogg; codec=opus"})
                    chunks = []
                    if(mediaState.mediaRecorder){
                        setMediaState({...mediaState,data:blob,init:false})
                    }else{
                        setMediaState(initialState)
                    }
                }
            }
            return ()=>{recorder.stream.getAudioTracks().forEach(track=>track.stop())}
        }
    },[mediaState.mediaRecorder])
    
    const startRecord = async()=>{
        try {
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
                const stream = await navigator.mediaDevices.getUserMedia({audio:true})
                setMediaState((prev)=>{
                    return {...prev,init:true,mediaStream:stream}
                })
            }
        } catch (error) {
            console.error(error)
        }
    }
    
    const stopRecord = ()=>{
        mediaState.mediaRecorder?.stop()
        mediaState.mediaStream?.getAudioTracks().forEach(track=>track.stop())
    }
    return {mediaState,setMediaState,startRecord,stopRecord}
}

export default useRecorder;