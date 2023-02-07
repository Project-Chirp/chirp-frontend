import NavBar from "../components/NavBar/NavBar";

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
