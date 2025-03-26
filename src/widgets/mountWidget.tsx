/* eslint-disable @typescript-eslint/no-explicit-any */
import "regenerator-runtime/runtime";
import '@/index.css'; 
import { createRoot } from 'react-dom/client';
import PROTEANPAN from "@/components/pan-rfp";

if (!(window as any).__MY_CUSTOM_WIDGET__) {
    (window as any).__MY_CUSTOM_WIDGET__ = true;
    const container = document.createElement('div');
    container.id = 'my-widget-root';
    container.style.zIndex = '9999999';
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(
        <PROTEANPAN />
    );
}
