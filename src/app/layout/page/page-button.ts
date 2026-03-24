
export interface PageButton {
    id?: string;
    label?: string;
    icon?: string;
    isDestructive?: boolean;
    isDisabled?: boolean;
    isShow?: boolean;
    isDropdown?: boolean;
    title?: string;
    buttons?: any[];
    severity?: any;
    variant?: 'text' | 'outlined' | undefined;
    action: () => void;
}

export class ButtonAction {
    id?: string;
    label?: string;
    icon?: string;
    isDestructive?: boolean;
    isDisabled?: boolean;
    isShow?: boolean;
    isDropdown?: boolean;
    title?: string;
    buttons?: any[];
    variant?: 'text' | 'outlined' | undefined;
    action: () => void;

    constructor(props: PageButton) {
        this.id = props.id;
        this.label = props.label;
        this.icon = props.icon;
        this.isDestructive = props.isDestructive;
        this.isDisabled = props.isDisabled;
        this.isShow = props.isShow;
        this.isDropdown = props.isDropdown;
        this.title = props.title;
        this.buttons = props.buttons;
        this.action = props.action;
        this.variant = props.variant;
    }

    public disable(): void {
        this.isDisabled = true;
    }

    public enable(): void {
        this.isDisabled = false;
    }

    public hidden(): void {
        this.isShow = false;
    }

    public show(): void {
        this.isShow = true;
    }
}
