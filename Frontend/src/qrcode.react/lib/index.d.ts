import { CSSProperties } from 'react';

/**
 * @license qrcode.react
 * Copyright (c) Paul O'Shannessy
 * SPDX-License-Identifier: ISC
 */

declare type QRProps = {
    value: string;
    size: number;
    level: string;
    bgColor: string;
    fgColor: string;
    style?: CSSProperties;
    includeMargin: boolean;
    imageSettings?: {
        src: string;
        height: number;
        width: number;
        excavate: boolean;
        x?: number;
        y?: number;
    };
};
declare function QRCodeCanvas(props: QRProps): JSX.Element;
declare namespace QRCodeCanvas {
    var defaultProps: {
        size: number;
        level: string;
        bgColor: string;
        fgColor: string;
        includeMargin: boolean;
    };
}
declare function QRCodeSVG(props: QRProps): JSX.Element;
declare namespace QRCodeSVG {
    var defaultProps: {
        size: number;
        level: string;
        bgColor: string;
        fgColor: string;
        includeMargin: boolean;
    };
}
declare type RootProps = QRProps & {
    renderAs: string;
};
declare const QRCode: {
    (props: RootProps): JSX.Element;
    defaultProps: {
        size: number;
        level: string;
        bgColor: string;
        fgColor: string;
        includeMargin: boolean;
        renderAs: string;
    };
};

export { QRCodeCanvas, QRCodeSVG, QRCode as default };
