import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
} from "firebase/firestore";

const useFirestore = (collectionName, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        if (!condition.fieldPath || !condition.operator || !condition.value) {
            return;
        }

        const q = query(
            collection(db, collectionName),
            where(condition.fieldPath, condition.operator, condition.value),
            orderBy("createdAt", condition.sortBy)
        );

        // Listen to collection to get realtime updates
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const documents = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setDocuments(documents);
        });
        return () => {
            unsubscribe();
        };
    }, [collectionName, condition]);
    return documents;
};

export default useFirestore;
