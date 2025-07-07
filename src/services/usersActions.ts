
import { addToast } from "@heroui/toast"
import api from "./api"

export const login = async (phone_number: string, password: string) => {
    try {
        const result = await api.post("/users/login/password/", { phone_number, password });
        console.log(result)
        return result
    } catch (error: any) {
        if (error?.response?.status === 401) {
            addToast({
                title: "شماره تلفن یا رمز عبور اشتباه است",
                description: "لطفاً اطلاعات ورود خود را بررسی کرده و دوباره تلاش کنید."
            })
        } else {
            addToast({
                title: "ورود ناموفق بود"
            })
        }

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
// dashboard
export const GetUserDashboard = async (cookie: string) => {
    try {
        const result = await api.get("/users/dashboard/", {
            headers: {
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUxODg0NzUxLCJpYXQiOjE3NTE4ODM1NTEsImp0aSI6ImVlNzhhMWVlYzA5MjQyZWVhOTNkNmQzMDg4MWQ2NjMwIiwidXNlcl9pZCI6MX0.wVcJ4tEgMw2Dg3zPrV4UGUskMy9A3RFDN0yEF7sX9cs`
            }
        })
        return result.data
    } catch (error: any) {
        console.log(error?.response?.message || error);
        // throw new Error(error.message || 'Unknown error');
    }

}
