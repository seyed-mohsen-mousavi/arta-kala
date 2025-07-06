import { addToast } from "@heroui/toast"
import api from "./api"

export const login = async (phone_number: string, password: string) => {
    try {
        const result = await api.post("/login/password", { phone_number, password });
        return result
    } catch (error) {
        addToast({
            title: "ورود ناموفق بود"
        })
    }
}
// otp
export const sendOtp = async (phone_number: string) => {
    try {
        const result = await api.post("/users/otp/request/", { phone_number })
        if (result.status == 200) {
            addToast({
                title: "کد تایید با موفیقت به شماره تلفن شما ارسال شد ",
                description: phone_number
            })
            return result

        } else if (result.status == 400) {
            addToast({
                title: "شماره تلفن باید ۱۱ رقم باشد",
                description: phone_number,
                color: "danger"
            })
        }
    } catch (error) {
        addToast({
            title: "ورود ناموفق بود"
        })
    }
}


export const verifyOtp = async (phone_number: string, code: string, referral_code?: string) => {
    try {
        const result = await api.post("/users/otp/verify/", { phone_number, code, referral_code: referral_code || "" }, {
            withCredentials: true
        })
        addToast({
            title: result.data.message || "ثبت نام با موفقیت تکمیل شد"
        })
        console.log(result)
        location.reload()
    } catch (error: any) {
        if (error?.response?.status === 400) {
            addToast({
                title: "کد تایید نامعتبر یا منقضی است",
                description: "دوباره تلاش کنید",
                classNames: { description: "text-xs" },
                color: "danger"
            })
        } else {
            addToast({
                title: "ورود ناموفق بود"
            })
        }

    }
}