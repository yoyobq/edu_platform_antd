// src/hooks/useResponsiveFontSize.ts
import { useCallback, useEffect } from 'react';

// 防抖函数
function debounce(func: Function, wait: number) {
  let timeout: number;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function useResponsiveFontSize(baseSize = 16) {
  const setFontSize = useCallback(() => {
    const width = window.innerWidth;
    const dpr = window.devicePixelRatio || 1;

    let scale = 1;

    // 基于屏幕宽度的缩放
    if (width <= 1280) {
      scale = 0.85;
    } else if (width <= 1439) {
      scale = 0.9;
    } else if (width <= 1599) {
      scale = 1;
    } else if (width <= 1919) {
      scale = 1.05;
    } else if (width <= 2559) {
      scale = 1.1;
    } else {
      // 4K 及以上
      scale = 1.2;
    }

    // 基于 DPR 的额外缩放（避免重复处理）
    if (dpr >= 1.5) {
      // 高 DPR 设备（如 4K 显示器）
      scale *= 1.2;
    } else if (dpr >= 1.2) {
      // 中等 DPR 设备（如 2K 显示器 125% 缩放）
      scale *= 1.1;
    }

    const fontSize = Math.round(baseSize * scale * 100) / 100; // 保留两位小数
    document.documentElement.style.fontSize = `${fontSize}px`;
    document.documentElement.setAttribute('data-font-size', `${fontSize}`);
  }, [baseSize]);

  useEffect(() => {
    // 使用防抖优化性能
    const debouncedSetFontSize = debounce(setFontSize, 150);

    // 初始化和监听 resize
    setFontSize();
    
    // 监听 resize
    window.addEventListener('resize', debouncedSetFontSize);
    
    return () => {
      window.removeEventListener('resize', debouncedSetFontSize);
    };
  }, [setFontSize]);
}
