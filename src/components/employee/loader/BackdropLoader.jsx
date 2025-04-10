const BackdropLoader = ({ loading }) => (
    <Backdrop open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
  