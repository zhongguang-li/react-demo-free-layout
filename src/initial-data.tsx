import { Modal, Button } from '@douyinfe/semi-ui';

import { FlowDocumentJSON } from './typings';
import { getFlow } from './api/flow-api';

export const flowId : string | null = new URLSearchParams(window.location.search).get('flowId');

if (!flowId) {
  Modal.error({
    title: '错误',
    content: '找不到当前工作流',
    onOk: () => {
      window.location.reload();
    },
    footer: (
      <Button type="primary" theme="solid" onClick={() => window.location.reload()}>
        确认
      </Button>
    ),
  });
  // 可选：手动关闭加载动画或移除 DOM 节点
  throw new Error('Missing required parameter: flowId');
}

export const initialData: FlowDocumentJSON = await getFlow(flowId);
