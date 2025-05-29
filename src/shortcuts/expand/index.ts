import {
  FreeLayoutPluginContext,
  ShortcutsHandler,
  WorkflowSelectService,
} from '@flowgram.ai/free-layout-editor';

import { FlowCommandId } from '../constants';

export class ExpandShortcut implements ShortcutsHandler {
  public commandId = FlowCommandId.EXPAND;

  public commandDetail: ShortcutsHandler['commandDetail'] = {
    label: 'Expand',
  };

  public shortcuts = ['meta alt closebracket', 'ctrl alt openbracket'];

  private selectService: WorkflowSelectService;

  constructor(context: FreeLayoutPluginContext) {
    this.selectService = context.get(WorkflowSelectService);
    this.execute = this.execute.bind(this);
  }

  public async execute(): Promise<void> {
    this.selectService.selectedNodes.forEach((node) => {
      node.renderData.expanded = true;
    });
  }
}
