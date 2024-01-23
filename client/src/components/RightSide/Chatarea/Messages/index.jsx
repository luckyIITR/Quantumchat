import React, { useEffect, useRef } from 'react'
import Message from './Message'

function Messages() {
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when the component mounts
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts


    let sample_data_1 = {
        isme: false,
        msg: "Hey there. We would like to invite you over to our office for a visit. How about it?",
        timestamp: "15 April",
        isonline: true,
    }
    let sample_data_2 = {
        isme: false,
        msg: "All travel expenses are covered by us of course :D",
        timestamp: "15 April",
        isonline: true,
    }
    let sample_data_3 = {
        isme: true,
        msg: "It's like a dream come true",
        timestamp: "15 April",
        isonline: true,
    }
    return (
        <div class="messages flex-1 overflow-auto max-h-[75vh]" ref={messagesContainerRef}>
            <Message data={sample_data_1} />
            <Message data={sample_data_2} />
            
        </div>
    )
}

export default Messages