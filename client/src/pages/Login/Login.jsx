import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../../AuthProvider/AuthProvider.jsx";
import Loading from "../../components/Loading/Loading.jsx";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, googleLogin, loading, setLoading } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await signInUser(data.email, data.password);
      console.log(res);
      Swal.fire({
        title: "Success!",
        text: "Sign in successfully",
        icon: "success",
        confirmButtonText: "Proceed",
      });
      setLoading(false);
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      setLoading(false);

      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };
  const handleLoginGoogle = async () => {
    try {
      setLoading(true);
      const res = await googleLogin();
      console.log(res);
      setLoading(false);
      navigate(location?.state ? location.state : "/");
    } catch (error) {
      //console.log(error);
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: { error },
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  // const handleLoginFacebook = () => {
  //   console.log("clicked");
  // };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div
          className='w-11/12 md:w-1/2 lg:w-1/3  mx-auto py-10 hero bg-transparent rounded-3xl my-20 border-2'
          style={{
            border: "2px solid #005B41",
            boxShadow: "0 5px 100px -20px #005B41",
          }}
        >
          <div className='hero-content flex-col'>
            <>
              <div className='text-center lg:text-left'>
                <h1 className='text-5xl font-bold my-5 text-secondary'>
                  Login now!
                </h1>
              </div>
              <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
                <form
                  className='card-body'
                  onSubmit={handleSubmit(handleLogin)}
                >
                  <div className='form-control'>
                    <input
                      type='email'
                      placeholder='Email'
                      className='input input-bordered'
                      name='email'
                      {...register("email", {
                        required: true,
                        pattern:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      })}
                    />
                    {errors.email?.type === "required" && (
                      <p className='text-red-600 text-xs mt-3 ml-3'>
                        Email is required
                      </p>
                    )}
                    {errors.email?.type === "pattern" && (
                      <p className='text-red-600 text-xs mt-3 ml-3'>
                        Provide a valid email
                      </p>
                    )}
                  </div>
                  <div className='form-control'>
                    <input
                      type='password'
                      placeholder='Password'
                      className='input input-bordered mt-4 tooltip text-left'
                      name='password'
                      data-tip='password must be grater than 6 characters and contain a capital letter and special character'
                      {...register("password", {
                        required: true,
                      })}
                    />
                    {errors.password?.type === "required" && (
                      <p className='text-red-600 text-xs mt-3 ml-3'>
                        Password is required
                      </p>
                    )}

                    <div className='flex flex-col'>
                      <label className='label'>
                        <p className='text-xs'>Not a member yet ?</p>
                        <Link
                          to='/registration'
                          className='label-text-alt link link-hover'
                        >
                          Register Here
                        </Link>
                      </label>
                    </div>
                  </div>
                  <div className='form-control mt-2 flex flex-col gap-4'>
                    <button
                      type='submit'
                      name='login'
                      className='btn btn-outline btn-secondary font-bold'
                    >
                      Login
                    </button>
                  </div>
                </form>
                <div className='w-10/12 mx-auto flex flex-col gap-y-4'>
                  <button
                    className='w-full btn btn-outline btn-secondary font-bold'
                    onClick={handleLoginGoogle}
                  >
                    <FaGoogle />
                    Sign UP with Google
                  </button>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
