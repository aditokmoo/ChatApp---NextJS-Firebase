import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from 'uuid';

const upload = async (file: File[], setProgress: (progress: number) => void) => {
    const date = new Date();
    console.log(file)
    console.log(file[0])

    console.log(uuidv4())
    console.log(uuidv4)

    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `images/${uuidv4()}-${file[0].name}`);

        const uploadTask = uploadBytesResumable(storageRef, file[0], { contentType: file[0].type });

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setProgress(progress)
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