import axios from 'axios';
import {FRIEND_GET_SUCCESS} from "../types/messengerType";

export const getFriends = () => async(dispatch) => {
     try{
          const response = await axios.get('http://localhost:5000/api/chat/');
          console.log(response);
           dispatch({
                type: FRIEND_GET_SUCCESS,
                payload : {
                     friends : response.data.friends
                }
           })

     }catch (error){
          console.log(error.response.data);
     }
}