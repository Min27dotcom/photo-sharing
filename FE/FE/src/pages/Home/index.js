import UserList from "../../components/UserList";
import { getCookie } from "../../helpers/cookie";
import { Grid, Paper } from "@mui/material";

function HomePage() {
  const token = getCookie("token");

  return (
    <>
      <div>
        {token ? (
          <>
            
          </>
        ) : (
          <>Please Login</>
        )}
      </div>
    </>
  );
}

export default HomePage;
