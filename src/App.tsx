import "./App.css";
import { ZoneSurveillance } from "./pages/ZoneSurveillance";
import { Container, createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  /** Put your mantine theme override here */
});

function App() {
  return (
    <MantineProvider theme={theme}>
      <Container pt="20px" fluid bg="dark" h="100vh">
        <ZoneSurveillance
          zones={[
            {
              id: 1,
              name: "Zone 1",
              outside: false,
            },
            {
              id: 2,
              name: "Zone 2",
              outside: false,
            },
          ]}
        />
      </Container>
    </MantineProvider>
  );
}

export default App;
