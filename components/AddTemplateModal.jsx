import toast from "react-hot-toast";

const handleSubmit = async () => {
  try {
    // ... logic ...
    toast.success("Template created!");
  } catch (err) {
    toast.error(err.message || "Something went wrong.");
  }
};