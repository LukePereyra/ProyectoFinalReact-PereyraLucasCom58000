import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig';

function ItemDetailContainer () {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { itemId } = useParams();
    
    useEffect(() => {
        const docRef = doc(db, 'Comidas', itemId);

        setLoading(true); 
        getDoc(docRef)
            .then(response => {
                const data = response.data();
                const productAdapted = { id: response.id, ...data };
                setProduct(productAdapted);
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false); 
            });
    }, [itemId]);

    return (
        <div className="ItemDetailContainer">
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <ItemDetail {...product} />
            )}
        </div>
    );
}

export default ItemDetailContainer;
