import { Card, Grid, Paper } from "@mui/material";
import UserList from "../../components/UserList";
import { Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import TopBar from "../../components/TopBar";

function UserPage() {
  const token = getCookie("token");
  const authen = useSelector((state) => state.authenReducer);

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {token && authen ? (
              <>
                <TopBar />
              </>
            ) : (
              <></>
            )}
          </Grid>
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              {token && authen ? (
                <>
                  <UserList />
                </>
              ) : (
                <>
                  <Card
                    style={{
                      width: "1100px",
                      height: "400px",
                      fontSize: "50px",
                      paddingTop: "70px",
                      paddingLeft: "70px",
                      fontWeight: "600",
                      color: "#006400",
                    }}
                  >
                    Please Login!
                  </Card>
                </>
              )}
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              {token && authen ? (
                <>
                  <Outlet />
                </>
              ) : (
                <></>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

export default UserPage;
