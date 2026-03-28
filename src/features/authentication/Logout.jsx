import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <ButtonIcon onClick={()=>logout()} disabled={isPending}>
     {isPending ? <SpinnerMini /> : <HiArrowLeftOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
