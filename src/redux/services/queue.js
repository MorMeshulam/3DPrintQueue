import axios from 'axios';
import {NODE_SERVER} from '../../config/secrets';

export const getQueue = () => {
    return axios.get(`${NODE_SERVER}/queue`).then(res => {
        if (res.status == 200) {
            console.log('successfuly get queue data', res);

            return {
                ok: true, data: res.data
            }
        }
        else {
            return {
                ok: false
            }
        }
    });
}

export const call = (opperation, data) => {
    return axios.post(`${NODE_SERVER}/queue/${opperation}`, data).then(res => {
        if (res.status == 200) {
            console.log(`successfuly queue opperation: ${opperation}`);
            return {
                ok: true
            }
        }
        else {
            return {
                ok: false
            }
        }
    });
}
