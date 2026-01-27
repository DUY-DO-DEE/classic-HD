/* ============================================
   MOVIE HUB - Firebase Config: duydodeesport
   ============================================ */

// 🔑 Your Real Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcCn0NGbakHmLEa_G47K8OepGaRqTV02Q",
  authDomain: "duydodeesport.firebaseapp.com",
  projectId: "duydodeesport",
  storageBucket: "duydodeesport.firebasestorage.app",
  messagingSenderId: "435929814225",
  appId: "1:435929814225:web:fcb01803d9e5b77340e1f0",
  measurementId: "G-JD1MFCNLY0"
};

// Initialize Firebase (Compat version for your HTML setup)
let app, db, auth, analytics;

try {
  // Initialize App
  app = firebase.initializeApp(firebaseConfig);
  
  // Initialize Services
  db = firebase.firestore();
  auth = firebase.auth();
  
  // Optional: Analytics (ถ้ามี)
  if (firebase.analytics) {
    analytics = firebase.analytics();
  }
  
  console.log("✅ Firebase Connected: duydodeesport");
  
  // Enable offline persistence
  db.enablePersistence({ synchronizeTabs: true })
    .catch(err => {
      if (err.code === 'failed-precondition') {
        console.log('Persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.log('Persistence not supported');
      }
    });
    
} catch (e) {
  console.error("❌ Firebase Error:", e);
  alert("เกิดข้อผิดพลาดในการเชื่อมต่อ Firebase: " + e.message);
}

// ... (เหลือโค้ดอื่นๆ เหมือนเดิม)