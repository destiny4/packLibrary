import React from 'react'
import styles from './index.scss'
import Icon from './icon.png'
import Ts from './ts'

export default ({ count = 0 }) => (
  <div>
    <img src={Icon} />
    <div className={styles.test}>我是生产环境输出的: {count}</div>
    <Ts />
  </div>
)
