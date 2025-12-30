// js/booking.js
import { db, auth } from "./firebase-config.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function bookField(fieldId, time) {
  if (!auth.currentUser) {
    alert("Silakan login terlebih dahulu");
    window.location.href = "login.html";
    return;
  }

  await addDoc(collection(db, "bookings"), {
    userId: auth.currentUser.uid,
    fieldId: fieldId,
    time: time,
    status: "booked",
    createdAt: new Date()
  });

  alert("Booking berhasil!");
  window.location.href = "dashboard.html";
}
