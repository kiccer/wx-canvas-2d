export class WxCanvas2d {
    create(opts: {
        query: string;
        rootWidth?: number;
        bgColor?: string;
        component?: any;
        radius?: number;
    }) : Promise<void>;

    draw(opts: { series: ISerie[] }) : Promise<void>;
    clear(): void;

    save(opts: {
        x?: number;
        y?: number;
        width?: number;
        height?: number;
        destWidth?: number;
        destHeight?: number;
        modalOption?: {
            title?: string;
            content?: string;
            success?: (res: { confirm: boolean, cancel: boolean }) => void;
        };
    }) : Promise<{ tempFilePath: string }>;

    static use(plugin: IPlugin): void;
}

export interface ISerieType {
    name: string;
    handler: (config: Exclude<ISerie, 'type'>) => Promise<void>;
}

export interface IPlugin {
    name: string;
    handler: (opt: any) => void;
}

export interface ISerie {
    type: ISerieType;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    bgColor?: string;
    radius?: number;
    lineStyle?: {
        color?: string;
        width?: number;
        dash?: number[];
    };
    zIndex?: number;
    reverse?: boolean;
    r?: number;
    blur?: number;
    url?: string;
    mode?: string;
    text?: string;
    fontSize?: number;
    lineHeight?: number;
    ellipsis?: number;
    color?: string;
    align?: string;
    baseline?: string;
    fontWeight?: string;
    line?: { point: [number, number] }[];
    'line.point'?: [number, number];
    size?: number;
}

export const Arc: ISerieType;
export const Blur: ISerieType;
export const Image: ISerieType;
export const Line: ISerieType;
export const Qrcode: ISerieType;
export const Rect: ISerieType;
export const Text: ISerieType;

export const Debugger: IPlugin;
export const SaveToAlbum: IPlugin;
