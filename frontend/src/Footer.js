const Footer = ({ length }) => {
  return (
    <footer>
      <p>
        {length} List {length === 1 ? "task" : "tasks"}
      </p>
    </footer>
  );
};

export default Footer;
