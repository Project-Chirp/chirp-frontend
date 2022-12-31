import NavBar from "../components/NavBar";

const PageWrapper = (props: any) => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <NavBar />
        {props.children}
      </div>
    </>
  );
};

export default PageWrapper;
