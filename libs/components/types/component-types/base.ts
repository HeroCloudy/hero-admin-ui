/**
 * 顶部用户头像下拉选选项
 */
export interface UserDropdownItem {
  /** 选项名称 */
  title: string;

  /** 选项的点击事件 */
  click: () => void;

  /** 是否展示分割线 */
  isDivided?: boolean;
}

/**
 * 顶部导航Item对象
 */
export interface NavItem {
  /** 编码 */
  code: string;
  /** 名称 */
  name: string;
}
