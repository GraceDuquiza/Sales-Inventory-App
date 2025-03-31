import axios from 'axios'

export const testConnection = () => axios.get('/api/test')
