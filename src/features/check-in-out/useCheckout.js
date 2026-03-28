import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();
  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Bookind #${data.id} Checked Out successfully`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => {
      toast.error(`Booking could not be checked Out`);
    },
  });

  return { checkout, isCheckingOut };
}
