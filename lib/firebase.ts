import { collection, getDocs, Timestamp, query, where, orderBy, addDoc } from 'firebase/firestore';
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
        const docRef = await addDoc(collection(db, 'feedingData'), feedingData);
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding document: ', e);
        throw new Error('Failed to add feeding data');
    }
};

export const getFeedingData = async (): Promise<any[]> => {
    const querySnapshot = await getDocs(collection(db, 'feedingData'));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
};

export const getFeedingDataLast7Days = async (): Promise<any[]> => {
    // Calculate the date 7 days ago
    const last7DaysAgo = new Date();
    last7DaysAgo.setDate(last7DaysAgo.getDate() - 7);

    // Create a query to fetch documents with a timestamp greater than or equal to the last 7 days
    const q = query(
        collection(db, 'feedingData'),
        where('timestamp', '>=', last7DaysAgo),
        orderBy('timestamp', 'desc')
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
};
