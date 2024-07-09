import logo from "../asset/logo.png";

const Header = () => {
  return (
    <div className="flex justify-center items-center gap-3">
      <img src={logo} alt="todo-logo" className="w-20 h-20" />
      <h1 className="text-[#017bfe] text-4xl font-semibold">My Todo-s</h1>
    </div>
  );
};

export default Header;
