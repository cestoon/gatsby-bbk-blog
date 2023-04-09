import React from "react";
import { Link } from "gatsby";
import * as styles from "./tag.module.css";
const _ = require("lodash")

const Tag = ({ tag }) => (
  <Link to={`/tags/${encodeURIComponent(tag)}`} className={styles.tag}>
    {tag}
  </Link>
);

export default Tag;