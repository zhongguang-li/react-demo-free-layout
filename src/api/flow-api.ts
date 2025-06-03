import {apiService} from './api-service';

/**
 * 获取所有流程图信息
 * @returns Promise<any>
 */
export const getAllFlows = async (): Promise<any> => {
  try {
    return await apiService.get('/flow/listAll');
  } catch (error) {
    throw new Error('获取流程图列表失败');
  }
};
/**
 * 获取指定ID的流程图信息
 * @param flowId
 */
export const getFlow = async (flowId: any): Promise<any> => {
  try {
    return await apiService.get('/flow/' + flowId);
  } catch (error) {
    throw new Error('获取流程图失败');
  }
};
/**
 * 创建新的流程图
 * @param flowData - 流程图数据
 * @returns Promise<any>
 */
export const saveFlow = async (flowData: any): Promise<any> => {
  try {
    return await apiService.put('/flow', flowData);
  } catch (error) {
    throw new Error('创建流程图失败');
  }
};
/**
 * 更新指定ID的流程图
 * @param flowId - 流程图ID
 * @param flowData - 流程图数据
 * @returns Promise<any>
 */
export const updateFlow = async (flowId: string | null, flowData: any): Promise<any> => {
  if (flowId == null) {
    throw new Error('流程图ID不能为空');
  }
  try {
    return await apiService.put(`/flow/${flowId}`, flowData);
  } catch (error) {
    throw new Error('更新流程图失败');
  }
}

/**
 * 删除指定ID的流程图
 * @param flowId - 流程图ID
 * @returns Promise<any>
 */
export const deleteFlow = async (flowId: string): Promise<any> => {
  try {
    return await apiService.delete(`/flow/${flowId}`);
  } catch (error) {
    throw new Error('删除流程图失败');
  }
};
