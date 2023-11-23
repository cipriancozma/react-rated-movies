import { Grid, Header, Form, Segment, Button } from "semantic-ui-react";
import { useMutation } from "@tanstack/react-query";
import { mutationLogin } from "./mutation";
import { useNavigate } from "react-router-dom";

export const Auth = () => {
  const navigate = useNavigate();

  const { data, mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: mutationLogin,
  });

  console.log({ data });

  const handleLogin = async () => {
    await mutate();
    localStorage.setItem("sessionId", data?.guest_session_id);
    navigate("/");
  };

  return (
    <Grid textAlign="center" verticalAlign="middle" style={{ height: "100vh" }}>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as={"h2"} color="black" textAlign="center">
          Welcome! Login as a guest...
        </Header>
        <Form size="large">
          <Segment stacked>
            <Button size="large" fluid onClick={handleLogin}>
              Login
            </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  );
};
