// js/venue.js
import { db, auth } from "./firebase-config.js";
import { addDoc, collection, serverTimestamp } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

export async function registerVenue(data) {
  if (!auth.currentUser) {
    alert("Silakan login terlebih dahulu");
    window.location.href = "login.html";
    return;
  }

  await addDoc(collection(db, "venues"), {
    ownerId: auth.currentUser.uid,
    venueName: data.venueName,
    sportType: data.sportType,
    description: data.description,
    pricePerHour: data.price,
    ownerName: data.ownerName,
    ownerEmail: data.ownerEmail,
    ownerPhone: data.ownerPhone,
    address: data.address,
    city: data.city,
    createdAt: serverTimestamp(),
    status: "pending"
  });

  alert("Venue berhasil didaftarkan!");
  window.location.href = "dashboard.html";
}
