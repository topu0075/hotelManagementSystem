import axios from "axios";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Loading from "../../components/Loading/Loading";

const Registration = () => {
  const { createUser, googleLogin, profileUpdate, loading, setLoading } =
    useContext(AuthContext);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const addUser = async (email, name) => {
    const userData = {
      name: name,
      email: email,
      badge: "Bronze",
      role: "user",
    };
    const response = await axios.post(
      `${process.env.REACT_BASE_URL}/users`,
      userData
    );
    console.log(response?.data?.insertedId);
    console.log(response);
    if (response?.data?.insertedId !== null) {
      Swal.fire({
        title: "Success!",
        text: "Registration Successful",
        icon: "success",
        confirmButtonText: "Proceed",
      });
      setLoading(false);
      navigate("/", 0);
    } else {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: response?.data?.message.toUpperCase(),
        icon: "error",
        confirmButtonText: "try again",
      });
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await createUser(data.email, data.password);
      console.log(res);
      await profileUpdate(data.name, data.url);
      addUser(data.email, data.name);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "try again",
      });
      setLoading(false);
    }
  };
  const handleLoginGoogle = async () => {
    try {
      const res = await googleLogin();
      console.log(res?.user?.email);
      addUser(res?.user?.email, res?.user?.displayName);
    } catch (error) {
      setLoading(false);
      Swal.fire({
        title: "Error!",
        text: { error },
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    console.log("clicked");
  };
  // const handleLoginFacebook = async () => {
  //   try {
  //     const res = await faceBookLogin();
  //     console.log(res?.user?.email);
  //     addUser(res?.user?.email, res?.user?.displayName);
  //   } catch (error) {
  //     setLoading(false);
  //     Swal.fire({
  //       title: "Error!",
  //       text: { error },
  //       icon: "error",
  //       confirmButtonText: "Cool",
  //     });
  //   }
  //   console.log("clicked");
  //   console.log("clicked");
  // };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <div
          className='w-11/12 md:w-1/2 lg:w-1/3 mx-auto py-10 hero bg-transparent rounded-2xl my-20  border-2'
          style={{
            border: "2px solid #005B41",
            boxShadow: "0 5px 100px -20px #005B41",
          }}
        >
          <div className='hero-content flex-col'>
            <div className='text-center lg:text-left'>
              <h1 className='text-3xl lg:text-5xl font-bold my-5 text-secondary'>
                Register now!
              </h1>
            </div>
            <div className='card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
              <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-control'>
                  <input
                    type='Text'
                    placeholder='Name'
                    className='input input-bordered mt-3 mb-4'
                    name='name'
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      Name is required
                    </p>
                  )}

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

                  <input
                    type='password'
                    placeholder='Password'
                    className='input input-bordered mt-4 tooltip text-left'
                    name='password'
                    data-tip='password must be grater than 6 characters and contain a capital letter and special character'
                    {...register("password", {
                      required: true,
                      pattern: /^(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <p className='text-red-600 text-xs mt-3 ml-3'>
                      Password is required
                    </p>
                  )}
                  {errors.password?.type === "pattern" && (
                    <p className='text-red-600 text-xs mt-3 ml-3'>
                      Password must be grater than 6 characters and contain a
                      capital letter and special character
                    </p>
                  )}
                  <input
                    type='Text'
                    placeholder='Profile Pic URL'
                    className='input input-bordered mt-3 mb-4'
                    name='url'
                    {...register("url", { required: true })}
                  />
                  {errors.url?.type === "required" && (
                    <p className='text-red-600 text-xs mb-3 ml-3'>
                      Profile Picture URL is required
                    </p>
                  )}
                </div>

                <div className='flex flex-col'>
                  <label className='label'>
                    <p className='text-xs'>Already a member?</p>
                    <Link
                      to='/login'
                      className='label-text-alt link link-hover'
                    >
                      Login Here
                    </Link>
                  </label>
                </div>
                <div className='form-control mt-2'>
                  <button className='btn btn-secondary btn-outline text-white'>
                    Register
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
          </div>
        </div>
      )}
    </>
  );
};

export default Registration;
