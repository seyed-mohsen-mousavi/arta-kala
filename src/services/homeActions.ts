import api from "./api"

export const homeAboutUsList = async () => {
    try {
        const result = await api.get("/home/about-us/")
        return result
    } catch (error) {
        console.log(error)
    }
}
export const homeContactInfoList = async () => {
    try {
        const result = await api.get("/home/contact-info/")
        return result
    } catch (error) {
        console.log(error)
    }
}
export const homeGalleryList = async () => {
    try {
        const result = await api.get("/home/gallery/")
        return result.data
    } catch (error) {
        console.log(error)
    }
}