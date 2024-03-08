import styles from "./card.module.css";
import Image from "../image/image";

function Card({ data }) {
    return <article className={styles.card}>
              <Image data={data} styles={styles.imgWrap} />
              <h2>{data.title}</h2>
              <p>{data.shortDescription}</p>
          </article>
}

export default Card;
