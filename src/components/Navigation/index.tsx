import { View, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import React, { FC, useEffect, useState } from 'react';
import backIconUrl from '@/assets/navigation/back-icon.png';
import '@/styles/Navigation.scss'
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
    (async () => {
      const { statusBarHeight, system } = await Taro.getSystemInfo();
      const isIos = system.indexOf('IOS') > -1;
      const navHeight = isIos ? 48 : 44;
      setNavHeight(navHeight);
      setStatusBarHeight(statusBarHeight);
    })();
  }, []);
  return [statusBarHeight, navHeight];
}

function handleBack () {
  Taro.navigateBack();
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
    <View className='wiiMp nav-bar'>
      <View
        className='nav-bar-header'
        style={{
          position: fixed ? 'fixed' : 'absolute',
          top: 0,
          height: `${navHeight + statusBarHeight}PX`,
          paddingTop: `${statusBarHeight}PX`,
          ...headerStyle,
        }}
      >
        <View
          style={{
            height: `${navHeight}PX`,
            lineHeight: `${navHeight}PX`,
            ...titleStyle,
          }}
          className='title'
        >
          {allowBack ? (
            <Image
              onClick={backAction}
              className='back-icon'
              src={backIcon}
            ></Image>
          ) : null}
          {headerRender || title}
        </View>
      </View>
      <View
        className='nav-bar-content'
        style={
          {
            paddingTop: renderFromTop ? 0 :`${statusBarHeight + navHeight}PX`
          }
        }
      >
        {children}
      </View>
    </View>
  );
};

export default Navigation;
