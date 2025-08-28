import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";

const userTaskStore=create((set)=>({
    
task:[],
isCreatingTask:false,


doTask:async(Credential)=>{
    set({isCreatingTask:true})
    try {
        const response=await axios.post("/api/auth/do",Credential)
        set((state)=>({
            task:[...state.task,response.data.data],isCreatingTask:false
        }))
        
        toast.success("task created successfully")

        
    } catch (error) {
      toast.error(error?.response?.data?.message || "an error occurred");
      set({task:null, isCreatingTask:false})
        
    }

}






}))
export default userTaskStore;