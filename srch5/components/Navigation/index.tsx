// import { div, img } from '@tarojs/components';
// import Taro from '@tarojs/taro';
import React, { FC, useEffect, useMemo, useState } from 'react';
import backIconUrl from '../../assets/navigation/back-icon.png';
import styles from './index.scss';
interface Props {
  // 标题
  title?: string;
  // 自定义渲染内容
  headerRender?: React.ReactNode;
  // content区域 是否从顶部开始渲染
  renderFromTop?: boolean;
  // headerStyle
  headerStyle?: React.CSSProperties;
  // titleStyle
  titleStyle?: React.CSSProperties;
  // 回退按钮
  allowBack?: boolean;
  // 自定义回退行为
  backAction?: (...args: any[]) => void;
  // 自定义回退按钮
  backIcon?: React.ReactNode;
  // 固定于顶部
  fixed?: boolean;
}
/**
 * 获取 状态栏高度 和 导航栏的高度
 * @returns
 */
function useTop () {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [navHeight, setNavHeight] = useState(0);
  useEffect(() => {
    ( () => {
      const { statusBarHeight, system } ={statusBarHeight:25,system:'IOS'} //await Taro.getSystemInfo();
      const isIos = system.indexOf('IOS') > -1;
      const navHeight = isIos ? 48 : 44;
      setNavHeight(navHeight);
      setStatusBarHeight(statusBarHeight);
    })();
  }, []);
  return [statusBarHeight, navHeight];
}

function handleBack () {
  // Taro.navigateBack();
  console.log('back')
}
const Navigation: FC<Props> = props => {
  const [statusBarHeight, navHeight] = useTop();
  const {
    renderFromTop = false,
    headerRender,
    title,
    children,
    headerStyle = {},
    titleStyle = {},
    allowBack = false,
    fixed = false,
    backIcon=backIconUrl,
    backAction=handleBack
  } = props;  

  return (
    <div className={styles['nav-bar']}>
      <div
        className={styles['nav-bar-header']}
        style={{
          position: fixed ? 'fixed' : 'absolute',
          top: 0,
          height: `${navHeight + statusBarHeight}PX`,
          paddingTop: `${statusBarHeight}PX`,
          ...headerStyle,
        }}
      >
        <div
          style={{
            height: `${navHeight}PX`,
            lineHeight: `${navHeight}PX`,
            ...titleStyle,
          }}
          className={styles['title']}
        >
          {allowBack ? (
            <img
              onClick={backAction}
              className={styles['back-icon']}
              src={backIcon}
            ></img>
          ) : null}
          {headerRender || title}
        </div>
      </div>
      <div
        className={styles['nav-bar-content']}
        style={
          {
            paddingTop: renderFromTop ? 0 :`${statusBarHeight + navHeight}PX`
          }
        }
      >
        {children}
      </div>
    </div>
  );
};

export default Navigation;
