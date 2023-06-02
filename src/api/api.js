import axios from 'axios';


export const getAnswer = (question, province_id) => {return axios.post(`http://localhost:8000/getans/`, {'question': question, 'province_id': province_id})};

export const getSchool = (pro1, pro2, type, score) => {return axios.post(`http://localhost:8000/getschool/`, {'pro1': pro1, 'pro2': pro2, 'type':type, 'score':score})};