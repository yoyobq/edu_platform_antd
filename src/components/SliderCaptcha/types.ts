// 轨迹点数据
export interface TrajectoryPoint {
  x: number
  y: number
  time: number
}

// 设备指纹信息
export interface DeviceFingerprint {
  userAgent: string
  screenWidth: number
  screenHeight: number
  timezone: string
  language: string
}

// 滑块验证数据
export interface SliderVerifyData {
  sessionId: string
  timestamp: number
  trajectory: TrajectoryPoint[]
  startTime: number
  endTime: number
  finalPosition: number
  fingerprint: DeviceFingerprint
  signature: string
}

// 验证结果
export interface VerifyResult {
  success: boolean
  token?: string
  reason?: string
  retryAfter?: number
}

// 组件属性
export interface SliderCaptchaProps {
  width?: number
  height?: number
  onSuccess: (data: SliderVerifyData) => void
  onFail: (reason: string) => void
  onVerify?: (data: SliderVerifyData) => Promise<VerifyResult>
  disabled?: boolean
  className?: string
  text?: {
    default: string
    dragging: string
    success: string
    failed: string
  }
}

// 验证规则配置
export interface VerifyRules {
  minDuration: number        // 最小拖拽时间（毫秒）
  maxDuration: number        // 最大拖拽时间（毫秒）
  minTrajectoryPoints: number // 最小轨迹点数
  maxDeviation: number       // 最大偏移容差
}