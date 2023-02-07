import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useDispatch } from "react-redux";
import { Formik } from "formik";

import { putPost } from "../redux/allSlices/postSlice";

export default function FormDialog({ setOpen, open, editData, setEditData }) {
  console.log(editData, "editData");
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handlePut = (values, editData) => {
    const id = editData._id;
    dispatch(putPost({ values, id }));
    handleClose();
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              firstName: editData.firstName ? editData.firstName : "",
              lastName: editData.lastName ? editData.lastName : "",
              phoneNumber: editData.phoneNumber ? editData.phoneNumber : "",
              age: editData.age ? editData.age : "",
            }}
            onSubmit={(values, editData) => {
              //   resetForm();
            }}

            //   validationSchema={}
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
                <div className="w-full flex flex-col justify-center items-center mb-10">
                  <div className="sm:w-full pl-5 pt-10 pr-10 lg:w-[500px] lg:h-[400px]">
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
                      </div>
                    </div>
                    <div className="flex justify-between mt-10">
                      <Button variant="contained" onClick={handleClose}>Cancel</Button>
                      <Button variant="contained" onClick={() => handlePut(values, editData)}>
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
}
