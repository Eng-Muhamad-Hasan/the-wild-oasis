import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() { 
   const queryClient = useQueryClient();
   const { mutate: deleteBooking, isPending: isDeleting } = useMutation({
     mutationFn: (id) => deleteBookingApi(id),
     // mutationFn:deleteBooking,  --> this also works because same argument is passed
     onSuccess: () => {
       toast.success("Booking deleted successfully");
       queryClient.invalidateQueries({
         queryKey: ["bookings"],
       });
     },
     onError: () => {
       toast.error('Booking could not be deleted');
     },
   });
  return {deleteBooking, isDeleting};
}