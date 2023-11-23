import { collection, getDocs, query, where, orderBy, addDoc, Timestamp, serverTimestamp } from 'firebase/firestore';
import { db } from "@/app/firebaseConfig"; 

interface FeedingData {
    selectedDay: string;
    selectedTime: string;
    selectedWho: string;
    selectedWhat: string;
    timestamp: Timestamp | Date;
}

export const addFeedingData = async (feedingData: FeedingData): Promise<void> => {
    try {
        // Use serverTimestamp() when adding data to Firestore
        const docRef = await addDoc(collection(db, 'feedingData'), {
            ...feedingData,
            timestamp: serverTimestamp(),
        });
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
        throw new Error('Failed to add feeding data');
    }
};

export const getFeedingData = async (): Promise<FeedingData[]> => {
    const querySnapshot = await getDocs(collection(db, 'feedingData'));
    const data = querySnapshot.docs.map((doc) => doc.data() as FeedingData);
    return data;
};

export const getFeedingDataLast7Days = async (): Promise<FeedingData[]> => {
    // Calculate the date 7 days ago
    const last7DaysAgo = new Date();
    last7DaysAgo.setDate(last7DaysAgo.getDate() - 7);

    // Create a query to fetch documents with a timestamp greater than or equal to the last 7 days
    const q = query(
        collection(db, 'feedingData'),
        where('timestamp', '>=', last7DaysAgo),
        orderBy('timestamp', 'desc') // Use 'asc' for chronological order
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data() as FeedingData);
    return data;
};
