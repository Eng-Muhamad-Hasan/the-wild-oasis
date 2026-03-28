import toast from "react-hot-toast";
import { updateSetting as updateSettingApi} from "../../services/apiSettings";
import { useMutation } from "@tanstack/react-query";

export function useUpdateSetting() {
  const { mutate:updateSetting, isPending: isUpdating } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      // We can do something here if we want
      toast.success("Setting updated successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateSetting, isUpdating };
 }