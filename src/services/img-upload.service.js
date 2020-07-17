export const uploadImg = (ev) => {
    //Iris's cloudinary
    const UPLOAD_PRESET = 'pqi2nrli' //insert yours
    const CLOUD_NAME = 'des4awkkx' //insert yours
    const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const FORM_DATA = new FormData();
    FORM_DATA.append('file', ev.target.files[0])
    FORM_DATA.append('upload_preset', UPLOAD_PRESET)
    return fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.error(err))
}