import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file: File[]) => {
    const date = new Date();
    console.log(file)
    console.log(file[0])

    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${file[0].name}`);

        const uploadTask = uploadBytesResumable(storageRef, file[0], { contentType: file[0].type });

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                console.log("Image is uplouded", snapshot);
            },
            (error) => {
                reject("Something went wrong!" + error.code);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

export default upload;