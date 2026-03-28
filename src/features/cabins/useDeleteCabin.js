import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() { 
   const queryClient = useQueryClient();
   const { mutate: deleteCabin, isPending: isDeleting } = useMutation({
     mutationFn: (id) => deleteCabinApi(id),
     // mutationFn:deleteCabin,  --> this also works because same argument is passed
     onSuccess: () => {
       toast.success("Cabin deleted");
       queryClient.invalidateQueries({
         queryKey: ["cabins"],
       });
     },
     onError: (error) => {
       toast.error(error.message);
     },
   });
  return {deleteCabin, isDeleting};
}