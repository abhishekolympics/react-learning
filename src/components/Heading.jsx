import Paragraph from "./Paragraph";

function Heading(props) {
  return (
    <>
      <p>1 time hierarchy = {props.val}</p>
      <Paragraph value={props.newval} />
    </>
  );
}

export default Heading;
