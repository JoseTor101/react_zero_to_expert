export const fileUpload = async (file) => {
    //if (!file) throw new Error("No tenemos ningún archivo a subir");
    if(!file) return null;

    const cloudUrl = "https://api.cloudinary.com/v1_1/dyhqdgi7g/upload";

    const formData = new FormData();
    formData.append("upload_preset", "react-journal");
    formData.append("file", file);
    try {
        const resp = await fetch(cloudUrl, {
            method: "POST",
            body: formData,
        });

        if (!resp.ok) throw new Error("No se pudo subir la imagen");

        const cloudResp = resp.json();

        return cloudResp;
    } catch (error) {
        //throw new Error(error.message);
        return null;
    }
};
