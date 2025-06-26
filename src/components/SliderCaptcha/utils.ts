import { type DeviceFingerprint, type TrajectoryPoint, type VerifyRules } from './types'

// 生成设备指纹
export const generateDeviceFingerprint = (): DeviceFingerprint => {
  return {
    userAgent: navigator.userAgent,
    screenWidth: screen.width,
    screenHeight: screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language
  }
}

// 生成会话ID
export const generateSessionId = (): string => {
  return `slider_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

// 简单的数据签名（实际项目中应使用更安全的方法）
export const generateSignature = (data: any): string => {
  const str = JSON.stringify(data)
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // 转换为32位整数
  }
  return Math.abs(hash).toString(16)
}

// 验证轨迹合理性
export const validateTrajectory = (
  trajectory: TrajectoryPoint[],
  rules: VerifyRules
): { valid: boolean; reason?: string } => {
  if (trajectory.length < rules.minTrajectoryPoints) {
    return { valid: false, reason: '轨迹点数不足' }
  }

  // 检查是否为完美直线（机器人特征）
  if (trajectory.length > 2) {
    let totalDeviation = 0
    const startY = trajectory[0].y
    
    for (let i = 1; i < trajectory.length - 1; i++) {
      totalDeviation += Math.abs(trajectory[i].y - startY)
    }
    
    const avgDeviation = totalDeviation / (trajectory.length - 2)
    if (avgDeviation < rules.maxDeviation) {
      return { valid: false, reason: '轨迹过于规整' }
    }
  }

  // 检查速度变化（简单检测匀速移动）
  if (trajectory.length > 3) {
    const speeds = []
    for (let i = 1; i < trajectory.length; i++) {
      const distance = Math.abs(trajectory[i].x - trajectory[i-1].x)
      const time = trajectory[i].time - trajectory[i-1].time
      if (time > 0) {
        speeds.push(distance / time)
      }
    }
    
    // 检查速度方差，过小表示匀速（机器人特征）
    if (speeds.length > 2) {
      const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length
      const variance = speeds.reduce((acc, speed) => acc + Math.pow(speed - avgSpeed, 2), 0) / speeds.length
      
      if (variance < 0.1) {
        return { valid: false, reason: '移动速度过于均匀' }
      }
    }
  }

  return { valid: true }
}

// 验证时间合理性
export const validateTiming = (
  startTime: number,
  endTime: number,
  rules: VerifyRules
): { valid: boolean; reason?: string } => {
  const duration = endTime - startTime
  
  if (duration < rules.minDuration) {
    return { valid: false, reason: '完成时间过快' }
  }
  
  if (duration > rules.maxDuration) {
    return { valid: false, reason: '完成时间过慢' }
  }
  
  return { valid: true }
}

// 默认验证规则
export const defaultVerifyRules: VerifyRules = {
  minDuration: 500,           // 最少500ms
  maxDuration: 10000,         // 最多10秒
  minTrajectoryPoints: 5,     // 最少5个轨迹点
  maxDeviation: 2             // 最大Y轴偏移2px
}