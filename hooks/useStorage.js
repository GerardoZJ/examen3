// src/hooks/useStorage.js
import { useState, useEffect } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { firestoreApp, storageApp } from '../config/firebase';

const useStorage = (data) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(null);

  useEffect(() => {
    const storageRef = ref(storageApp, data.itemImage.name);
    const uploadTask = uploadBytesResumable(storageRef, data.itemImage);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        console.log(err);
      },
      async () => {
        const imgUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const createdAt = serverTimestamp();
        const collectionRef = collection(firestoreApp, 'auctions');
        await addDoc(collectionRef, { ...data, createdAt, imgUrl });
        setIsCompleted(true);
      }
    );
  }, [data]);

  return { progress, isCompleted };
};

export default useStorage;
