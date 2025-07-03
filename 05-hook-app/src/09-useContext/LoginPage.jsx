import React from "react";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";

const LoginPage = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <h3>LoginPage</h3>
      <hr />
      <pre aria-label="pre">{JSON.stringify(user, null, 3)}</pre>

      <button
        className="btn btn-primary"
        onClick={() =>
          setUser({ id: 123, name: "Juan", email: "juan@google.com" })
        }
      >
        Establecer usuario
      </button>
    </div>
  );
};

export default LoginPage;
