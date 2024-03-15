function Image({ data, styles }) {
  return (
    <figure className={styles}>
      <img alt={data.sites[0].title} src={data.sites[0].logoSmall2x} />
    </figure>
  );
}

export default Image;
