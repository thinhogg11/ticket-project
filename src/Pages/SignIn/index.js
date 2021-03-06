import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useActions } from "../../actions/user.actions";
// import PropsTypes from "prop-types";
import Atoms from "../../component/MUI";
import History from "../../Helper/History";
import bgimg from "../../img/mountains.jpg";

function SignIn() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });
  // const [open, setOpen] = React.useState(false);
  const loggingIn = useSelector((state) => state.loginReduce.loggingFalse);

  const dispatch = useDispatch();
  const location = useLocation();

  function handleChange(e) {
    console.log(e.target.value);
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(user);
    if (user.username && user.password) {
      const { from } = location.state || { from: { pathname: "/" } };
      dispatch(useActions.login(user, from));
      History.push(from);
    }
  };
  return (
    <Atoms.Box
      height="88.5vh"
      style={{
        backgroundImage: `url(${bgimg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        position: "relative",
      }}
    >
      <Atoms.Box
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          width: "300px",
          height: "350px",
        }}
      >
        <Atoms.Grid container spacing={2}>
          <Atoms.Grid item xs={12}>
            <Atoms.Box display="flex" justifyContent="center">
              <Atoms.Typography variant="h4" style={{ fontWeight: 700 }}>
                Đăng Nhập
              </Atoms.Typography>
            </Atoms.Box>
          </Atoms.Grid>
          <Atoms.Grid item xs={12}>
            <Atoms.Box>
              <Atoms.TextField
                fullWidth
                variant="filled"
                name="username"
                size="small"
                label="Tài Khoản"
                onChange={handleChange}
              ></Atoms.TextField>
            </Atoms.Box>
          </Atoms.Grid>
          <Atoms.Grid item xs={12}>
            <Atoms.Box>
              <Atoms.TextField
                fullWidth
                variant="filled"
                name="password"
                size="small"
                label="Mật khẩu"
                type="password"
                onChange={handleChange}
                color="primary"
              />
            </Atoms.Box>
          </Atoms.Grid>
          <Atoms.Grid item xs={12}>
            <Atoms.Box display="flex" justifyContent="flex-end" width="100%">
              <Atoms.Link href="/registration">Đăng kí</Atoms.Link>
            </Atoms.Box>
          </Atoms.Grid>
          <Atoms.Grid item xs={12}>
            <Atoms.Box display="flex" justifyContent="center">
              <Atoms.Button
                variant="contained"
                style={{
                  backgroundImage: `linear-gradient(to right, #eba879 0%, #EAECC6 80%, #eba879 100%)`,
                }}
                onClick={handleSubmit}
              >
                Đăng Nhập
              </Atoms.Button>
            </Atoms.Box>
            <Atoms.Dialog
              open={loggingIn || false}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <Atoms.DialogTitle id="alert-dialog-title">
                {"Đã có lỗi khi đăng nhập"}
              </Atoms.DialogTitle>
              <Atoms.DialogContent>
                <Atoms.Typography color="error">
                  Thông tin đăng nhập không chính xác, vui lòng nhập lại, nếu
                  chưa có tài khoản vui lòng đăng kí tài khoản
                </Atoms.Typography>
              </Atoms.DialogContent>
              <Atoms.DialogActions>
                <Atoms.Button
                  color="primary"
                  onClick={() => dispatch(useActions.closeDialog())}
                >
                  Đóng
                </Atoms.Button>
                <Link
                  to="/registration"
                  onClick={() => dispatch(useActions.closeDialog())}
                >
                  Đăng ký
                </Link>
              </Atoms.DialogActions>
            </Atoms.Dialog>
          </Atoms.Grid>
        </Atoms.Grid>
      </Atoms.Box>
    </Atoms.Box>
  );
}

export default SignIn;
