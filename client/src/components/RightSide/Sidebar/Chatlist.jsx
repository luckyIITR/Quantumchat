import React, { useEffect } from 'react'
import ChatlistItem from './ChatlistItem'
import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from "../../../store/actions/messengerAction";

function Chatlist() {
    const { friends } = useSelector(state => state.messenger);
    console.log(friends);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFriends());
    }, []);

    // jiska message opened hai uska unseen count zero kr dena
    let sample_data_1 = {
        profile_pic: "",
        isonline: true,
        name: "Lucky Kushwaha",
        last_msg: "Yeah, Sure!",
        unseen_msg_cnt: 0,
        last_msg_date: "06/01/2024",
        isopened: true
    }

    let sample_data_2 = {
        profile_pic: "",
        isonline: false,
        name: "Aman Gupta",
        last_msg: "Great!",
        unseen_msg_cnt: 2,
        last_msg_date: "Just now",
        isopened: false
    }

    let sample_data_3 = {
        profile_pic: "",
        isonline: false,
        name: "Gyan",
        last_msg: "Ha shaam tk ho jaayega mere wala uske baad dekhta hu",
        unseen_msg_cnt: 0,
        last_msg_date: "06/01/2024",
        isopened: false
    }
    return (
        
        <div class="flex-1 max-h-[75vh] overflow-auto px-2">
            <ChatlistItem data = {sample_data_1}/>
            <ChatlistItem data = {sample_data_2}/>
            <ChatlistItem data = {sample_data_3}/>
            <ChatlistItem data = {sample_data_3}/>
            <ChatlistItem data = {sample_data_3}/>
            <ChatlistItem data = {sample_data_3}/>
            <ChatlistItem data = {sample_data_3}/>
            <ChatlistItem data = {sample_data_3}/>
        </div>
    )       
}

export default Chatlist