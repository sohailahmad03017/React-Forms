import app from "./firebaseConfig";
import { getAuth, createUserWithEmailAndPassword,  onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, onValue, push, } from "firebase/database";

const auth = getAuth(app);
const db = getDatabase(app);


const user = auth.currentUser;

//Sign Up user with Email and Password
const signUpUser = ({ name, email, password, category}) => {

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User Successfully Registered
        const user = userCredential.user;
        const userId = user.uid;
        //Sending data in database
        set(ref(db, 'users/' + userId), {
          username: name,
          email: email,
          uid: userId,
          category: category,
        })
          .then(() => { resolve("User Created Successfuly and data is also sent in database") })
          .catch(() => { reject('User created but data is not added in database') });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(errorMessage);
      })
  })
}

//Login User with Email and Password
const signInUser = ({ email, password }) => {

  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        onValue(ref(db, `users/${user.uid}`), (e) => {
          let status = e.exists();
          status ? resolve(e.val()) : reject('Data not Found')
        })
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject("Sign In Failed")
      })
  })
}

// Is user Logged In
let checkUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        resolve(uid);
      } else {
        reject("No User Logged In");
      }
    });
  });
};

//Log Out Function
let signOutUser = ()=>{
  return new Promise((resolve, reject) => {
    signOut(auth).then(() => {
       resolve(auth)
    }).catch((error) => {
       reject(error)
    });
  })

}

// //Sending data in database
// const sendData = (dataObj, uid) => {
//   return new Promise((resolve, reject) => {
//     // Create a new post reference with an auto-generated id
//     const db = getDatabase();
//     const postListRef = ref(db, `notes/${uid}`);
//     const newPostRef = push(postListRef);
//     set(newPostRef, dataObj)
//       .then(() => { resolve('Data Sent') })
//       .catch(() => { reject('Sending Failed') })
//   })
// } 


let sendData = (data, nodeName) => {
  return new Promise((resolve, reject) => {
    const postListRef = ref(db, `${nodeName}/`);
    // const newPostRef = push(postListRef);
    set(postListRef, data)
      .then(() => {
        resolve("Data Sent Successfully")
      })
      .catch((error) => {
        reject(error)
      })
  })
}

let sendDataWithId = (nodeName, data) => {
  return new Promise((resolve, reject) => {
    const postListRef = ref(db, `${nodeName}/`);
    const newPostRef = push(postListRef);
    data.id = push(postListRef).key;
    set(newPostRef, data)
      .then(() => {
        resolve("Data Sent Successfully")
      })
      .catch((error) => {
        reject(error)
      })
  })
}

let getData = (nodeName) => {
  return new Promise((resolve, reject) => {
    const starCountRef = ref(db, `${nodeName}/`);
    onValue(starCountRef, (snapshot) => {
      const data = Object.values(snapshot.val());
      data ? resolve(data) : reject("Data not Found");
    })
  })
}

let getDataFull = (nodeName) => {
  return new Promise((resolve, reject) => {
    const starCountRef = ref(db, `${nodeName}/`);
    onValue(starCountRef, (snapshot) => {
      resolve(snapshot.val())
    })
  })
}

export { signUpUser, signInUser, sendData, sendDataWithId, getData,getDataFull, checkUser , signOutUser}