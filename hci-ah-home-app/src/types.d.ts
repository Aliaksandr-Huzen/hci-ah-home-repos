declare interface Window {
    __ENV: { [index: string]: string }
}

/// <reference types="react-scripts" />

declare module '*.scss' {
    const content: { [className: string]: string }
    export default content
}

declare module '*.jp2'
declare module '*.webp'
declare module '*.png'
