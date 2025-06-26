import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from './SliderCaptcha.module.css'
import {
  type SliderCaptchaProps,
  type SliderVerifyData,
  type TrajectoryPoint,
  type VerifyResult
} from './types'
import {
  defaultVerifyRules,
  generateDeviceFingerprint,
  generateSessionId,
  generateSignature,
  validateTiming,
  validateTrajectory
} from './utils'

const SliderCaptcha: React.FC<SliderCaptchaProps> = ({
  width = 320,
  height = 42,
  onSuccess,
  onFail,
  onVerify,
  disabled = false,
  className = '',
  text = {
    default: '请拖动滑块完成验证',
    dragging: '请继续拖动滑块',
    success: '验证成功',
    failed: '验证失败，请重试'
  }
}) => {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState(0)
  const [status, setStatus] = useState<'default' | 'dragging' | 'success' | 'failed'>('default')
  const [trajectory, setTrajectory] = useState<TrajectoryPoint[]>([])
  const [startTime, setStartTime] = useState(0)
  const [sessionId] = useState(() => generateSessionId())
  
  const trackRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | undefined>(undefined)

  // 重置状态
  const reset = useCallback(() => {
    setPosition(0)
    setStatus('default')
    setTrajectory([])
    setStartTime(0)
    setIsDragging(false)
  }, [])

  // 开始拖拽
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled || status === 'success') return
    
    e.preventDefault()
    setIsDragging(true)
    setStatus('dragging')
    setStartTime(Date.now())
    setTrajectory([{
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    }])
  }, [disabled, status])

  // 拖拽移动
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !trackRef.current || disabled) return

    const rect = trackRef.current.getBoundingClientRect()
    const sliderWidth = 42
    const maxPosition = rect.width - sliderWidth
    const newPosition = Math.max(0, Math.min(e.clientX - rect.left - sliderWidth / 2, maxPosition))
    
    setPosition(newPosition)
    
    // 记录轨迹
    setTrajectory(prev => [...prev, {
      x: e.clientX,
      y: e.clientY,
      time: Date.now()
    }])

    // 检查是否完成
    if (newPosition >= maxPosition * 0.95) {
      handleComplete(newPosition)
    }
  }, [isDragging, disabled])

  // 完成拖拽
  const handleComplete = useCallback(async (finalPos: number) => {
    if (!trackRef.current) return
    
    const endTime = Date.now()
    const rect = trackRef.current.getBoundingClientRect()
    const sliderWidth = 42
    const maxPosition = rect.width - sliderWidth
    
    setIsDragging(false)
    
    // 检查是否拖拽到位
    if (finalPos < maxPosition * 0.95) {
      setStatus('failed')
      onFail('未完成拖拽')
      setTimeout(reset, 1500)
      return
    }

    // 验证轨迹和时间
    const trajectoryValidation = validateTrajectory(trajectory, defaultVerifyRules)
    if (!trajectoryValidation.valid) {
      setStatus('failed')
      onFail(trajectoryValidation.reason || '轨迹验证失败')
      setTimeout(reset, 1500)
      return
    }

    const timingValidation = validateTiming(startTime, endTime, defaultVerifyRules)
    if (!timingValidation.valid) {
      setStatus('failed')
      onFail(timingValidation.reason || '时间验证失败')
      setTimeout(reset, 1500)
      return
    }

    // 构建验证数据
    const verifyData: SliderVerifyData = {
      sessionId,
      timestamp: Date.now(),
      trajectory,
      startTime,
      endTime,
      finalPosition: finalPos,
      fingerprint: generateDeviceFingerprint(),
      signature: ''
    }
    
    // 生成签名
    verifyData.signature = generateSignature({
      ...verifyData,
      signature: undefined
    })

    // 如果有自定义验证函数，调用它
    if (onVerify) {
      try {
        const result: VerifyResult = await onVerify(verifyData)
        if (result.success) {
          setStatus('success')
          onSuccess(verifyData)
        } else {
          setStatus('failed')
          onFail(result.reason || '服务器验证失败')
          setTimeout(reset, 1500)
        }
      } catch (error) {
        setStatus('failed')
        onFail('验证请求失败')
        setTimeout(reset, 1500)
      }
    } else {
      // 默认通过
      setStatus('success')
      onSuccess(verifyData)
    }
  }, [trajectory, startTime, sessionId, onSuccess, onFail, onVerify, reset])

  // 结束拖拽
  const handleMouseUp = useCallback(() => {
    if (!isDragging) return
    
    if (status === 'dragging') {
      setStatus('failed')
      onFail('未完成验证')
      setTimeout(reset, 1500)
    }
    
    setIsDragging(false)
  }, [isDragging, status, onFail, reset])

  // 绑定全局事件
  useEffect(() => {
    if (isDragging) {
      const handleMove = (e: MouseEvent) => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        animationFrameRef.current = requestAnimationFrame(() => handleMouseMove(e))
      }
      
      document.addEventListener('mousemove', handleMove)
      document.addEventListener('mouseup', handleMouseUp)
      
      return () => {
        document.removeEventListener('mousemove', handleMove)
        document.removeEventListener('mouseup', handleMouseUp)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  // 获取当前显示文本
  const getCurrentText = () => {
    switch (status) {
      case 'dragging': return text.dragging
      case 'success': return text.success
      case 'failed': return text.failed
      default: return text.default
    }
  }

  // 获取滑块图标
  const getSliderIcon = () => {
    switch (status) {
      case 'success': return '✓'
      case 'failed': return '✗'
      default: return '→'
    }
  }

  return (
    <div 
      className={`${styles.captcha} ${className} ${disabled ? styles.disabled : ''}`}
      style={{ width }}
    >
      <div 
        ref={trackRef}
        className={`${styles.track} ${styles[status]}`}
        style={{ height }}
      >
        <div 
          className={`${styles.progress} ${styles[status]}`}
          style={{ width: position + 42 }}
        />
        
        <div 
          ref={sliderRef}
          className={`${styles.slider} ${styles[status]}`}
          style={{ 
            left: position,
            width: height,
            height: height
          }}
          onMouseDown={handleMouseDown}
        >
          {getSliderIcon()}
        </div>
        
        <div className={`${styles.text} ${styles[status]}`}>
          {getCurrentText()}
        </div>
      </div>
    </div>
  )
}

export default SliderCaptcha