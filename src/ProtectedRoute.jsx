import styled from "styled-components";
import { useUser } from "./features/authentication/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./ui/Spinner";

const FullPageLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-gray-50);
`;

function ProtectedRoute({ children }) {
  // 1. Check if user is authenticated
  const { isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  // 2. If not, redirect to login page
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [isAuthenticated, isPending, navigate],
  );
  if (isPending)
    return (
      <FullPageLoading>
        <Spinner />
      </FullPageLoading>
    );

  // 3. If yes, render children
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
