
        
// --- General Admin Data ---

export const ADMIN_LOGIN_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/0d83e8f1-bf03-4c02-9237-b199e5e6fac4.png",
};

// --- Dashboard Data ---

export type DashboardStatModel = {
  title: string;
  value: string;
  unit: string;
  iconName: string;
  trend: "up" | "down" | "flat";
};

export const ADMIN_DASHBOARD_STATS: DashboardStatModel[] = [
  {
    title: "今日入库快件",
    value: "1,520",
    unit: "件",
    iconName: "PackagePlus",
    trend: "up",
  },
  {
    title: "待分拣快件",
    value: "45",
    unit: "件",
    iconName: "ListFilter",
    trend: "flat",
  },
  {
    title: "设备活跃度",
    value: "98.5",
    unit: "%",
    iconName: "Gauge",
    trend: "up",
  },
  {
    title: "系统公告",
    value: "2",
    unit: "条",
    iconName: "Megaphone",
    trend: "down",
  },
];

// --- Package Management Data ---

export type PackageRecordStatus = "Inbound" | "Sorting" | "AwaitingPickup" | "Outbound" | "Delivered";

export type PackageRecordModel = {
  trackingNumber: string;
  status: PackageRecordStatus;
  entryTime: string;
  exitTime: string | null;
  sortingStatus: string;
  shelfLocation: string;
  customerName: string;
};

export const MOCK_PACKAGE_RECORDS: PackageRecordModel[] = [
  {
    trackingNumber: "ZYWK20251124001",
    status: "AwaitingPickup",
    entryTime: "2025-11-23 15:30",
    exitTime: null,
    sortingStatus: "完成分拣",
    shelfLocation: "A-5-12A",
    customerName: "张三",
  },
  {
    trackingNumber: "ZYWK20251124002",
    status: "Sorting",
    entryTime: "2025-11-24 09:10",
    exitTime: null,
    sortingStatus: "分拣中",
    shelfLocation: "传送带-3",
    customerName: "李四",
  },
  {
    trackingNumber: "ZYWK20251124003",
    status: "Delivered",
    entryTime: "2025-11-23 11:45",
    exitTime: "2025-11-23 16:05",
    sortingStatus: "完成分拣",
    shelfLocation: "已出库",
    customerName: "王五",
  },
  {
    trackingNumber: "ZYWK20251124004",
    status: "Inbound",
    entryTime: "2025-11-24 10:05",
    exitTime: null,
    sortingStatus: "待分拣",
    shelfLocation: "入口扫描区",
    customerName: "赵六",
  },
];

export type TimelineEventModel = {
  timestamp: string;
  location: string;
  description: string;
};

export const MOCK_PACKAGE_TIMELINE: TimelineEventModel[] = [
  {
    timestamp: "2025-11-23 11:45:00",
    location: "入口扫描区",
    description: "快件入库，系统登记。",
  },
  {
    timestamp: "2025-11-23 13:00:00",
    location: "分拣中心",
    description: "智能传送带开始初次分拣。",
  },
  {
    timestamp: "2025-11-23 15:30:00",
    location: "智能货架 A-5-12A",
    description: "ROS机器人完成入架存储，待取件。",
  },
  {
    timestamp: "2025-11-24 10:30:15",
    location: "取件口",
    description: "用户张三刷脸核验成功，快件已出库。",
  },
];

// --- Device Monitoring Data ---

export enum DeviceTypeEnum {
  CONVEYOR = "智能传送带",
  ROS_ROBOT = "ROS机器人",
  SMART_SHELF = "智能货架",
}

export type DeviceStatusModel = {
  deviceId: string;
  name: string;
  type: DeviceTypeEnum;
  status: "Normal" | "Fault" | "Maintenance";
  location: string;
  criticalAlerts: number;
  lastUpdated: string;
};

export const MOCK_DEVICE_STATUS: DeviceStatusModel[] = [
  {
    deviceId: "CV001",
    name: "主分拣传送带",
    type: DeviceTypeEnum.CONVEYOR,
    status: "Normal",
    location: "分拣区中央",
    criticalAlerts: 0,
    lastUpdated: "2025-11-24 10:50",
  },
  {
    deviceId: "RB003",
    name: "ROS机器人-Alpha",
    type: DeviceTypeEnum.ROS_ROBOT,
    status: "Fault",
    location: "货架区 B-12",
    criticalAlerts: 1,
    lastUpdated: "2025-11-24 10:35",
  },
  {
    deviceId: "SH010",
    name: "智能货架-10",
    type: DeviceTypeEnum.SMART_SHELF,
    status: "Normal",
    location: "存储区东",
    criticalAlerts: 0,
    lastUpdated: "2025-11-24 10:55",
  },
];

export type PerformanceMetricModel = {
  name: string;
  value: string;
  unit: string;
};

export type AlertModel = {
  timestamp: string;
  level: "Error" | "Warning" | "Info";
  description: string;
};

export const MOCK_DEVICE_PERFORMANCE: PerformanceMetricModel[] = [
  { name: "运行时长", value: "360", unit: "小时" },
  { name: "平均吞吐量", value: "500", unit: "件/小时" },
  { name: "电机温度", value: "45", unit: "°C" },
];

export const MOCK_DEVICE_ALERTS: AlertModel[] = [
  { timestamp: "2025-11-24 10:35:10", level: "Error", description: "机器人RB003：左侧驱动轮编码器故障。" },
  { timestamp: "2025-11-24 08:00:05", level: "Warning", description: "传送带CV001：摩擦力系数低于阈值，建议维护。" },
];

export type RFIDLocationModel = {
  tagId: string; // Corresponds to tracking number
  location: [number, number]; // [Shelf Row Index, Grid Column Index]
  packageDesc: string;
  lastSeen: string;
};

export const MOCK_RFID_DATA: RFIDLocationModel[] = [
  { tagId: "ZYWK20251124001", location: [5, 12], packageDesc: "小型文件袋", lastSeen: "2分钟前" },
  { tagId: "ZYWK20251124005", location: [1, 3], packageDesc: "中型包裹", lastSeen: "5分钟前" },
  { tagId: "ZYWK20251124010", location: [8, 20], packageDesc: "大型电商箱", lastSeen: "10分钟前" },
];

export type DeviceLogModel = {
  timestamp: string;
  level: "INFO" | "WARN" | "ERROR";
  component: string;
  message: string;
};

export const MOCK_DEVICE_LOGS: DeviceLogModel[] = [
  { timestamp: "2025-11-24 10:55:00", level: "INFO", component: "SH010", message: "光电感应器响应正常，货架自检通过。" },
  { timestamp: "2025-11-24 10:35:15", level: "ERROR", component: "RB003", message: "运动控制系统异常：左侧驱动故障，已停车。" },
  { timestamp: "2025-11-24 10:30:00", level: "INFO", component: "CV001", message: "处理快件 ZYWK20251124001，目标区域 A-5。" },
];

export type MaintenancePlanModel = {
  planId: string;
  deviceId: string;
  deviceName: string;
  scheduledDate: string;
  assignee: string;
  status: "Scheduled" | "InProgress" | "Completed";
  description: string;
};

export const MOCK_MAINTENANCE_PLANS: MaintenancePlanModel[] = [
  {
    planId: "MNT001",
    deviceId: "CV001",
    deviceName: "主分拣传送带",
    scheduledDate: "2025-11-30",
    assignee: "工程师 A",
    status: "Scheduled",
    description: "年度例行润滑和传感器校准。",
  },
  {
    planId: "MNT002",
    deviceId: "RB003",
    deviceName: "ROS机器人-Alpha",
    scheduledDate: "2025-11-24",
    assignee: "工程师 B",
    status: "InProgress",
    description: "紧急维修左侧驱动轮故障。",
  },
];

// --- User Management Data ---

export type UserVerificationType = "Face" | "Code" | "Phone";

export type UserModel = {
  userId: string;
  name: string;
  phone: string;
  pickupCount: number;
  deliveryCount: number;
  lastVerificationType: UserVerificationType;
  lastVerificationTime: string;
};

export const MOCK_USER_MANAGEMENT_DATA: UserModel[] = [
  {
    userId: "U001",
    name: "张三",
    phone: "138****1234",
    pickupCount: 15,
    deliveryCount: 3,
    lastVerificationType: "Face",
    lastVerificationTime: "2025-11-24 10:30",
  },
  {
    userId: "U002",
    name: "李四",
    phone: "139****5678",
    pickupCount: 8,
    deliveryCount: 1,
    lastVerificationType: "Code",
    lastVerificationTime: "2025-11-23 18:45",
  },
  {
    userId: "U003",
    name: "王五",
    phone: "135****9012",
    pickupCount: 22,
    deliveryCount: 5,
    lastVerificationType: "Phone",
    lastVerificationTime: "2025-11-22 09:20",
  },
];

export const MOCK_USER_ACTIVITY_STAT_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/d38add2a-da94-41e1-bbbb-1a0e8751a8f2.png",
};

// --- Settings Data ---

export type ServiceRuleModel = {
  key: string;
  description: string;
  value: string;
  unit: string;
  iconName: string;
};

export const MOCK_SERVICE_RULES: ServiceRuleModel[] = [
  {
    key: "delivery_price_standard",
    description: "标准寄件起步价格",
    value: "12.00",
    unit: "元/首重",
    iconName: "DollarSign",
  },
  {
    key: "max_storage_days",
    description: "快件最长免费存储天数",
    value: "7",
    unit: "天",
    iconName: "CalendarDays",
  },
  {
    key: "face_verification_retry",
    description: "人脸识别失败重试次数上限",
    value: "3",
    unit: "次",
    iconName: "UsersRound",
  },
];

export type AnnouncementModel = {
  id: number;
  title: string;
  content: string;
  releaseDate: string;
  isUrgent: boolean;
};

export const MOCK_ANNOUNCEMENTS: AnnouncementModel[] = [
  {
    id: 1,
    title: "设备维护通知：分拣机器人RB003临时停机",
    content: "因机器人RB003突发故障，我们将于今日11:00-14:00进行紧急维护。在此期间，部分快件分拣速度可能略有延迟。",
    releaseDate: "2025-11-24 10:40",
    isUrgent: true,
  },
  {
    id: 2,
    title: "寄件服务价格调整公告",
    content: "为提升服务质量，标准快递服务价格将从下月1日起上调1元。",
    releaseDate: "2025-11-15 09:00",
    isUrgent: false,
  },
];

export const MOCK_DEVICE_MONITORING_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/396ba4dd-1ef8-43f9-bd9b-1d93a34f0ccf.png",
};

export const MOCK_ROS_ROBOT_DETAIL_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/9fabebfd-97e7-466c-a128-743bcf1c0c59.png",
};

export const MOCK_RFID_VISUALIZATION_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/588372af-e3e7-4de7-a43d-8777ca925a09.png",
};

export const MOCK_MAINTENANCE_SCHEDULE_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/0621d9c3-a3ce-4b5d-9df8-90da91fd6045.png",
};
        
      