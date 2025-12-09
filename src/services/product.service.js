import {db} from "../firebase/config.js";
import {productModel} from "../models/product.model.js";
import { collection, getDoc,getDocs,doc, deleteDoc,updateDoc, addDoc } from "firebase/firestore";

const collectionName = "products";

export const getAllProducts = async ()=>{
    const productsCollection = collection(db,collectionName);
    const snapshot = await getDocs(productsCollection);

    if(snapshot.empty) return [];

    return snapshot.docs.map(doc => new productModel({id: doc.id, ...doc.data()}));
};

export const getProductById = async (id)=>{
    const docRef = doc(db,collectionName,id);
    const docSnap = await getDoc(docRef);

    if(!docSnap.exists()) return null;

    return new productModel({id: docSnap.id, ...docSnap.data()});
};

export const createProduct = async (productData)=>{
    if(!productData.nombre || !productData.precio) {
        throw new Error("Nombre y precio son campos obligatorios")
    }

    const productsCol = collection(db, collectionName);
    const docRef = await addDoc(productsCol, {
        nombre: productData.nombre,
        precio: Number(productData.precio),
        stock: Number(productData.stock || 0),
        descripcion: productData.descripcion || "",
        categoria: productData.categoria || ""
    })
    return new productModel({id: docRef.id , ...productData});
};

export const deleteProduct = async (id) => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()) return null;

    await deleteDoc(docRef);
    return true;
};

export const updateProduct =async (id, data) => {
    const docRef = doc(db,collectionName,id);
    const docSnap = await getDoc(docRef)

    if(!docSnap.exists()) return null;

    await updateDoc(docRef, data);

    return{id, ...docSnap.data(), ...data }
};