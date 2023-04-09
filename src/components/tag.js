import React from "react";
import { Link } from "gatsby";
import * as styles from "./tag.module.css";

const Tag = ({ tag }) => (
  <Link to={`/tags/${tag}`} className={styles.tag}>
    {decodeURIComponent(tag)}
  </Link>
);

export default Tag;