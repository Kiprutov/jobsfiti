import { db } from "@/lib/firebase/config";
import { collection, addDoc, getDocs, query, where, serverTimestamp } from "firebase/firestore";

export type Category = {
  id: string;
  label: string;
};

const CATEGORIES_COLLECTION = "categories";

export async function getCategories(): Promise<Category[]> {
  const colRef = collection(db, CATEGORIES_COLLECTION);
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.get("id") || d.id, label: d.get("label") || d.id }));
}

export async function addCategory(rawLabel: string): Promise<Category> {
  const label = rawLabel.trim();
  if (!label) throw new Error("Category label is required");
  const id = label.toLowerCase().replace(/\s+/g, "-");

  // prevent duplicates by label id
  const colRef = collection(db, CATEGORIES_COLLECTION);
  const existing = await getDocs(query(colRef, where("id", "==", id)));
  if (!existing.empty) return { id, label };

  await addDoc(colRef, { id, label, createdAt: serverTimestamp() });
  return { id, label };
}
