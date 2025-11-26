const PICKUP_OPTIONS = [
  {
    id: "face",
    title: "刷脸取件",
    description: "通过人脸识别快速验证身份取件。",
    iconName: "ScanFace"
  },
  {
    id: "code",
    title: "输入取件码",
    description: "通过输入取件码验证。",
    iconName: "KeyRound"
  },
  {
    id: "phone",
    title: "手机号验证",
    description: "通过验证注册手机号取件。",
    iconName: "Smartphone"
  }
];
const MOCK_FACE_VERIFICATION = {
  status: "success",
  message: "人脸核验成功，正在检索您的快件...",
  previewImageUrl: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/ea9b2379-055e-412a-81d4-49d0ef090bd6.png"
};
const MOCK_PACKAGE_LOCATION = {
  trackingNumber: "ZYWK20251124001",
  shelfId: "A-5",
  gridId: "12A",
  estimatedPickupTime: "预计取件时间：45秒",
  robotStatus: "Retrieving",
  locationMapUrl: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/03712bb7-283d-4e09-ad43-02508165a9e8.png"
};
const MOCK_PICKUP_RECEIPT = {
  trackingNumber: "ZYWK20251124001",
  pickupTime: "2025-11-24 10:30:15",
  operator: "ROS-Robot-Alpha",
  message: "您的快件已成功取出，感谢使用智取未来服务。"
};
const HOMEPAGE_SERVICE_NAV = [
  {
    title: "取件服务",
    description: "刷脸/取件码/手机号取件",
    iconName: "PackageOpen",
    url: "/pickup"
  },
  {
    title: "寄件预约",
    description: "在线填写信息，预约上门取件",
    iconName: "Send",
    url: "/delivery"
  },
  {
    title: "快件查询",
    description: "输入单号或手机号查看状态",
    iconName: "Search",
    url: "/query"
  },
  {
    title: "网点信息",
    description: "查看地址、服务时间和帮助",
    iconName: "MapPin",
    url: "/info"
  }
];
const HOMEPAGE_BANNER_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/ee32f298-ec59-4816-b2da-0aec4fa50c24.png"
};
const CLIENT_LOGIN_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/1bef77be-a72d-464f-ac51-af27006e2591.png"
};
const CLIENT_DASHBOARD_PROFILE_AVATAR = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/26/9989ec0a-07a6-415c-b9e4-e42fd0c2ff53.png"
};
const DELIVERY_SERVICE_OPTIONS = [
  {
    id: "standard",
    name: "标准快递",
    estimatedPrice: "¥12.00 起",
    estimatedTime: "3-5天"
  },
  {
    id: "express",
    name: "特快专递",
    estimatedPrice: "¥25.00 起",
    estimatedTime: "1-2天"
  },
  {
    id: "same_city",
    name: "同城急送",
    estimatedPrice: "¥18.00 起",
    estimatedTime: "当日达"
  }
];
const MOCK_DELIVERY_CODE = {
  deliveryCode: "DLY922056",
  validityPeriod: "24小时内有效",
  instructions: "请将此寄件码提供给上门取件员，或在寄件柜台使用。"
};
const MOCK_DELIVERY_APPOINTMENT_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/27191f4b-a7d6-4d38-bdcf-24ec1db03b46.png"
};
const MOCK_DELIVERY_FACE_VERIFICATION_IMAGE = {
  url: "https://spark-builder.s3.cn-north-1.amazonaws.com.cn/image/2025/11/24/42f7a96a-89c7-42db-b671-43f217cdf1ce.png"
};
const MOCK_CLIENT_PACKAGE_STATUS = {
  trackingNumber: "ZYWK20251124001",
  status: "AwaitingPickup",
  receiver: "张三",
  latestUpdateTime: "2025-11-23 15:30",
  timeline: [
    {
      timestamp: "2025-11-23 09:00",
      location: "发货中心",
      description: "快件已揽收。"
    },
    {
      timestamp: "2025-11-23 11:45",
      location: "分拣中心",
      description: "到达智取未来网点，开始分拣。"
    },
    {
      timestamp: "2025-11-23 15:30",
      location: "智能货架",
      description: "快件已入库 A-5-12A，等待取件。"
    }
  ]
};
export {
  CLIENT_DASHBOARD_PROFILE_AVATAR as C,
  DELIVERY_SERVICE_OPTIONS as D,
  HOMEPAGE_BANNER_IMAGE as H,
  MOCK_DELIVERY_CODE as M,
  PICKUP_OPTIONS as P,
  MOCK_DELIVERY_APPOINTMENT_IMAGE as a,
  MOCK_DELIVERY_FACE_VERIFICATION_IMAGE as b,
  CLIENT_LOGIN_IMAGE as c,
  MOCK_PACKAGE_LOCATION as d,
  MOCK_CLIENT_PACKAGE_STATUS as e,
  MOCK_PICKUP_RECEIPT as f,
  MOCK_FACE_VERIFICATION as g,
  HOMEPAGE_SERVICE_NAV as h
};
