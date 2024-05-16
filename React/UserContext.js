import React, { createContext, useState, useEffect } from 'react';
import { auth, firestore } from './firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser({
            uid: currentUser.uid,
            name: userData.name,
            email: userData.email,
            profilePic: userData.profilePic
          });
        }
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData();
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
