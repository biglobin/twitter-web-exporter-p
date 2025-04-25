import { render } from 'preact';
import { App } from './core/app';
import extensions from './core/extensions';

// 只保留AllLinksModule，删除其他模块导入
import AllLinksModule from './modules/all-links';

import './index.css';

// 只注册AllLinksModule
extensions.add(AllLinksModule);
extensions.start();

function mountApp() {
  const root = document.createElement('div');
  root.id = 'twe-root';
  document.body.append(root);

  render(<App />, root);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
