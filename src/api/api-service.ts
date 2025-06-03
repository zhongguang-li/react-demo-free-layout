import axios from 'axios';

/**
 * 显示提示信息
 * @param message - 提示内容
 * @param type - 提示类型 ('success' 或 'error')
 */
const showNotification = (message: string, type: 'success' | 'error'): void => {
  // 假设项目中使用了一个UI库来展示提示，例如Semi Design的Toast或Notification组件
  if (type === 'success') {
    console.log(`Success: ${message}`);
    // 实际开发中可以替换为真实的提示调用，例如：Toast.success(message);
  } else {
    console.error(`Error: ${message}`);
    // 实际开发中可以替换为真实的提示调用，例如：Toast.error(message);
  }
};

/**
 * 创建Axios实例
 */
const apiService = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

/**
 * 请求拦截器
 */
apiService.interceptors.request.use(
  (config) => {
    // 添加Token等公共参数
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
apiService.interceptors.response.use(
  (response) => {
    const { code, msg, data } = response.data;

    if (code === 200) {
      showNotification(msg, 'success');
      return data; // 返回data字段
    } else {
      showNotification(`${code}:${msg}`, 'error');
      return Promise.reject(new Error(msg));
    }
  },
  (error) => {
    // 网络错误或其他异常
    showNotification(`网络异常:${error.message}`, 'error');
    return Promise.reject(error);
  }
);

export { apiService };
