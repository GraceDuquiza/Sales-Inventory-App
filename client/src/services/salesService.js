import axios from 'axios';

export const getSales = () => axios.get('/api/sales');
export const addSale = (data) => axios.post('/api/sales', data);