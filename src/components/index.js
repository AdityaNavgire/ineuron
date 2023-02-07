import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik } from "formik";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import * as Yup from "yup";
import {
  createPost,
  getPost,
  deletePost,
  reset,
} from "../redux/allSlices/postSlice";
import PopUp from "../components/PopUp";

const Dashboard = () => {
  const { isLoading, post, error, flag, isDeleted, isCreated, isUpdated } =
    useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  useEffect(() => {
    if (isDeleted.length > 0 || isCreated || isUpdated) {
      dispatch(getPost());
    }
    return () => {
      dispatch(reset());
    };
  }, [dispatch, isDeleted, isCreated, isUpdated]);
  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);
  console.log(post, "post");

  console.log(post, "post");
  const validation = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    lastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phoneNumber: Yup.string()
      .required("Required")
      .matches(/^\d+$/, "The field should have digits only"),
    age: Yup.string()
      .required("Required")
      .matches(/^\d+$/, "The field should have digits only"),
  });

  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          phoneNumber: "",
          age: "",
        }}
        onSubmit={(values, { resetForm }) => {
          dispatch(createPost({ values }));
          resetForm();
        }}

          validationSchema={validation}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="w-full flex flex-col justify-center items-center mt-10 mb-10">
              <div className="sm:w-full pl-5 pt-10 pr-10 lg:w-[500px] lg:h-[500px] lg:shadow-lg">
                <h5>Add User Details</h5>
                <div className="mt-3">
                  <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="firstName"
                    value={values.firstName}
                  />
                  {errors.firstName && touched.firstName ? (
                    <p className="text-red-500">{errors.firstName}</p>
                  ) : null}
                </div>

                <div className="mt-10">
                  <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="lastName"
                    value={values.lastName}
                  />
                  {errors.lastName && touched.lastName ? (
                    <p className="text-red-500">{errors.lastName}</p>
                  ) : null}
                </div>

                <div className="flex">
                  <div className="mt-10 w-2/3">
                    <TextField
                      id="outlined-basic"
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="phoneNumber"
                      value={values.phoneNumber}
                    />
                    {errors.phoneNumber && touched.phoneNumber ? (
                      <p className="text-red-500"> {errors.phoneNumber}</p>
                    ) : null}
                  </div>
                  <div className="mt-10 w-1/3 ml-10">
                    <TextField
                      id="outlined-basic"
                      label="Age"
                      variant="outlined"
                      fullWidth
                      onChange={handleChange}
                      name="age"
                      value={values.age}
                    />
                    {errors.age && touched.age ? <p className="text-red-500">{errors.age}</p> : null}
                  </div>
                </div>
                <div className="mt-10 flex flex-row-reverse">
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </div>
              </div>

              {post?.length > 0
                ? post?.map((item) => (
                    <div className="sm: w-full  pl-5 flex justify-between p-10 shadow-lg h-[50px] lg:w-[500px] lg:h-[50px] lg:shadow-lg ">
                      {/* {console.log(item, "item")} */}

                      <p className="sm:mr-10">{item.firstName}</p>
                      <p className="sm:mr-[10px]">{item.lastName}</p>
                      <p className="sm:mr-[10px]">{item.phoneNumber}</p>
                      <p className="sm:mr-[104px]">{item.age}</p>

                      <div>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            setOpen(true);
                            setEditData(item);
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </div>
                      <div>
                        <IconButton
                          aria-label="delete"
                          // eslint-disable-next-line no-undef
                          onClick={() => dispatch(deletePost(item._id))}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </form>
        )}
      </Formik>
      {open && (
        <PopUp
          open={open}
          setOpen={setOpen}
          editData={editData}
          setEditData={setEditData}
        />
      )}
      {/* <Loader/> */}
    </>
  );
};

export default Dashboard;
