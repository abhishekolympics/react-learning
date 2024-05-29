import Heading from "./components/Heading";

function App() {
  return (
    <>
      <Heading
        val="This sentence is passed via prop."
        newval="2 times hierarchy"
      />
    </>
  );
}

export default App;
