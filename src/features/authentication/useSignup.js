import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: () => {
      toast.success(
        "User created successfully , please verify Client email to activate new account",
      );
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isPending };
}
