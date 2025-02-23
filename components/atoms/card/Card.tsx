import Image from "next/image";
import { CardProps } from "@/types/Props";
import styles from "./Card.module.css";
import classNames from "classnames";

export default function Card(props: CardProps) {
  const { title, description, image, actions, children, onClick, className } =
    props;

  return (
    <div
      className={classNames(styles.cardWrapper, className)}
      onClick={onClick}
    >
      {image && (
        <div>
          <Image src={image} alt="card-image" />
        </div>
      )}
      <div className="flex flex-col items-start justify-start gap-2">
        <h2 className="w-full self-start">{title}</h2>
        <p>{"hihihihihihi"}</p>
        {description && <p>{description}</p>}
      </div>
      <div>{children}</div>
      {actions && <div>{actions}</div>}
    </div>
  );
}
