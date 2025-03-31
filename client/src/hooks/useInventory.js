import { useEffect, useState } from 'react';
import { getInventory } from '../services/inventoryService';

export function useInventory() {
const [inventory, setInventory] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
    getInventory()
    .then(res => setInventory(res.data))
    .finally(() => setLoading(false));
}, []);

return { inventory, loading };
}
