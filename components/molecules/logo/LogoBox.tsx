import LogoEmoji from "@/components/atoms/logo/LogoEmoji";
import LogoText from "@/components/atoms/logo/LogoText";
import classNames from "classnames";

interface Props {
  text?: string;
  className?: string;
  onClick?: () => void;
}

const LogoBox = (props: Props) => {
  const { text, className, onClick } = props;
  return (
    <div
      className={classNames(
        className,
        "flex items-center justify-center h-full gap-2 cursor-pointer"
      )}
      onClick={onClick}
    >
      <LogoEmoji />
      <LogoText text={text} />
    </div>
  );
};

export default LogoBox;
