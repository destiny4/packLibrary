import React, { FC } from 'react';
interface Props {
    title?: string;
    headerRender?: React.ReactNode;
    renderFromTop?: boolean;
    headerStyle?: React.CSSProperties;
    titleStyle?: React.CSSProperties;
    allowBack?: boolean;
    backAction?: (...args: any[]) => void;
    backIcon?: React.ReactNode;
    fixed?: boolean;
}
declare const Navigation: FC<Props>;
export default Navigation;
