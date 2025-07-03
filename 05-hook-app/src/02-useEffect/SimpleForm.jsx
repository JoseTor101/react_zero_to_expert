import useForm from "../hooks/useForm";
const SimpleForm = () => {
  const { formState, onInputChange, onResetForm } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formState;

  return (
    <div>
      <h1>Formulario simple</h1>
      <hr />
      <form action="">
        <input
          type="text"
          className="form-control"
          name="username"
          placeholder="Username"
          autoComplete="username"
          value={username}
          onChange={onInputChange}
        />

        <input
          type="email"
          className="form-control"
          name="email"
          placeholder="Eg. jtordecilla@lwolf.com"
          autoComplete="email"
          value={email}
          onChange={onInputChange}
        />

        <input
          type="password"
          className="form-control"
          name="password"
          placeholder="Eg. 123214fgsdv"
          autoComplete="current-password"
          value={password}
          onChange={onInputChange}
        />

        <button className="btn btn-dark" onClick={(e)=>onResetForm(e)}>
          Reset
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;
