import { Extension, ExtensionType } from '@/core/extensions';
import { AllLinksUI } from './ui';

export default class AllLinksModule extends Extension {
  constructor(manager: any) {
    super(manager);
    this.name = 'AllLinksModule';
    this.type = ExtensionType.CUSTOM;
  }

  public render() {
    return AllLinksUI;
  }
}