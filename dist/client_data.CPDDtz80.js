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
export {
  CLIENT_LOGIN_IMAGE as C,
  HOMEPAGE_BANNER_IMAGE as H,
  MOCK_PACKAGE_LOCATION as M,
  PICKUP_OPTIONS as P,
  MOCK_PICKUP_RECEIPT as a,
  MOCK_FACE_VERIFICATION as b,
  HOMEPAGE_SERVICE_NAV as c
};
